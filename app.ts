class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public contact: string,
    public role: string,
    public address: string
  ) {}
}
enum Role {
  ADMIN = "Admin",
  USER = "User",
  GUEST = "Guest",
}

const usersData: User[] = [
  new User(
    "Naman",
    "Kumar",
    "kumar@example.com",
    "1234567890",
     "delhi",
     Role.ADMIN,

  ),
  new User(
    "Aman",
    "kumar",
    "kumar@example.com",
    "9876543210",
    "Pune",
    Role.USER,
    
  ),
];

// Interface for CRUD actions
interface CRUDActions {
  getUsers(): User[];
  deleteUser(index: number): void;
  updateUser(index: number, updatedUser: User): void;
  addUser(users:User):void
}

// Implementation of CRUDActions
const crudActions: CRUDActions = {
  getUsers() {
    return usersData;
  },
  deleteUser(index) {
    usersData.splice(index, 1);
  },
  updateUser(index, updatedUser) {
    usersData[index] = updatedUser;
  },

  addUser(user: User) {
      usersData.push(user);
  },
  
};
 
loadData();
const btnAddUser =document.querySelector("#btnAddUser") as HTMLButtonElement;
const userdiv=document.querySelector("#userDiv") as HTMLElement;
const btn =document.querySelector("#btnSubmit") as HTMLButtonElement;
btn.addEventListener('click',()=>{
   let firstName= (document.querySelector('#firstName')as HTMLInputElement);
   let lastName= (document.querySelector('#lastName')as HTMLInputElement);
   let email= (document.querySelector('#email')as HTMLInputElement);
   let contact= (document.querySelector('#Contact')as HTMLInputElement);
   let address= (document.querySelector('#address')as HTMLInputElement);
   const newUser= new User(
     firstName.value,lastName.value,email.value,contact.value,address.value,Role.USER
   )
   crudActions.addUser(newUser)
   loadData();
   firstName.value="";
   lastName.value="";
   email.value="";
   contact.value="";
   address.value="";
   userdiv.style.display="none";
   btnAddUser.style.display="block";

   
});
function loadData() {
  const tableBody = document.querySelector("#userTable tbody")!;
  tableBody.innerHTML = "";

  crudActions.getUsers().forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${user.firstName}</td>
          <td>${user.lastName}</td>
          <td>${user.email}</td>
          <td>${user.contact}</td>
          <td>${user.address}</td>
          <td>${user.role}</td>
         <td>
              <button class="editBtn" onclick="editUser(${index})">Edit</button>
              <button class="deleteBtn" onclick="deleteUser(${index})">Delete</button>
          </td>
      `;
    tableBody.appendChild(row);
  });

}
function editUser(index: number) {
  const row = document.querySelector(
    `#userTable tbody tr:nth-child(${index + 1})`
  )!;
  const cells = row.querySelectorAll("td");

  cells.forEach((cell, cellIndex) => {
    if (cellIndex !== cells.length - 1) {
      const input = document.createElement("input");
      input.value = cell.textContent!;
      cell.innerHTML = "";
      cell.appendChild(input);
    }
  });

  const actionCell = cells[cells.length - 1];
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.classList.add("saveBtn");
  saveBtn.onclick = () => saveUser(index);

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.classList.add("cancelBtn");
  cancelBtn.onclick = () => loadData();

  actionCell.innerHTML = "";
  actionCell.appendChild(saveBtn);
  actionCell.appendChild(cancelBtn);
}

function saveUser(index: number) {
  const row = document.querySelector(
    `#userTable tbody tr:nth-child(${index + 1})`
  )!;
  const cells = row.querySelectorAll("td");

  const updatedUser = new User(
    (cells[0].querySelector("input") as HTMLInputElement).value,
    (cells[1].querySelector("input") as HTMLInputElement).value,
    (cells[2].querySelector("input") as HTMLInputElement).value,
    (cells[3].querySelector("input") as HTMLInputElement).value,
    (cells[4].querySelector("input") as HTMLInputElement).value,
    (cells[5].querySelector("input") as HTMLInputElement).value,
  );

  crudActions.updateUser(index, updatedUser);
  loadData();
}
// delete user is perfomed the delete operations delete the data crudactions and show the updated data by using loaddata
function deleteUser(index: number) {
  crudActions.deleteUser(index);
  loadData();
}

btnAddUser.addEventListener('click',()=>{
userdiv.style.display="block";
btnAddUser.style.display="none";
});
