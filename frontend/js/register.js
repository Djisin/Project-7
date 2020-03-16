api = 'http://127.0.0.1:3000'

function getUserInfo() {
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let username = document.getElementById('username');
    let email = document.getElementById('emailDivOnTop');
    let password = document.getElementById('passwordDivOnTop');
    let confPassword = document.getElementById('confirmPwDivOnTop');

    setTimeout(() => { document.getElementById('errorParagraph').innerText = '' }, 5000)

    if (firstName.value.length == 0) {
        document.getElementById('errorParagraph').innerText = "Please enter your First Name.";
        firstName.focus();
        return false;
    } else if (firstName.value.length < 3) {
        document.getElementById('errorParagraph').innerText = "First Name can not be shorter then 3 letters.";
        firstName.focus();
        return false;
    }

    if (lastName.value.length == 0) {
        document.getElementById('errorParagraph').innerText = "Please enter your Last Name.";
        lastName.focus();
        return false;
    } else if (lastName.value.length < 3) {
        document.getElementById('errorParagraph').innerText = "Last Name can not be shorter then 3 characters.";
        lastName.focus();
        return false;
    }

    if (username.value.length == 0) {
        document.getElementById('errorParagraph').innerText = "Please enter your Username.";
        username.focus();
        return false;
    } else if (username.value.length < 5) {
        document.getElementById('errorParagraph').innerText = "Username can not be shorter then 5 characters.";
        username.focus();
        return false;
    }

    if (email.value.length == 0) {
        document.getElementById('errorParagraph').innerText = "Please enter your email.";
        email.focus();
        return false;
    }

    if (password.value.length == 0) {
        document.getElementById('errorParagraph').innerText = "Please enter your password.";
        password.focus();
        return false;
    }

    if (confPassword.value.length == 0) {
        document.getElementById('errorParagraph').innerText = "Please confirm your password.";
        confPassword.focus();
        return false;
    }

    if (password.value.length < 8) {
        document.getElementById('errorParagraph').innerText = "Your password must be at least 8 characters long.";
        password.focus();
        return false;
    }

    if (inputAlphabet(firstName, "For your First Name please use alphabets only.")) {
        if (inputAlphabet(lastName, "For your Last Name please use alphabets only.")) {
            if (textAlphanumeric(username, "For Username please use only numbers, letters, dashes and underscores. Your Username must start with letter and can not start or end with dash or underscore.")) {
                if (emailValidation(email, "Please enter a valid email address.")) {
                    if (strongPassword(password, "Password must be created with at least 1 lowercase, uppercase, numeric and spectial caracter without any spaces.")) {
                        if (password.value === confPassword.value) {
                            firstName = firstName.value;
                            lastName = lastName.value;
                            username = username.value;
                            email = email.value;
                            password = password.value
                            let user = { firstName, lastName, username, email, password }
                            return user
                        } else {
                            document.getElementById('errorParagraph').innerText = "Passwords do not match!";
                            confPassword.value = '';
                        }
                    }
                }
            }
        }
    } else {
        return false;
    }

    function inputAlphabet(inputtext, alertMsg) {
        let alphaExp = /^(?=^[A-Za-z]+\s?[A-Za-z]+\s?[A-Za-z]+$).{3,30}$/;
        if (inputtext.value.match(alphaExp)) {
            return true;
        } else {
            document.getElementById('errorParagraph').innerText = alertMsg;
            inputtext.value = '';
            inputtext.focus();
            return false;
        }
    }

    function textAlphanumeric(inputtext, alertMsg) {
        let alphaExp = /^(?=.{5,20}$)([a-zA-Z])(_?-?[A-Za-z\d])+$/;
        if (inputtext.value.match(alphaExp)) {
            return true;
        } else {
            document.getElementById('errorParagraph').innerText = alertMsg;
            inputtext.value = '';
            inputtext.focus();
            return false;
        }
    }

    function emailValidation(inputtext, alertMsg) {
        let emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (inputtext.value.match(emailExp)) {
            return true;
        } else {
            document.getElementById('errorParagraph').innerText = alertMsg;
            inputtext.focus();
            inputtext.value = '';
            return false;
        }
    }

    function strongPassword(inputtext, alertMsg) {
        let passExp = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,20}$/
        if (inputtext.value.match(passExp)) {
            return true;
        } else {
            document.getElementById('errorParagraph').innerText = alertMsg;
            inputtext.value = '';
            inputtext.focus();
            return false;
        }
    }
    return false
}

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
        request.open('POST', api + '/signup');
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