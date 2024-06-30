var User = /** @class */ (function () {
    function User(firstName, lastName, email, contact, role, address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.contact = contact;
        this.role = role;
        this.address = address;
    }
    return User;
}());
var Role;
(function (Role) {
    Role["ADMIN"] = "Admin";
    Role["USER"] = "User";
    Role["GUEST"] = "Guest";
})(Role || (Role = {}));
var usersData = [
    new User("Naman", "Kumar", "kumar@example.com", "1234567890", "delhi", Role.ADMIN),
    new User("Aman", "kumar", "kumar@example.com", "9876543210", "Pune", Role.USER),
];
// Implementation of CRUDActions
var crudActions = {
    getUsers: function () {
        return usersData;
    },
    deleteUser: function (index) {
        usersData.splice(index, 1);
    },
    updateUser: function (index, updatedUser) {
        usersData[index] = updatedUser;
    },
    addUser: function (user) {
        usersData.push(user);
    },
};
loadData();
var btnAddUser = document.querySelector("#btnAddUser");
var userdiv = document.querySelector("#userDiv");
var btn = document.querySelector("#btnSubmit");
btn.addEventListener('click', function () {
    var firstName = document.querySelector('#firstName');
    var lastName = document.querySelector('#lastName');
    var email = document.querySelector('#email');
    var contact = document.querySelector('#Contact');
    var address = document.querySelector('#address');
    var newUser = new User(firstName.value, lastName.value, email.value, contact.value, address.value, Role.USER);
    crudActions.addUser(newUser);
    loadData();
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    contact.value = "";
    address.value = "";
    userdiv.style.display = "none";
    btnAddUser.style.display = "block";
});
function loadData() {
    var tableBody = document.querySelector("#userTable tbody");
    tableBody.innerHTML = "";
    crudActions.getUsers().forEach(function (user, index) {
        var row = document.createElement("tr");
        row.innerHTML = "\n          <td>".concat(user.firstName, "</td>\n          <td>").concat(user.lastName, "</td>\n          <td>").concat(user.email, "</td>\n          <td>").concat(user.contact, "</td>\n          <td>").concat(user.address, "</td>\n          <td>").concat(user.role, "</td>\n         <td>\n              <button class=\"editBtn\" onclick=\"editUser(").concat(index, ")\">Edit</button>\n              <button class=\"deleteBtn\" onclick=\"deleteUser(").concat(index, ")\">Delete</button>\n          </td>\n      ");
        tableBody.appendChild(row);
    });
}
function editUser(index) {
    var row = document.querySelector("#userTable tbody tr:nth-child(".concat(index + 1, ")"));
    var cells = row.querySelectorAll("td");
    cells.forEach(function (cell, cellIndex) {
        if (cellIndex !== cells.length - 1) {
            var input = document.createElement("input");
            input.value = cell.textContent;
            cell.innerHTML = "";
            cell.appendChild(input);
        }
    });
    var actionCell = cells[cells.length - 1];
    var saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.classList.add("saveBtn");
    saveBtn.onclick = function () { return saveUser(index); };
    var cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.classList.add("cancelBtn");
    cancelBtn.onclick = function () { return loadData(); };
    actionCell.innerHTML = "";
    actionCell.appendChild(saveBtn);
    actionCell.appendChild(cancelBtn);
}
function saveUser(index) {
    var row = document.querySelector("#userTable tbody tr:nth-child(".concat(index + 1, ")"));
    var cells = row.querySelectorAll("td");
    var updatedUser = new User(cells[0].querySelector("input").value, cells[1].querySelector("input").value, cells[2].querySelector("input").value, cells[3].querySelector("input").value, cells[4].querySelector("input").value, cells[5].querySelector("input").value);
    crudActions.updateUser(index, updatedUser);
    loadData();
}
// delete user is perfomed the delete operations delete the data crudactions and show the updated data by using loaddata
function deleteUser(index) {
    crudActions.deleteUser(index);
    loadData();
}
btnAddUser.addEventListener('click', function () {
    userdiv.style.display = "block";
    btnAddUser.style.display = "none";
});
