const form = document.getElementById('registerForm');
const name = document.getElementById('name');
const mobile = document.getElementById('mobile');
const city = document.getElementById('city');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm_password');
const confirm_password_error = document.getElementById('confirm_password_error');
let confirmPassword = false;

ResetLoggedInUser();

function Register(e){
    e.preventDefault();
    if (confirmPassword == true)
    {
        if (mobile.value.length < 10){
            alert("Incorrect mobile number!");
        }
        else if (password.value.length < 5){
            alert("Password is too short!");
        }
        else {
            var user = {'UserId':mobile.value, 'Name':name.value, 'MobileNumber':mobile.value, 'City':city.value, 'Password':password.value, 'Role':'Customer'};
            AddUser(user);
            alert('Registration Successful!');
            window.location.href = "login.html";
        }
    }
}

function NavigateToLogin()
{
    window.location.href = "login.html";
}

function ConfirmPassword(){
    if (password.value != "" && confirm_password.value != "" && password.value == confirm_password.value){
        confirmPassword = true;
        confirm_password_error.style.display = "none";
    }
    else {
        confirm_password_error.style.display = "block";
    }
}

name.focus();
form.addEventListener("submit",Register);