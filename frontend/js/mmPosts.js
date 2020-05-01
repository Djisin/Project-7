function constructCreateMMPost(attachTo) {
    const contentDiv = document.createElement('div');
    contentDiv.setAttribute('id', 'create-content-div');
    attachTo.appendChild(contentDiv);

    const contentHeader = document.createElement('h3');
    contentHeader.innerText = 'Create post';
    contentDiv.appendChild(contentHeader);

    const createMMPostDiv = document.createElement('form');
    createMMPostDiv.setAttribute('id', 'createMMDiv');
    contentDiv.appendChild(createMMPostDiv);

    const createMMPostTxt = document.createElement('textarea');
    createMMPostTxt.setAttribute('id', 'mmPostTxt');
    createMMPostTxt.setAttribute('class', 'form-control')
    createMMPostTxt.placeholder = 'Write something here...'
    createMMPostDiv.appendChild(createMMPostTxt);
    preventJ(createMMPostTxt);

    const buttonGroup = document.createElement('div');
    buttonGroup.setAttribute('class', 'btn-group');
    createMMPostDiv.appendChild(buttonGroup);

    const addMMContent = document.createElement('input');
    addMMContent.setAttribute('type', 'file');
    addMMContent.setAttribute('id', 'addMMContent');

    const mmButton = document.createElement('button');
    mmButton.setAttribute('class', 'btn btn-default');
    mmButton.innerHTML = '<i class="far fa-image"></i>'
    buttonGroup.appendChild(mmButton);
    mmButton.addEventListener('click', ($event) => {
        $event.preventDefault();
        showMMLabel();
        hideLinkInput();
        addMMContent.click();
        if (addMMContent.value !== null || addMMContent.value !== '') {
            addMMContent.onchange = () => {
                mmLabel.innerText = addMMContent.files[0].name;
                hideLinkInput();
                mmLabel.addEventListener('click', ($event) => {
                    $event.preventDefault()
                    hideMMLabel();
                });
            }
        }
    });

    function hideMMLabel() {
        mmLabel.style.flexGrow = '';
        mmLabel.style.padding = '0';
        mmLabel.style.border = '0';
        mmLabel.style.opacity = '0';
        mmLabel.style.width = '0';
        mmLabel.innerText = '';
        addMMContent.value = null;
    }

    function showMMLabel() {
        mmLabel.style.flexGrow = '100';
        mmLabel.style.padding = ' 6px 12px 6px 12px';
        mmLabel.style.border = null;
        mmLabel.style.opacity = '1';
        linkInput.value = '';
    }

    const mmLabel = document.createElement('label');
    mmLabel.setAttribute('class', 'input-group-addon');
    mmLabel.setAttribute('data-toggle', 'tooltip');
    mmLabel.setAttribute('data-placement', 'top');
    mmLabel.setAttribute('title', 'Click here to remove')
    mmLabel.setAttribute('id', 'mmLabel');
    mmLabel.style.border = '0';
    buttonGroup.appendChild(mmLabel);

    const linkButton = document.createElement('button');
    linkButton.setAttribute('class', 'btn btn-default');
    linkButton.innerHTML = '<i class="fas fa-link"></i>'
    buttonGroup.appendChild(linkButton);
    linkButton.addEventListener('click', ($event) => {
        $event.preventDefault();
        if (linkInput.style.flexGrow == 0) {
            displayLinkInput();
            hideMMLabel();
        } else {
            hideLinkInput();
        }

    });

    function displayLinkInput() {
        linkInput.style.flexGrow = '100';
        linkInput.style.padding = ' 6px 12px 6px 12px';
        linkInput.style.border = null;
        linkInput.style.opacity = '1';
        linkInput.focus();
        addMMContent.value = null;
    }
    function hideLinkInput() {
        linkInput.style.flexGrow = '';
        linkInput.style.padding = '0';
        linkInput.style.border = '0';
        linkInput.style.opacity = '0';
        linkInput.style.width = '0';
        linkInput.value = '';
    }

    const linkInput = document.createElement('input');
    linkInput.setAttribute('type', 'url');
    linkInput.setAttribute('class', 'input-group-addon form-control');
    linkInput.style.border = '0';
    buttonGroup.appendChild(linkInput)

    const createButton = document.createElement('button');
    createButton.setAttribute('class', 'btn btn-default');
    createButton.innerText = 'Post'
    buttonGroup.appendChild(createButton);
    createButton.addEventListener('click', ($event) => {
        $event.preventDefault();

        let submitMMData = new FormData
        submitMMData.append('embedLink', null);
        submitMMData.append('mmPost', null);

        if (addMMContent.files.length !== 0) {
            if (linkInput.value.trim().length === 0) {
                submitMMData.append('file', addMMContent.files[0]);
                submitMMData.append('embed', false)
            } else {
                errorParag.innerText = 'You can only provide link, or upload video or picture.'
                return
            }
        }
        if (linkInput.value.trim().length !== 0) {
            if (addMMContent.files.length === 0) {
                submitMMData.delete('embedLink');
                if (linkInput.value.indexOf('https://www.youtube.com') >= 0) {
                    let newLink = linkInput.value.replace('/watch?v=', '/embed/');
                    submitMMData.append('embedLink', newLink);
                    submitMMData.append('embed', true);
                } else if (linkInput.value.indexOf('https://youtu.be/') >= 0) {
                    let newLink = linkInput.value.replace('youtu.be/', 'www.youtube.com/embed/');
                    submitMMData.append('embedLink', newLink);
                    submitMMData.append('embed', true);
                } else if (linkInput.value.indexOf('youtube') && linkInput.value.trim().length < 25) {
                    errorParag.innerText = 'Provide a valid youtube link video.'
                    return
                } else {
                    submitMMData.append('embedLink', linkInput.value);
                    submitMMData.append('embed', true);
                }

            } else {
                errorParag.innerText = 'You can only provide link, or upload video or picture.'
                return
            }
        }
        if (createMMPostTxt.value.trim().length !== 0) {
            if (createMMPostTxt.value.trim().length !== 0) {
                dataForSubmit = createMMPostTxt.value
                submitMMData.delete('mmPost');
                submitMMData.append('mmPost', dataForSubmit);
            } else {
                dataForSubmit = null;
            }
        }
        if (createMMPostTxt.value.trim().length === 0 && linkInput.value.trim().length === 0 && addMMContent.files.length === 0) {
            errorParag.innerText = 'You can not create post without any content.'
            createMMPostTxt.focus();
            setTimeout(() => {
                errorParag.innerText = '';
            }, 5000);
            return
        } else {
            submitMMpost(submitMMData);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }

        function makeSubmitMMPost(submitMMData) {
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.open('POST', mmApi + '/createPost', true);
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
                request.send(submitMMData);
            });
        }
        async function submitMMpost(submitMMData) {
            try {
                const requestPromise = makeSubmitMMPost(submitMMData);
                const response = await requestPromise;
            }
            catch (errorResponse) {
                alert(errorResponse);
            };
        }
    })
    const errorParag = document.createElement('p');
    errorParag.setAttribute('id', 'errorParag');
    contentDiv.appendChild(errorParag);
}

