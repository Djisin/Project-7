let createPostButton = document.getElementById('createPost');
let createPostSection = document.getElementById('createPostSection');

createPostButton.addEventListener('click', ($event) => {
    $event.preventDefault();

    createPostSection.style.display = 'flex';
    createPostButton.setAttribute('class', 'active');

    let postForm = document.createElement('form');
    postForm.setAttribute('method', 'POST');
    postForm.setAttribute('class', 'col-md-12')
    postForm.setAttribute('id', 'createPostForm')
    createPostSection.appendChild(postForm);

    let header = document.createElement('h3');
    header.textContent = 'Create Post';
    postForm.appendChild(header);

    let formRow1 = document.createElement('div');
    formRow1.setAttribute('class', 'form-row col-md-12');
    let formDiv1 = document.createElement('div');
    formDiv1.setAttribute('class', 'md-col-3')
    postForm.appendChild(formRow1);
    formRow1.appendChild(formDiv1);

    let postCreateTitle = document.createElement('label');
    postCreateTitle.setAttribute('for', 'postTitle');
    postCreateTitle.textContent = 'Title';
    let postCreateTitleInput = document.createElement('input');
    postCreateTitleInput.setAttribute('id', 'postTitle');
    postCreateTitleInput.setAttribute('name', 'postTitle');
    postCreateTitleInput.setAttribute('type', 'text');
    postCreateTitleInput.setAttribute('class', 'form-control');
    postCreateTitleInput.setAttribute('placeholder', 'Post Title');
    postCreateTitleInput.required = true;
    formDiv1.append(postCreateTitle, postCreateTitleInput);

    let formRow2 = document.createElement('div');
    formRow2.setAttribute('class', 'form-row col-md-12');

    let formDiv2 = document.createElement('div');
    formDiv2.setAttribute('class', 'md-col-6');
    formRow2.appendChild(formDiv2);

    let postTextLabel = document.createElement('label');
    postTextLabel.setAttribute('for', 'postText');
    postTextLabel.textContent = 'Text';
    let postTextArea = document.createElement('textarea');
    postTextArea.setAttribute('id', 'postText');
    postTextArea.setAttribute('name', 'postText');
    postTextArea.setAttribute('type', 'text-area');
    postTextArea.setAttribute('class', 'form-control');
    postTextArea.setAttribute('placeholder', 'Write here...');
    formDiv2.append(postTextLabel, postTextArea);

    let formDiv3 = document.createElement('div');
    formDiv3.setAttribute('class', 'md-col-6');
    postForm.appendChild(formRow2);
    formRow2.appendChild(formDiv3);

    let picDiv = document.createElement('div');
    picDiv.setAttribute('class', 'col-md-5')
    picDiv.setAttribute('id', 'picDiv');
    formDiv3.appendChild(picDiv);
    let postCreateImg = document.createElement('img');
    postCreateImg.setAttribute('id', 'img-preview');
    postCreateImg.setAttribute('src', './img/picPH.png');
    picDiv.appendChild(postCreateImg);

    let uploadDiv = document.createElement('div');
    uploadDiv.setAttribute('id', 'uploadDiv')
    uploadDiv.setAttribute('class', 'col-md-7')
    formDiv3.appendChild(uploadDiv);
    let postImgLabel1 = document.createElement('label');
    postImgLabel1.setAttribute('for', 'fileupload');
    postImgLabel1.setAttribute('id', 'fileuploadLabel')
    postImgLabel1.textContent = 'Select a file to upload';
    let postImgInput = document.createElement('input');
    postImgInput.setAttribute('type', 'file');
    postImgInput.setAttribute('name', 'fileupload');
    postImgInput.setAttribute('value', 'fileupload');
    postImgInput.setAttribute('id', 'fileupload');
    postImgInput.setAttribute('class', 'btn btn-secondary');

    uploadDiv.append(postImgLabel1, postImgInput)

    let errReportPar = document.createElement('p');
    errReportPar.setAttribute('id', 'errReportPar');
    postForm.appendChild(errReportPar)

    let submitPostButton = document.createElement('button');
    submitPostButton.setAttribute('class', 'btn btn-primary');
    submitPostButton.setAttribute('id', 'submitPostButton');
    submitPostButton.innerText = 'Create';
    postForm.appendChild(submitPostButton);

    let submitCreate = {};
    submitPostButton.addEventListener('click', ($event) => {

        $event.preventDefault();
        if (postCreateTitleInput.value === '' || postCreateTitleInput.value === null) {
            errReportPar.innerText = 'You can not create post without title.';
            setTimeout(() => { errReportPar.innerText = '' }, 5000);
            postCreateTitleInput.focus();
            return false;
        }
        else if (!textAlphanumeric(postCreateTitleInput, "You may use only numbers, letters, spaces, dashes and underscores")) {
            postCreateTitleInput.focus();
            return false;
        } else if ((postTextArea.value === '' || postTextArea.value === null) && (postImgInput.value === '' || postImgInput.value === null)) {
            errReportPar.innerText = 'Post should be created with picture, text or both.'
            setTimeout(() => { errReportPar.innerText = '' }, 5000);
            postTextArea.focus();
            return false;
        } else {
            submitCreate = getCreatePost(); console.log(submitCreate)
            submitCreateFormData(submitCreate);
        }
    });

    let displayImgScript = document.createElement('script')
    displayImgScript.setAttribute('src', 'js/displayImage.js')
    postForm.appendChild(displayImgScript)

    let closeButton = document.createElement('span');
    closeButton.textContent = "x";
    closeButton.setAttribute('id', 'closeButton');

    closeButton.addEventListener('click', (e) => {
        window.location.reload()
        createPostButton.removeAttribute('class');
        postForm.reset();
        createPostSection.style.display = 'none';
    });
    createPostSection.appendChild(closeButton);
}, { once: true });

function textAlphanumeric(inputtext, alertMsg) {
    let alphaExp = /^(?=.{5,50}$)([a-zA-Z])(_?-?\s?[A-Za-z\d])+$/;
    if (inputtext.value.match(alphaExp)) {
        return true;
    } else {
        errReportPar.innerText = alertMsg;
        setTimeout(() => { errReportPar.innerText = '' }, 5000);
        inputtext.focus();
        return false;
    }
}

apiCreate = 'http://127.0.0.1:3000'

function getCreatePost() {
    postTitle = document.getElementById('postTitle').value;
    postText = document.getElementById('postText').value;
    image = document.getElementById('fileupload').value;
    post = { postTitle, postText, image }
    return post
}

function makeCreateRequest(submitCreate) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open('POST', apiCreate + '/api/posts/createPost');
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 400) {
                    resolve(request.response);
                    console.log(request.response)
                } else {
                    reject(request.response);
                    console.log(request.response)
                }
            }
        };
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(submitCreate));
    });
}

async function submitCreateFormData(submitCreate) {
    try {
        const requestPromise = makeCreateRequest(submitCreate);
        const response = await requestPromise;
        responseId = (JSON.parse(response));
        console.log(responseId)

        window.location.href = '/frontend/home.html'
    }
    catch (errorResponse) {
        alert(errorResponse);
    };
}