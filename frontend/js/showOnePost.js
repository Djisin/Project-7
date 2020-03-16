let api = 'http://127.0.0.1:3000/api/posts';

const showPost = document.getElementById('showPost');

let url = window.location.href
let reqPostId = url.substring(url.lastIndexOf('?') + 1)

let request = new XMLHttpRequest();

request.open('GET', api + '/' + reqPostId, true);
request.withCredentials = true;

request.onload = function () {
    if (request.status=401 )
    //{window.location.href = '/login'}
    // Begin accessing JSON data here
    data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {

        const container = document.createElement('div');

        const postTitle = document.createElement('h2');
        postTitle.setAttribute('class', 'postTitleClass');
        postTitle.textContent = data.post[0].postTitle;
        container.appendChild(postTitle);

        if (!data.post[0].postText == null || !data.post[0].postText == '') {
            postText = document.createElement('p');
            postText.setAttribute('class', 'postTextClass');
            postText.textContent = data.post[0].postText;
            container.appendChild(postText);
        }

        let postPicture
        if (!data.post[0].postPicture == null || !data.post[0].postPicture == '') {
            postPicture = document.createElement('img');
            postPicture.setAttribute('class', 'postPictureClass');
            postPicture.setAttribute('src', data.post[0].postPicture);
            container.appendChild(postPicture);
        }

        let edited
        if (!data.post[0].edited == 0) {
            edited = document.createElement('p');
            edited.setAttribute('class', 'editedClass');
            edited.textContent = 'Edited';
            container.appendChild(edited);
        }

        let timeEdited
        if (!data.post[0].timeEdited == null || !data.post[0].timeEdited == '') {
            timeEdited = document.createElement('p');
            timeEdited.setAttribute('class', 'timeEditedClass');
            timeEdited.textContent = data.post[0].timeEdited;
            container.appendChild(timeEdited);
        }

        const postTimeCreated = document.createElement('p');
        postTimeCreated.setAttribute('class', 'timeCreatedClass');
        postTimeCreated.innerText = data.post[0].postTimeCreated;
        container.appendChild(postTimeCreated);

        const postLikes = document.createElement('p')
        postLikes.setAttribute('class', 'likesClass');
        postLikes.innerText = data.post[0].postLikes;
        container.appendChild(postLikes);

        const postDislikes = document.createElement('p')
        postDislikes.setAttribute('class', 'likesClass');
        postDislikes.innerText = data.post[0].postDislikes;
        container.appendChild(postDislikes);

        const postUserLiked = document.createElement('p')
        postUserLiked.setAttribute('class', 'userLikesClass');
        //treba petlja da se napravi
        postUserLiked.innerText = data.post[0].postUserLiked;
        container.appendChild(postUserLiked)

        const postUserDisliked = document.createElement('p')
        postUserDisliked.setAttribute('class', 'userLikesClass');
        //treba petlja da se napravi
        postUserDisliked.innerText = data.post[0].postUserDisliked;
        container.appendChild(postUserDisliked);

        const createdBy = document.createElement('h4');
        createdBy.setAttribute('class', 'createdByClass');
        createdBy.innerText = data.post[0].username;
        container.appendChild(createdBy);

        if (data.userCreatedThisPost) {
            const modifyButton = document.createElement('button');
            modifyButton.setAttribute('class', 'button');
            modifyButton.innerHTML = 'Modify';
            container.appendChild(modifyButton);

            modifyButton.addEventListener('click', () => {
                //window.location.href = '/frontend/post.html?:id?modify'+data.post[0].postId
                showPost.removeChild(container)

                const modifyForm = document.createElement('form');

                const modifyFormRow1 = document.createElement('div')
                modifyFormRow1.setAttribute('class', 'form-row col-md-12')
                const modifyFormDiv1 = document.createElement('div');
                modifyFormDiv1.setAttribute('class', 'col-md-3')

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

                const modifyFormRow2 = document.createElement('div');
                modifyFormRow2.setAttribute('class', 'form-row col-md-12')
                const modifyFormDiv2 = document.createElement('div');
                modifyFormDiv2.setAttribute('class', 'col-md-3');

                const imgPreview = document.createElement('img');
                imgPreview.setAttribute('id', 'img-preview');

                const modifyPictureLabel1 = document.createElement('label');
                modifyPictureLabel1.setAttribute('for', 'image');
                modifyPictureLabel1.innerText = 'Image';

                if (!data.post[0].postPicture == null || !data.post[0].postPicture == '') {
                    imgPreview.setAttribute('src', data.post[0].postPicture);
                }
                const modifyPictureInput = document.createElement('input');
                modifyPictureInput.setAttribute('type', 'file');
                modifyPictureInput.setAttribute('name', 'fileupload');
                modifyPictureInput.setAttribute('value', 'fileupload');
                modifyPictureInput.setAttribute('id', 'fileupload');
                modifyPictureInput.setAttribute('class', 'btn btn-primary');
                const modifyPictureLabel2 = document.createElement('label');
                modifyPictureLabel2.setAttribute('for', 'fileupload');
                modifyPictureLabel2.innerText = 'Select new picture to upload';

                const includeScript = document.createElement('script');
                includeScript.setAttribute('src', 'js/displayImage.js');

                modifyFormDiv2.append(modifyPictureLabel1, imgPreview, modifyPictureLabel2, modifyPictureInput, includeScript);
                modifyFormRow2.appendChild(modifyFormDiv2);

                const modifyFormRow3 = document.createElement('div')
                modifyFormRow3.setAttribute('class', 'form-row col-md-12')
                const modifyFormDiv3 = document.createElement('div');
                modifyFormDiv3.setAttribute('class', 'col-md-3');

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
                modifyFormDiv3.append(modifyTextLabel, modifyTextInput);
                modifyFormRow3.appendChild(modifyFormDiv3);

                const submitButton = document.createElement('button');
                submitButton.setAttribute('id', 'submit-button');
                submitButton.setAttribute('type', 'submit');
                submitButton.setAttribute('class', 'btn btn-warning');
                submitButton.innerText = 'Modify post';

                modifyForm.append(modifyFormRow1, modifyFormRow2, modifyFormRow3, submitButton);
                showPost.appendChild(modifyForm);

                submitData = {};
                submitButton.addEventListener('click', ($event) => {
                    $event.preventDefault();
                    submitData = getModifiedPost();
                    submitFormData(submitData);
                    console.log(submitData)
                });

                function getModifiedPost() {
                    let postTitleModified = document.getElementById('postTitle').value;
                    let postTextModified = document.getElementById('postText').value;
                    let imageModified = document.getElementById('fileupload').value;
                    post = { postTitleModified, postTextModified, imageModified }
                    return post
                };
                function makeRequest(submitData) {
                    return new Promise((resolve, reject) => {
                        let request = new XMLHttpRequest();
                        //console.log(request.body)
                        request.open('PUT', api + '/' + reqPostId);

                        request.onreadystatechange = () => {
                            if (request.readyState === 4) {
                                if (request.status >= 200 && request.status < 400) {
                                    resolve(request.response);
                                } else {
                                    reject(request.response);
                                }
                            }
                        };
                        request.withCredentials = true;
                        request.setRequestHeader('Content-Type', 'application/json');
                        request.send(JSON.stringify(submitData));
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

            });
        }

        if (data.userCreatedThisPost) {
            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('class', 'button');
            deleteButton.innerHTML = 'Delete';
            container.appendChild(deleteButton);

            deleteButton.addEventListener('click', ($event) => {
                $event.preventDefault();
                makeDeleteRequest()
                submitDeleteFormData()
                function makeDeleteRequest() {
                    return new Promise((resolve, reject) => {
                        let request = new XMLHttpRequest();
                        request.open('DELETE', api + '/' + reqPostId);
                        request.onreadystatechange = () => {
                            if (request.readyState === 4) {
                                if (request.status >= 200 && request.status < 400) {
                                    resolve(request.response);
                                } else {
                                    reject(request.response);
                                }
                            }
                        };
                        request.withCredentials = true;
                        request.setRequestHeader('Content-Type', 'application/json');
                        request.send();
                    });
                };
                async function submitDeleteFormData() {
                    try {
                        const requestPromise = makeDeleteRequest();
                        const response = await requestPromise;
                        responseId = (JSON.parse(response));
                        window.location.href = '/frontend/posts.html'
                    }
                    catch (errorResponse) {
                        alert(errorResponse);
                    };
                }
            });
        };

        showPost.appendChild(container)
    } else {
        alert('There is an error');
    }

}
request.send();

