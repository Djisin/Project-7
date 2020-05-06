let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let username = document.getElementById('username');
let email = document.getElementById('emailDivOnTop');
let password = document.getElementById('passwordDivOnTop');
let confPassword = document.getElementById('confirmPwDivOnTop');
//Generate error
function redWrap(field, errorMessage) {
    field.parentElement.classList.add('has-error');
    field.parentElement.children[2].innerText = errorMessage
    field.focus();
    field.addEventListener('input', () => {
        field.parentElement.classList.remove('has-error');
        field.parentElement.children[2].innerText = '';
    });
}
//Validate First Name
function validateFirstName() {
    
    if (firstName.value.trim().length === 0) {
        redWrap(firstName, 'Please enter your First Name.');
        return false
    } else if (firstName.value.trim().length < 3) {
        redWrap(firstName, 'First Name can not be shorter then 3 characters.');
        return false
    } else if (firstName.value.trim().length >= 30) {
        redWrap(firstName, 'First Name can not be longer then 30 characters.');
        return false
    } else if (inputAlphabet(firstName, "For your First Name use alphabets only.")) {
        return true
    }
}
firstName.addEventListener('focusout', () => {
    validateFirstName();
});
//Validate Last Name
function validateLastName() {
    if (lastName.value.trim().length === 0) {
        redWrap(lastName, 'Please enter your Last Name.');
        return false
    } else if (lastName.value.trim().length < 3) {
        redWrap(lastName, 'Last Name can not be shorter then 3 characters.');
        return false
    } else if (lastName.value.trim().length >= 30) {
        redWrap(lastName, 'Last Name can not be longer then 30 characters.');
        return false
    } else if (inputAlphabet(lastName, "For your Last Name use alphabets only.")) {
        return true
    }
}
lastName.addEventListener('focusout', () => {
    validateLastName()
});
//Validate username
function validateUsername() {
    if (username.value.trim().length === 0) {
        redWrap(username, 'Please enter a username');
        return false
    } else if (username.value.trim().length < 5) {
        redWrap(username, 'Username can not be shorter then 5 characters.');
        return false
    } else if (username.value.trim().length >= 20) {
        redWrap(username, 'Username can not be longer then 20 characters.');
        return false
    } else if (textAlphanumeric(username, "You may use numbers, letters, dashes and underscores, username must start with letter and can not start or end with dash or underscore.")) {
        return true
    }
}
username.addEventListener('focusout', () => {
    validateUsername();
});
//Validate email
function validateEmail() {
    if (email.value.trim().length === 0) {
        redWrap(email, 'Please enter your email.');
        return false
    } else if (email.value.trim().length >= 50) {
        redWrap(email, 'Email can not be longer then 50 characters.');
        return false
    } else if (emailValidation(email, "Please enter a valid email address.")) {
        return true
    }
}
email.addEventListener('focusout', () => {
    validateEmail()
});
//Validate password
function validatePassword() {
    if (password.value.trim().length === 0) {
        redWrap(password, 'Please enter your password.');
        return false
    } else if (password.value.trim().length < 8) {
        redWrap(password, 'Your password must be at least 8 characters long.');
        return false
    } else if (strongPassword(password, "Password must be created with at least 1 lowercase, uppercase, numeric and spectial caracter without any spaces.")) {
        return true
    }
}
password.addEventListener('focusout', () => {
    validatePassword();
});
//Validate confirm password
function validateConfPassword() {
    if (confPassword.value.trim().length === 0) {
        redWrap(confPassword, 'Please confirm your password.');
        return false
    } else if (password.value !== confPassword.value) {
        redWrap(confPassword, 'Passwords do not match');
        return false
    } else {
        return true;
    }
}
confPassword.addEventListener('focusout', () => {
    validateConfPassword();
});
function getUserInfo() {
    if (validateFirstName() && validateLastName() && validateUsername() && validateEmail() && validatePassword() && validateConfPassword()) {
        let user = { firstName: firstName.value, lastName: lastName.value, username: username.value, email: email.value, password: password.value }
        return user
    } else {
        return false
    }
}

function inputAlphabet(inputtext, alertMsg) {
    let alphaExp = /^(?=^[A-Za-z]+\s?[A-Za-z]+\s?[A-Za-z]+$).{2,30}$/;
    if (inputtext.value.match(alphaExp)) {
        return true;
    } else {
        redWrap(inputtext, alertMsg)
        return false
    }
}

function textAlphanumeric(inputtext, alertMsg) {
    let alphaExp = /^(?=.{5,20}$)([a-zA-Z])(_?-?[A-Za-z\d])+$/;
    if (inputtext.value.match(alphaExp)) {
        return true;
    } else {
        redWrap(inputtext, alertMsg)
    }
}

function emailValidation(inputtext, alertMsg) {
    let emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (inputtext.value.match(emailExp)) {
        return true;
    } else {
        redWrap(inputtext, alertMsg)
    }
}

function strongPassword(inputtext, alertMsg) {
    let passExp = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,20}$/
    if (inputtext.value.match(passExp)) {
        return true;
    } else {
        redWrap(inputtext, alertMsg)
    }
}
//return false
regButton = document.getElementById('submit-button');
regButton.addEventListener('click', ($event) => {
    $event.preventDefault();
    submitReg = getUserInfo();
    if (!submitReg === false) {
        document.getElementById('registerInfo').reset();
        document.getElementById('errorParagraphL').innerText = 'Successfuly created';
        divOnTop.style.display = 'none';
        submitFormData(submitReg);
    } else {
        return false
    }
});

function makeRequest(submitReg) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('POST', 'http://127.0.0.1:3000/signup');
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 400) {
                    resolve(request.response);
                } else {
                    reject(request.response);
                }
            }
        };
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(submitReg));
    });
}

async function submitFormData(submitReg) {
    try {
        const requestPromise = makeRequest(submitReg);
        const response = await requestPromise;
        responseId = (JSON.parse(response));
    }
    catch (errorResponse) {
        alert(errorResponse);
    };
}