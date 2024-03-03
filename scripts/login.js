const form = document.getElementById('loginForm');
const mobile = document.getElementById('mobile');
const password = document.getElementById('password');

AddSystemAdmin();
ResetLoggedInUser();

function Login(e){
    e.preventDefault();
    var user = GetUsers().filter(u => u.MobileNumber == mobile.value && u.Password == password.value);
    if (user.length == 1)
    {
        SetLoggedInUser(user[0]);
        switch(user[0].Role)
        {
            case 'Vendor':
                window.location.href = "vendor.html";
            break;
            case 'Customer':
                window.location.href = "index.html";
            break;
            case 'Admin':
                window.location.href = "admin.html";
            break;
            default:
                alert('Something went wrong, contact to Administrator.');
                console.log('Error: Invalid User Role');
        }
    }
    else {
        alert("Incorrect credentials. Try again!");
    }
}

function ForgetPassword()
{
    alert('Under progress..');
}

function NavigateToRegister()
{
    window.location.href = "register.html";
}

mobile.focus();
form.addEventListener("submit",Login);