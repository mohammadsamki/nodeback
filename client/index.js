
const userForm = document.getElementsByTagName('form')[0];
const userTable = document.getElementById('userTable');
const userTableBody = document.getElementById('userTableBody');
const API_URL = 'http://localhost:5001/api/users';

//  add event listener to the form
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var role = document.getElementById('role').value;
    const user ={username,email,role};
    console.log(user);
    await createNewUser(user);
    await getallUsers();
})
//  create a fun to create new user 
//  
async function createNewUser(user){
    console.log('you are in create new user');
    try {
        await fetch(API_URL,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })
        console.log('user created successfully');
        
    } catch (error) {
        console.log(error);
        
    }
}
// function to delete user by id
async function deleteUserByID(id){
    console.log(id);
    try {
        await fetch(`${API_URL}/${id}`,{method:'DELETE'});
        alert('user deleted successfully');
        await getallUsers();
        
    } catch (error) {
        console.log(error);
        
    }
}
// function to get all users from the database


async function getallUsers(){
    console.log('your are in get all users');

    try {
        const response = await fetch(API_URL);
        const users = await response.json();
        userTableBody.innerHTML='';

        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML=`
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><button onclick="deleteUserByID('${user._id}')">Delete</button> 
            <button onclick='updateUser(${JSON.stringify(user)})' type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button></td>
            `
        userTableBody.appendChild(tr);
        });
        console.log('user get done')
        
    } catch (error) {
        console.log(error);
    }
}
getallUsers();
function updateUser (user){
    var username2 = document.getElementById('username2')
    username2.value=user.username
    var email2 = document.getElementById('email2')
    email2.value=user.email
    var role2 = document.getElementById('role2')
    role2.value=user.role
    var userForm2 = document.getElementById('userForm2')
    userForm2.addEventListener('submit',async (event)=>{
        event.preventDefault();
        console.log(username2.value,email2.value,role2.value)
        try {
                var updateUser ={
                    username:username2.value,
                    email:email2.value,
                    role:role2.value
                }
           await fetch(`${API_URL}/${user._id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(updateUser)
           })

           await getallUsers();
           alert('user updated')

            
        } catch (error) {
            console.log(error)
            
        }
    })
    console.log(user)
}