function constructMMPost(attachTo, mmContent, whoIsLoggedIn) {

    const contentDivMM = document.createElement('div');
    contentDivMM.setAttribute('class', 'col-md-12 content-div');
    attachTo.appendChild(contentDivMM);

    for (let i = 0; i < mmContent.length; i++) {

        const singlePost = document.createElement('div');
        singlePost.setAttribute('class', 'col-md-12 mmPosts slide-in-fwd-center');
        contentDivMM.appendChild(singlePost);
        singlePost.style.animationDelay = (i + 0.3) - (0.8 * i) + 's'

        const singlePostHeader = document.createElement('div');
        singlePostHeader.setAttribute('class', 'singlePostHeader');
        singlePost.appendChild(singlePostHeader);

        const userPic = document.createElement('img');
        userPic.setAttribute('alt', 'User picture')
        userPic.setAttribute('src', mmContent[i].userPicture);
        singlePostHeader.appendChild(userPic);

        const userName = document.createElement('a');
        userName.setAttribute('href', 'http://127.0.0.1:5500/frontend/profile.html?' + mmContent[i].userId)
        userName.innerText = mmContent[i].username;
        singlePostHeader.appendChild(userName);

        const mmPostTimeCreated = document.createElement('p');
        mmPostTimeCreated.setAttribute('class', 'timeCreated');
        mmPostTimeCreated.innerText = countTime(mmContent[i].timeCreated);
        singlePostHeader.appendChild(mmPostTimeCreated);

        const singlePostText = document.createElement('p');
        singlePostText.setAttribute('class', 'post-text-content');

        if (mmContent[i].postText !== null) {
            singlePostText.innerText = mmContent[i].postText;
            singlePost.appendChild(singlePostText);
        }
        if (mmContent[i].embed === 0) {
            if (mmContent[i].postMMField !== null) {

                mmField = mmContent[i].postMMField;
                mmPic = mmField.substring(mmField.length - 4);

                let posibleImgExtensions = ['.jpg', '.png', 'apng', '.bmp', '.gif', '.svg', 'webp'];
                let posibleVidExtensions = ['.flv', '.mp4', '.ts', '.3gp', '.mov', '.avi', '.wmv'];

                if (posibleImgExtensions.includes(mmPic)) {
                    const postPicture = document.createElement('img');
                    postPicture.setAttribute('alt', 'Picture can not load');
                    postPicture.setAttribute('src', mmContent[i].postMMField);
                    singlePost.appendChild(postPicture);
                } else if (posibleVidExtensions.includes(mmPic)) {
                    const postVideo = document.createElement('video');
                    postVideo.setAttribute('alt', 'Video can not be loaded');
                    postVideo.controls = true;
                    postVideo.setAttribute('src', mmContent[i].postMMField);
                    singlePost.appendChild(postVideo);
                }
            }
        } else if (mmContent[i].embed === 1) {
            if (mmContent[i].postMMField !== null) {
                const embed = document.createElement('iframe');
                embed.setAttribute('class', 'embed-responsive-item');
                embed.frameBorder = 0;
                embed.width = '100%'
                embed.allowFullscreen = true;
                embed.setAttribute('src', mmContent[i].postMMField);
                singlePost.appendChild(embed);
            } else {
                const errParagOnPost = document.createElement('p');
                errParagOnPost.innerText = 'Multimedia content not found or can not be played, please try different format';
                singlePost.appendChild(errParagOnPost);
            }
        }

        const singlePostFooter = document.createElement('div');
        singlePostFooter.setAttribute('class', 'col-md-12 singlePostFooter');
        singlePost.appendChild(singlePostFooter);

        const edited = document.createElement('p');
        if (mmContent[i].timeEdited !== null) {
            edited.innerText = 'Edited: ' + countTime(mmContent[i].timeEdited)
        }
        singlePostFooter.appendChild(edited);

        const comReport = document.createElement('button');
        if (mmContent[i].userId !== whoIsLoggedIn) {
            comReport.setAttribute('class', 'btn btn-link')
            comReport.innerText = 'report';
            hamburgerMenu(singlePostHeader, [comReport]);
        }

        if (mmContent[i].userId === whoIsLoggedIn) {
            const editButton = document.createElement('button');
            editButton.setAttribute('class', 'btn btn-link editMMPost');
            editButton.innerText = 'edit';

            let multimedia = mmContent[i].postMMField;
            let embeding = mmContent[i].embed;
            let mmText = mmContent[i].postText;
            let editingPostId = mmContent[i].mmPostId;
            let divOnTop = document.getElementById('divOnTop');
            editMMPostFunction(divOnTop, editButton, mmText, multimedia, embeding, editingPostId);

            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('class', 'btn btn-link');
            deleteButton.innerText = 'delete';
            hamburgerMenu(singlePostHeader, [editButton, deleteButton])
            deleteButton.addEventListener('click', ($event) => {
                $event.preventDefault();
                delPostComOrSubCom((mmApi + '/' + mmContent[i].mmPostId), singlePost)
            });
            preventJs()
        }

        const likesDiv = document.createElement('div');
        likesDiv.setAttribute('class', 'likes-div');
        singlePostFooter.appendChild(likesDiv);

        const likesTip = document.createElement('span');
        likesTip.setAttribute('class', 'tooltiptext');

        const likes = document.createElement('i');
        likes.setAttribute('class', 'far fa-thumbs-up');
        likes.innerText = mmContent[i].postLikes;
        apiAddress = [like = { 'like': 1 }, ('POST'), (mmApi + '/' + mmContent[i].mmPostId + '/likes')];
        likeComment(
            (mmContent[i].postUsersLiked),
            mmContent[i].postLikes,
            whoIsLoggedIn,
            likes,
            apiAddress,
            likesTip
        );

        const dislikes = document.createElement('i');
        dislikes.setAttribute('class', 'far fa-thumbs-down');
        dislikes.innerText = mmContent[i].postDislikes;
        apiAddress = [like = { 'like': -1 }, ('POST'), (mmApi + '/' + mmContent[i].mmPostId + '/likes')];

        dislikeComment(
            (mmContent[i].postUsersDisliked),
            mmContent[i].postDislikes,
            whoIsLoggedIn,
            dislikes,
            apiAddress,
            likesTip
        );

        likesDiv.append(likes, likesTip, dislikes);

        //add comments
        let addComment = document.createElement('div');
        addComment.setAttribute('class', 'col-md-12 addCommentDiv');
        singlePost.appendChild(addComment);

        //Function from comment.js for Building input Comment form var order: div for form, post id
        createCommentForm(addComment, (mmContent[i].mmPostId));

        let inputLabel = singlePost.getElementsByClassName('labelDiv')[0];

        //Function for comment span on input comment variable order: div for form, inputLabel, numberOfComments, post id, div to attach comments
        inputLabelCommentsSpan(
            addComment,
            inputLabel,
            (mmContent[i].mmPostId),
            (mmContent[i].numberOfComments),
            singlePost,
            (whoIsLoggedIn)
        );
        reportEventListener(comReport, singlePostFooter, (mmContent[i].mmPostId), (mmContent[i].userId), (undefined))
    }
}