const form = document.querySelector("#form");
const table = document.querySelector("table");
const listUser = [];
var userApi = 'http://localhost:3000/User'

let currentUserEdit = null;
const onSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value
    const fullname = e.target.fullname.value
    const email = e.target.email.value
    const birthday = e.target.birthday.value

    if(!username || !fullname || !email || !birthday) return;
    const user = {username, fullname, email, birthday}
    if(currentUserEdit){
        fetch(userApi + "/" + currentUserEdit.id, {
            body : JSON.stringify(user),
            method : "put",
            headers : {
                "Content-Type" : "application/json"
            }
        }).then(res => res.json()).then(log).catch(alert);
    
    }else {
        fetch(userApi, {
            body : JSON.stringify(user),
            method : "post",
            headers : {
                "Content-Type" : "application/json"
            }
        }).then(res => res.json()).then(log).catch(alert);
    
    }
    }

function userTemplate(user){
    return `<td>${listUser.length}</td>
    <td>${user.username}</td>
    <td>${user.fullname}</td>
    <td>${user.email}</td>
    <td>${user.birthday}</td>
    <td>
        <button class="bt-edit" id="editBtn-${listUser.length - 1}" data-index='${listUser.length - 1}' type="button">edit
        </button>
    </td>
    <td>
        <button class="bt-del" id="deleteBtn-${listUser.length - 1}" data-index='${listUser.length - 1}' type="button">delete</button>
    </td>`
}

function onEdit(e) {
    console.log(e.target.dataset.index)
    const user = listUser.find((_, index) => index === Number(e.target.dataset.index))
    console.log(user);
    const values = Object.values(user);
    for(let i =0 ; i < form.elements.length - 2; ++i){
        form.elements[i].value = values[i];
    }
    currentUserEdit = user;
}

function onDelete(e) {
    console.log(e.target.dataset.index)
    const user = listUser.find((_, index) => index === Number(e.target.dataset.index))
    fetch(userApi + "/"+ user.id, {
        method : "delete",
        headers : {
            "Content-Type" : "application/json"
        }
    }).then(res => res.json()).then(log).catch(alert);

}

function fetchUser() {
    fetch(userApi).then(res => res.json()).then(data => {
        data.forEach(user => {
            const tr = document.createElement("tr");
            listUser.push(user);
            tr.innerHTML = userTemplate(user);
            table.appendChild(tr);
        });
        listUser.forEach((_, index) => {
            document.querySelector("#editBtn-" + index).addEventListener("click", onEdit);
            document.querySelector("#deleteBtn-" + index).addEventListener("click", onDelete);
        });
    }).catch(alert);
}
fetchUser();

form.addEventListener("submit", onSubmit);

// api
// fetch(userApi)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(user){
//         console.log(user);
//     })