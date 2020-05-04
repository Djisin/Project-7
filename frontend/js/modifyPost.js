function modifyUserPost() {
    const divOnTop = document.createElement('div');
    divOnTop.setAttribute('id', 'divOnTop');
    divOnTop.style.display = 'flex'

    const modifyForm = document.createElement('form');
    modifyForm.setAttribute('id', 'createPostForm')
    modifyForm.setAttribute('enctype', 'multipart/form-data')

    const modifyFormRow1 = document.createElement('div')
    modifyFormRow1.setAttribute('class', 'form-row col-md-12')
    const modifyFormDiv1 = document.createElement('div');
    modifyFormDiv1.setAttribute('class', 'col-md-12')

    const modifyTitleLabel = document.createElement('label');
    modifyTitleLabel.setAttribute('for', 'postTitle');
    modifyTitleLabel.innerText = 'Modify title'
    const modifyTitleInput = document.createElement('input');
    modifyTitleInput.setAttribute('id', 'postTitle');
    modifyTitleInput.setAttribute('name', 'postTitle');
    modifyTitleInput.setAttribute('type', 'text');
    modifyTitleInput.setAttribute('class', 'form-control');
    modifyTitleInput.value = data.post[0].postTitle;
    modifyTitleInput.required = true;
    modifyFormDiv1.append(modifyTitleLabel, modifyTitleInput);
    modifyFormRow1.appendChild(modifyFormDiv1);

    const modifyFormRow2 = document.createElement('div')
    modifyFormRow2.setAttribute('class', 'form-row col-md-12')
    const modifyFormDiv2 = document.createElement('div');
    modifyFormDiv2.setAttribute('class', 'col-md-12');

    const modifyTextLabel = document.createElement('label');
    modifyTextLabel.setAttribute('for', 'postText');
    modifyTextLabel.innerText = 'Change content';
    const modifyTextInput = document.createElement('textarea');
    modifyTextInput.setAttribute('id', 'postText');
    modifyTextInput.setAttribute('name', 'postText');
    modifyTextInput.setAttribute('type', 'text-area');
    modifyTextInput.setAttribute('class', 'form-control');
    if (data.post[0].postText == null || data.post[0].postText == '') {
        modifyTextInput.setAttribute('placeholder', 'Write here');
    } else {
        modifyTextInput.innerText = data.post[0].postText;
    }
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
    tinymce.EditorManager.execCommand('mceAddEditor', false, modifyTextInput);
    modifyFormDiv2.append(modifyTextLabel, modifyTextInput);
    modifyFormRow2.appendChild(modifyFormDiv2);

    const modifyFormRow3 = document.createElement('div');
    modifyFormRow3.setAttribute('class', 'form-row col-md-12')
    const modifyFormDiv3 = document.createElement('div');
    modifyFormDiv3.setAttribute('class', 'col-md-12');

    const picDiv = document.createElement('div');
    picDiv.setAttribute('class', 'col-md-5')
    picDiv.setAttribute('id', 'picDiv')
    let uploadDiv = document.createElement('div');
    uploadDiv.setAttribute('id', 'uploadDiv')
    uploadDiv.setAttribute('class', 'col-md-7');

    const imgPreview = document.createElement('img');
    imgPreview.setAttribute('id', 'img-preview');
    picDiv.appendChild(imgPreview)

    const modifyPictureInput = document.createElement('input');
    modifyPictureInput.setAttribute('type', 'file');
    modifyPictureInput.setAttribute('name', 'fileupload');
    modifyPictureInput.setAttribute('value', 'fileupload');
    modifyPictureInput.setAttribute('id', 'fileupload');
    modifyPictureInput.setAttribute('class', 'btn btn-secondary');
    const modifyPictureLabel2 = document.createElement('label');
    modifyPictureLabel2.setAttribute('for', 'fileupload');
    modifyPictureLabel2.innerText = 'Select new picture to upload';

    uploadDiv.append(modifyPictureLabel2, modifyPictureInput)

    const includeScript = document.createElement('script');
    includeScript.setAttribute('src', 'js/displayImage.js');

    modifyFormDiv3.append(picDiv, uploadDiv, includeScript);
    modifyFormRow3.appendChild(modifyFormDiv3);

    let prevPic = true;
    if (!data.post[0].postPicture == null || !data.post[0].postPicture == '') {
        imgPreview.setAttribute('src', data.post[0].postPicture);

        removeImgButton = document.createElement('button');
        removeImgButton.setAttribute('class', 'btn btn-danger');
        removeImgButton.setAttribute('id', 'removeImgButton');
        removeImgButton.innerText = 'Remove';
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
            previewImg.setAttribute('src', './img/picPH.png');
        });

    } else {
        imgPreview.setAttribute('src', 'img/picPH.png');
    }

    const submitButton = document.createElement('button');
    submitButton.setAttribute('id', 'submit-button');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('class', 'btn btn-warning');
    submitButton.innerText = 'Modify post';

    let closeButton = document.createElement('span');
    closeButton.textContent = "x";
    closeButton.setAttribute('id', 'closeButton');

    closeButton.addEventListener('click', (e) => {
        window.location.reload()
        modifyForm.reset();
    });
    divOnTop.appendChild(closeButton);

    modifyForm.append(modifyFormRow1, modifyFormRow2, modifyFormRow3, submitButton);
    divOnTop.appendChild(modifyForm)
    showPost.appendChild(divOnTop);

    submitData = new FormData;
    submitButton.addEventListener('click', ($event) => {
        $event.preventDefault();

        let imageModified = document.getElementById('fileupload').files[0];
        if (imageModified !== undefined || imageModified !== null) {
            submitData.append('file', imageModified)
        }
        let submitDataContent = getModifiedPost();
        submitDataContent = JSON.stringify(submitDataContent);
        submitData.append('prevPic', prevPic);
        submitData.append('post', submitDataContent);
        submitFormData(submitData);
    });

    function getModifiedPost() {
        let postTitleModified = document.getElementById('postTitle').value;
        let postTextModified = tinyMCE.activeEditor.getContent();
        post = { postTitleModified, postTextModified }
        return post
    };
    function makeRequest(submitData) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('PUT', api + '/' + reqPostId);
            request.withCredentials = true;
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request.status >= 200 && request.status < 400) {
                        resolve(request.response);
                    } else {
                        reject(request.response);
                    }
                }
            };
            //request.setRequestHeader('Content-Type', 'application/json');
            request.send(submitData);
        });
    };
    async function submitFormData(submitData) {
        try {
            const requestPromise = makeRequest(submitData);
            const response = await requestPromise;
            responseId = (JSON.parse(response));
            location.reload();
        }
        catch (errorResponse) {
            alert(errorResponse);
        };
    }
}