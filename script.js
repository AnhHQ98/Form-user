const form = document.querySelector("#form");
const table = document.querySelector("table");
const listUser = [];

const onSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value
    const fullname = e.target.fullname.value
    const email = e.target.email.value
    const birthday = e.target.birthday.value

    if(!username || !fullname || !email || !birthday) return;
    
    console.log(username);
    const user = {username, fullname, email, birthday}
    const tr = document.createElement("tr");
    listUser.push(user);
    tr.innerHTML = `<td>${listUser.length}</td>
                    <td>${username}</td>
                    <td>${fullname}</td>
                    <td>${email}</td>
                    <td>${birthday}</td>
                    <td>
                        <button class="bt-edit" id="editBtn-${listUser.length - 1}" data-index='${listUser.length - 1}' type="button">edit</button>
                    </td>
                    <td>
                        <button class="bt-del" id="deleteBtn-${listUser.length - 1}" data-index='${listUser.length - 1}' type="button">delete</button>
                    </td>`
    table.appendChild(tr);

    listUser.forEach((_, index) => {
        document.querySelector("#editBtn-" + index).addEventListener("click", onEdit);
        document.querySelector("#deleteBtn-" + index).addEventListener("click", onDelete);
    });
}

form.addEventListener("submit", onSubmit);

// api
var userApi = 'http://localhost:3000/User'
fetch(userApi)
    .then(function(response){
        return response.json();
    })
    .then(function(user){
        console.log(user);
    })