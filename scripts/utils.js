
function GetUsers(){
    const localStorageUsers = JSON.parse(localStorage.getItem('Users'));
    return localStorage.getItem('Users') !== null ? localStorageUsers : [];
}

function AddUser(user){
    Users = GetUsers();
    Users.push(user);
    localStorage.setItem("Users", JSON.stringify(Users));
}

function ResetLoggedInUser(){
    localStorage.setItem("LoggedInUser", null);
}

function SetLoggedInUser(user){
    localStorage.setItem("LoggedInUser", JSON.stringify(user));
}

function GetLoggedInUser(){
    return JSON.parse(localStorage.getItem('LoggedInUser'));
}

function CheckUserSession(loggedInUser, currentRole){
    if (loggedInUser != null && (loggedInUser.Role == currentRole || loggedInUser.Role == 'Admin')){
        const onlyAdmin = document.getElementById('onlyAdmin');
        const loggedInUserName = document.getElementById('LoggedInUserName');

        loggedInUserName.innerText = loggedInUser.Name;
        onlyAdmin.style.visibility = loggedInUser.Role == 'Admin' ? 'visible' : 'hidden';
    }
    else{
        window.location.href = "login.html";
    }
}

function AddSystemAdmin(){
    var adminUsers = GetUsers().filter(u => u.Role == 'Admin');
    if (adminUsers.length == 0){
        var user = {'UserId':'admin', 'Name':'Admin', 'MobileNumber':'012', 'City':'India', 'Password':'012', 'Role':'Admin'};
        AddUser(user);
    }
}

function Logout(){
    ResetLoggedInUser();
    window.location.href = "login.html";
}

function GetStock(){
    const localStorageStocks = JSON.parse(localStorage.getItem('Stocks'));
    return localStorage.getItem('Stocks') !== null ? localStorageStocks : [];
}