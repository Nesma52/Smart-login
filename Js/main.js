var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var loginEmail = document.getElementById('loginEmail');
var loginPassword = document.getElementById('loginPassword');



var signUpArray = []
if (localStorage.getItem('users') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}

function isEmpty() {

    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}

function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false;
        }
        {
            return true;
        }
    }
}
function signUp() {
    if (isEmpty() == false) {
        document.getElementById('signupIncorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    if (signUpArray.length == 0) {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('signupIncorrect').innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
    if (isEmailExist() == false) {
        document.getElementById('signupIncorrect').innerHTML = '<span class="text-danger m-3">email already exists</span>'

    } else {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('signupIncorrect').innerHTML = '<span class="text-success m-3">Success</span>'

    }


}

function isLoginEmpty() {
    var emailField = document.getElementById('loginEmail');
    var passwordField = document.getElementById('loginPassword');

    if (passwordField.value == "" || emailField.value == "") {
        return false;
    } else {
        return true;
    }
}

function login() {
    if (!isLoginEmpty()) {
        document.getElementById('signinIncorrect').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }

    var password = document.getElementById('loginPassword').value;
    var email = document.getElementById('loginEmail').value;
    var isAuthenticated = false;

    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() === email.toLowerCase() && 
            signUpArray[i].password === password) {
            localStorage.setItem('sessionUsername', signUpArray[i].name);
            isAuthenticated = true;
            break;
        }
    }

    if (isAuthenticated) {
        location.replace('slides/home.html');
    } else {
        document.getElementById('signinIncorrect').innerHTML = '<span class="p-2 text-danger">Incorrect email or password</span>';
    }
}

function logout() {
    localStorage.removeItem('sessionUsername')
    location.replace('../index.html')
}