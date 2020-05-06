let checkApi = 'http://127.0.0.1:3000'
function makeCheckRequest() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();

        request.open('POST', checkApi + '/loggedIn', true);
        request.withCredentials = true;
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 400) {
                    resolve(request.response);
                } else if (request.status === 404) {
                    return true
                }
                else {
                    reject(request.response);
                }
            }
        };
        request.setRequestHeader('Content-Type', 'application/json');
        request.send();
    });
}
onload = async function submitCheckData() {
    try {
        const requestPromise = makeCheckRequest();
        const response = await requestPromise;
        responseId = (JSON.parse(response));
        if (responseId.loggedIn = true) {
            window.location.replace("/frontend/home.html");
        }
        else {
            window.location.replace("/frontend/index.html");
        }

    }
    catch (errorResponse) {
        alert(errorResponse);
    };
}

let divOnTop = document.getElementById('divOnTop');

let openFormF = function openFormFunction() {

    document.getElementById('loginInfo').reset();
    document.getElementById('registerInfo').reset();
    divOnTop.style.display = 'flex';

    let closeButton = document.createElement('span');
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.setAttribute('id', 'closeButton');

    closeButton.addEventListener('click', () => {
        document.getElementById('registerInfo').reset();
        divOnTop.style.display = 'none';
        for (let i = 0; i < document.getElementsByClassName('help-block').length; i++) {
            document.getElementsByClassName('help-block')[i].innerText = '';
            document.getElementsByClassName('help-block')[i].parentElement.classList.remove('has-error');
        }
    });
    divOnTop.appendChild(closeButton);
}