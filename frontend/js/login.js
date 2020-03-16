api = 'http://127.0.0.1:3000'
//Get contact info into the required object
function getLoginUserInfo() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let user = { email, password }
    return user
}

let submit = {};
submitButton = document.getElementsByClassName('loginButton');
let emailField = document.getElementById('email');
let passField = document.getElementById('password');

for (let i = 0; i < submitButton.length; i++) {
    submitButton[i].addEventListener('click', ($event) => {
        $event.preventDefault();
        setTimeout(() => { document.getElementById('errorParagraphL').innerText = '' }, 5000)
        if (emailField.value == null || emailField.value == '') {
            emailField.focus();
            document.getElementById('errorParagraphL').innerText = "Enter your email";
        } else if (passField.value == null || passField.value == '') {
            passField.focus();
            document.getElementById('errorParagraphL').innerText = "Enter your password";
        } else {
            submit = getLoginUserInfo();
            submitLoginFormData(submit);
        }
    });

}

function makeLoginRequest(submit) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('POST', api + '/login');
        request.withCredentials = true;
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 400) {
                    resolve(request.response);
                } else if (request.status === 404 || request.status === 401) {
                    notFoundMess = JSON.parse(request.response);
                    document.getElementById('errorParagraphL').innerText = 'Email or password is incorect';
                    setTimeout(() => { document.getElementById('errorParagraphL').innerText = '' }, 5000)
                }
                else {
                    reject(request.response);
                }
            }
        };

        request.setRequestHeader('Content-Type', 'application/json');
        //request.setRequestHeader('Authorization', 'Bearer ');
        request.send(JSON.stringify(submit));
    });
}

async function submitLoginFormData(submit) {
    try {
        const requestPromise = makeLoginRequest(submit);
        const response = await requestPromise;
        responseId = (JSON.parse(response));
        if (responseId.loggedIn = true) {
            window.location.href = '/frontend/home.html'
        }
        console.log(response)
    }
    catch (errorResponse) {
        alert(errorResponse);
    };
}