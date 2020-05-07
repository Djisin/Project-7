function createOrEditArticle(createOrModify, editingTitle, editingText, editingPicture, postId, modifyButton) {
    let placeholderDiv = document.getElementById('createPostSection');
    let pressingButton

    if (createOrModify === 'create') {
        pressingButton = document.getElementById('createPost');
        placeholderDiv.setAttribute('class', 'active');
    } else if (createOrModify === 'modify') {
        pressingButton = modifyButton;
    }

    let closeButton = document.createElement('span');
    closeButton.innerHTML = '<i class="fas fa-times"></i>'
    closeButton.setAttribute('id', 'closeButtonP');
    closeButton.addEventListener('click', () => {
        window.location.reload()
    });
    if (createOrModify === 'modify')
        placeholderDiv.appendChild(closeButton);

    pressingButton.addEventListener('click', ($event) => {
        if (createOrModify === 'modify') {
            document.getElementById('createPost').children[0].onclick = function () { }
            document.getElementById('createPost').classList.add('disabled');
        }
        $event.preventDefault();
        placeholderDiv.style.display = 'flex';

        let postForm = document.createElement('form');
        postForm.setAttribute('class', 'col-md-12 col-sm-12, col-xs-12')
        postForm.setAttribute('id', 'createPostForm')
        placeholderDiv.appendChild(postForm);

        let header = document.createElement('h3');
        if (createOrModify === 'create')
            header.textContent = 'Create Article';
        if (createOrModify === 'modify')
            header.textContent = 'Modify Article';

        let formRow1 = document.createElement('div');
        formRow1.setAttribute('class', 'col-md-12 col-xs-12 col-sm-12');

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
        if (createOrModify === 'modify')
            postCreateTitleInput.value = editingTitle;
        let titleSpan = document.createElement('span');
        titleSpan.setAttribute('class', 'help-block');
        formRow1.append(postCreateTitle, postCreateTitleInput, titleSpan);

        let formRow2 = document.createElement('div');
        formRow2.setAttribute('class', 'mce-div col-md-12 col-xs-12 col-sm-12');

        let postTextLabel = document.createElement('label');
        postTextLabel.setAttribute('for', 'postText');
        postTextLabel.textContent = 'Text';
        let postTextArea = document.createElement('textarea');
        postTextArea.setAttribute('id', 'postText');
        postTextArea.setAttribute('name', 'postText');
        postTextArea.setAttribute('type', 'text-area');
        postTextArea.setAttribute('class', 'form-control');
        postTextArea.setAttribute('placeholder', 'Write here...');
        if (createOrModify === 'modify') {
            postTextArea.innerText = editingText;
        }
        let textAreaSpan = document.createElement('span');
        textAreaSpan.setAttribute('class', 'help-block');
        tinymce.init({
            height: 500,
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
            ],
            toolbar: ' formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
        });
        tinymce.EditorManager.execCommand('mceAddEditor', false, postTextArea);
        formRow2.append(postTextLabel, postTextArea, textAreaSpan);
        let formRow3 = document.createElement('div');
        formRow3.setAttribute('class', 'col-md-12 col-xs-12 col-sm-12');

        let picDiv = document.createElement('div');
        picDiv.setAttribute('class', 'col-md-6 col-sm-6 col-xs-12')
        picDiv.setAttribute('id', 'picDiv');
        let postCreateImg = document.createElement('img');
        postCreateImg.setAttribute('id', 'img-preview');
        postCreateImg.setAttribute('src', './img/picPH.png');
        picDiv.appendChild(postCreateImg);

        let uploadDiv = document.createElement('div');
        uploadDiv.setAttribute('id', 'uploadDiv')
        uploadDiv.setAttribute('class', 'col-md-6 col-sm-6 col-xs-12')
        let postImgLabel1 = document.createElement('label');
        postImgLabel1.setAttribute('for', 'fileupload');
        postImgLabel1.setAttribute('id', 'fileuploadLabel')
        postImgLabel1.textContent = 'Select a file to upload';
        let postImgInput = document.createElement('input');
        postImgInput.setAttribute('type', 'file');
        postImgInput.setAttribute('id', 'fileupload');
        postImgInput.setAttribute('class', 'btn btn-secondary');
        let imgSpan = document.createElement('span');
        imgSpan.setAttribute('class', 'help-block');
        uploadDiv.append(postImgLabel1, postImgInput, imgSpan)
        formRow3.append(picDiv, uploadDiv);
        let prevPic = true;
        if (createOrModify === 'modify') {
            if (editingPicture !== null && editingPicture !== undefined && editingPicture !== '') {
                postCreateImg.setAttribute('src', editingPicture);

                removeImgButton = document.createElement('button');
                removeImgButton.setAttribute('class', 'btn btn-link');
                removeImgButton.setAttribute('id', 'removeImgButton');
                removeImgButton.innerText = 'remove';
                uploadDiv.appendChild(removeImgButton)

                if (document.getElementById('removeImgButton') === null) {
                    uploadDiv.appendChild(removeImgButton)
                }
                removeImgButton.addEventListener('click', ($event) => {
                    removeImgButton = document.getElementById('removeImgButton');
                    document.getElementById('fileupload').value = '';
                    prevPic = false;
                    $event.preventDefault();
                    uploadDiv.removeChild(removeImgButton);
                    postCreateImg.setAttribute('src', './img/picPH.png');
                });
            } else {
                postCreateImg.setAttribute('src', './img/picPH.png');
            }
        }

        let submitPostButton = document.createElement('button');
        submitPostButton.setAttribute('class', 'btn btn-link');
        submitPostButton.setAttribute('id', 'submitPostButton');
        submitPostButton.innerText = createOrModify;

        postForm.append(header, formRow1, formRow2, formRow3, submitPostButton);
        let displayImgScript = document.createElement('script');
        displayImgScript.setAttribute('src', 'js/displayImage.js');
        postForm.appendChild(displayImgScript);

        let submitCreate = new FormData;

        submitPostButton.addEventListener('click', ($event) => {
            $event.preventDefault();
            image = document.getElementById('fileupload').files[0];
            if (postCreateTitleInput.value === '' || postCreateTitleInput.value.trim().length <= 5) {
                titleSpan.innerText = 'You can not create article without title of a least 6 characters';
                titleSpan.parentElement.classList.add('has-error');
                setTimeout(() => {
                    titleSpan.innerText = '';
                    titleSpan.parentElement.classList.remove('has-error');
                }, 6000);
                postCreateTitleInput.focus();
                return false;
            } else if (!textAlphanumeric(postCreateTitleInput, "You may use only numbers, letters, spaces, dashes and underscores", titleSpan)) {
                postCreateTitleInput.focus();
                return false;
            } else if (tinyMCE.activeEditor.getContent().length === 0) {
                textAreaSpan.innerText = 'You can not create article without any text'
                textAreaSpan.parentElement.classList.add('has-error');
                tinymce.execCommand('mceFocus', false, postTextArea);
                document.getElementsByClassName('tox')[0].style.border = '1px solid #a94442'
                setTimeout(() => {
                    textAreaSpan.innerText = '';
                    textAreaSpan.parentElement.classList.remove('has-error');
                    document.getElementsByClassName('tox')[0].style.border = '';
                }, 5000);
                postTextArea.focus();
                return false;
            } else if (image !== undefined) {
                if (!['image/jpg', 'image/jpeg', 'image/png'].includes(image.type)) {
                    imgSpan.innerText = 'Only .jpg, .jpeg or .png is allowed.'
                    postImgInput.setAttribute('class', 'btn btn-danger');
                    imgSpan.parentElement.classList.add('has-error');
                    setTimeout(() => {
                        imgSpan.innerText = '';
                        postImgInput.setAttribute('class', 'btn btn-secondary');
                        imgSpan.parentElement.classList.remove('has-error');
                    }, 5000);
                    return false
                } else {
                    submitCreate.append('file', image)
                }
            }
            submitContent = getCreatePost()
            submitContent = JSON.stringify(submitContent)

            submitCreate.append('post', submitContent);
            if (createOrModify === 'create')
                submitCreateFormData(submitCreate, 'POST', 'http://127.0.0.1:3000/api/posts/createPost');
            if (createOrModify === 'modify') {
                submitCreate.append('prevPic', prevPic);
                submitCreateFormData(submitCreate, 'PUT', 'http://127.0.0.1:3000/api/posts/' + postId);
            }
        });
    }, { once: true });
    function textAlphanumeric(inputtext, alertMsg, titleSpan) {
        let alphaExp = /^(?=.{5,50}$)([a-zA-Z])(_?-?\s?[A-Za-z\d])+$/;
        if (inputtext.value.match(alphaExp)) {
            return true;
        } else {
            titleSpan.innerText = alertMsg;
            titleSpan.parentElement.classList.add('has-error');
            setTimeout(() => {
                titleSpan.innerText = '';
                titleSpan.parentElement.classList.remove('has-error');
            }, 6000);
            inputtext.focus();
            return false;
        }
    }

    function getCreatePost() {
        postTitle = document.getElementById('postTitle').value;
        postText = tinyMCE.activeEditor.getContent()
        post = { postTitle, postText }
        return post
    }

    function makeCreateRequest(submitCreate, keyWord, apiLink) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.withCredentials = true;
            request.open(keyWord, apiLink);
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request.status >= 200 && request.status < 400) {
                        resolve(request.response);
                    } else {
                        reject(request.response);
                    }
                }
            };
            request.send(submitCreate);
        });
    }

    async function submitCreateFormData(submitCreate, keyWord, apiLink) {
        try {
            const requestPromise = makeCreateRequest(submitCreate, keyWord, apiLink);
            const response = await requestPromise;
            responseId = (JSON.parse(response));
            if (createOrModify === 'create')
                window.location.href = '/frontend/home.html';
            if (createOrModify === 'modify')
                window.location.reload();
        }
        catch (errorResponse) {
            alert(errorResponse);
        };
    }
}