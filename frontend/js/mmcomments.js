function makeMMComRequest(submitComment, keyWord, apiLink) {
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
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(submitComment));
    });
}

async function submitMMComFormData(submitComment, keyWord, apiLink) {
    try {
        const requestPromise = makeMMComRequest(submitComment, keyWord, apiLink);
        const response = await requestPromise;
        responseId = (JSON.parse(response));
        return responseId;
    }
    catch (errorResponse) {
        alert(errorResponse);
    };
}

function inputLabelCommentsSpan(addComment, inputLabel, postId, numberOfComments, singlePost, whoIsLoggedIn) {
    //Click once to call the function
    inputLabel.addEventListener('click', () => {
        let submitComment = [];
        submitMMComFormData(submitComment, ('GET'), (mmApi + '/' + postId))
            .then((resp) => {
                if (resp !== undefined) {
                    if (resp.postComments.length !== 0) {
                        for (let j = 0; j < resp.postComments.length; j++) {
                            commentBuilder(
                                singlePost,
                                (resp.postComments[j].mmCommentId),
                                (resp.postComments[j].userPicture),
                                (resp.postComments[j].username),
                                (resp.postComments[j].comTimeCreated),
                                (resp.postComments[j].commentText),
                                whoIsLoggedIn,
                                (resp.postComments[j].userId),
                                (resp.postComments[j].edited),
                                (resp.postComments[j].timeEdited),
                                (resp.postComments[j].likes),
                                (resp.postComments[j].comUserLikes),
                                (resp.postComments[j].dislikes),
                                (resp.postComments[j].comUserDislikes),
                                (resp.postComments[j].numberOfSubComments),
                                postId,
                                j
                            )
                        }
                    }
                }
            });
    }, { once: true })
    //Second click listener to display or hide content
    inputLabel.addEventListener('click', ($event) => {
        $event.preventDefault();
        if (addComment.style.height !== '30px') {
            inputLabel.lastChild.style.display = 'none';
            //singlePost.style.paddingBottom = '5px'
            for (let k = 0; k < addComment.parentElement.getElementsByClassName('single-comment-div').length; k++) {
                addComment.parentElement.getElementsByClassName('single-comment-div')[k].style.display = 'flex'
            }
        } else {
            inputLabel.lastChild.style.display = 'block';
            //singlePost.style.paddingBottom = '0px'
            for (let k = 0; k < addComment.parentElement.getElementsByClassName('single-comment-div').length; k++) {
                addComment.parentElement.getElementsByClassName('single-comment-div')[k].style.display = 'none'
            }
        }
    });

    let commentSpan = document.createElement('span');
    if (numberOfComments !== 0) {
        commentSpan.innerText = 'Comments(' + numberOfComments + ')';
    } else {
        commentSpan.innerText = 'No comments';
    }
    inputLabel.appendChild(commentSpan);
}

function inputLabel2ndCommentsSpan(add2ndComment, inputLabel2nd, mmCommentId, numberOfSubComments, singleCommentDiv, whoIsLoggedIn) {
    inputLabel2nd.addEventListener('click', () => {
        let submitComment = [];
        submitMMComFormData(submitComment, ('GET'), (mmApi + '/comment/' + mmCommentId))
            .then((resp) => {
                if (resp !== undefined) {
                    if (resp.postComments.length !== 0) {
                        for (let j = 0; j < resp.postComments.length; j++) {
                            commentBuilder(
                                singleCommentDiv,
                                (resp.postComments[j].mmComSecLevId),
                                (resp.postComments[j].userPicture),
                                (resp.postComments[j].username),
                                (resp.postComments[j].timeCreated),
                                (resp.postComments[j].comSecLevText),
                                whoIsLoggedIn,
                                (resp.postComments[j].userId),
                                (resp.postComments[j].edited),
                                (resp.postComments[j].timeEdited),
                                (resp.postComments[j].likes),
                                (resp.postComments[j].comUserLikes),
                                (resp.postComments[j].dislikes),
                                (resp.postComments[j].comUserDislikes),
                                (resp.postComments[j].numberOfSubComments = 'disable'),
                                (postId = undefined),
                            )
                        }
                    }
                }
            });
    }, { once: true })
    //console.log(add2ndComment)
    //Second click listener to display or hide content
    inputLabel2nd.addEventListener('click', ($event) => {
        $event.preventDefault();
        if (add2ndComment.style.height !== '30px') {
            inputLabel2nd.lastChild.style.display = 'none';
            for (let k = 2; k < add2ndComment.parentElement.children.length; k++) {
                add2ndComment.parentElement.children[k].style.display = 'flex'
            }
        } else {
            inputLabel2nd.lastChild.style.display = 'block';
            for (let k = 2; k < add2ndComment.parentElement.children.length; k++) {
                add2ndComment.parentElement.children[k].style.display = 'none'
            }
        }
    });

    let commentSpan = document.createElement('span');
    if (numberOfSubComments !== 0) {
        commentSpan.innerText = 'Comments(' + numberOfSubComments + ')';
    } else if (numberOfSubComments === 'disable') {
        commentSpan.style.opacity = 0;
    } else {
        commentSpan.innerText = 'No comments';
    }
    inputLabel2nd.appendChild(commentSpan);
}

function commentBuilder(
    singlePost,
    mmCommentId,
    ImgSrc,
    byWhoInfo,
    byWhenInfo,
    comTxt,
    whoIsLoggedIn,
    whoCreatedComment,
    isItEdited,
    whenIsItEdited,
    amountOfLikes,
    usersWhoLiked,
    amountOfDislikes,
    usersWhoDisliked,
    amountOfSubComments,
    postId,
    j) {

    let singleCommentDiv = document.createElement('div');
    singleCommentDiv.setAttribute('class', 'col-md-12 single-comment-div slide-in-top');
    singleCommentDiv.style.padding = '0';
    singlePost.appendChild(singleCommentDiv);
    singleCommentDiv.style.animationDelay = j-(0.95*j)+'s'

    singleCommentDiv.addEventListener('mouseover', () => {
        singleCommentDiv.getElementsByClassName('comFooter')[0].children[1].style.opacity = '1'
    });
    singleCommentDiv.addEventListener('mouseout', () => {
        singleCommentDiv.getElementsByClassName('comFooter')[0].children[1].style.opacity = '0'
    });

    const mainComment = document.createElement('section');
    mainComment.setAttribute('class', 'mainComment')
    singleCommentDiv.appendChild(mainComment)

    const creator = document.createElement('div');
    creator.setAttribute('class', 'col-md-1 comLeftPart');
    mainComment.appendChild(creator);

    const userImg = document.createElement('img');
    userImg.setAttribute('src', ImgSrc)
    userImg.setAttribute('alt', 'User picture')
    creator.appendChild(userImg)

    const commInfo = document.createElement('div');
    commInfo.setAttribute('class', 'col-md-11 comRightPart');
    mainComment.appendChild(commInfo);

    const whoAndWhen = document.createElement('div');
    whoAndWhen.setAttribute('class', 'col-md-12 whoAndWhen');
    commInfo.appendChild(whoAndWhen);

    let byWho
    if (whoCreatedComment !== whoIsLoggedIn) {
        byWho = document.createElement('a');
        byWho.setAttribute('href', 'http://127.0.0.1:5500/frontend/profile.html?' + whoCreatedComment);
        byWho.innerText = byWhoInfo;
    } else {
        byWho = document.createElement('h5');
        byWho.innerText = byWhoInfo;
    }

    const byWhen = document.createElement('p');
    byWhen.innerText = 'Created: ' + countTime(byWhenInfo);
    whoAndWhen.append(byWho, byWhen);

    const comBody = document.createElement('div');
    comBody.setAttribute('class', 'col-md-12 comBody');
    commInfo.appendChild(comBody);

    let comBodyParag = document.createElement('p');
    comBodyParag.innerText = comTxt;
    comBody.appendChild(comBodyParag);

    const comFooter = document.createElement('div');
    comFooter.setAttribute('class', 'col-md-12 comFooter');
    mainComment.appendChild(comFooter);

    const editedParag = document.createElement('p');
    if (isItEdited !== 0) {
        editedParag.innerText = 'Edited: ' + countTime(whenIsItEdited);
        comFooter.appendChild(editedParag);
    } else {
        comFooter.appendChild(editedParag);
    }

    const btnGroup = document.createElement('div');
    btnGroup.setAttribute('class', 'btn-group');
    btnGroup.style.opacity = '0';
    comFooter.appendChild(btnGroup);

    const comReport = document.createElement('button');
    if (whoCreatedComment !== whoIsLoggedIn) {

        comReport.setAttribute('class', 'btn btn-link')
        comReport.innerText = 'report';
        btnGroup.appendChild(comReport);

    }
    if (whoCreatedComment === whoIsLoggedIn) {
        const comEdit = document.createElement('button');
        comEdit.setAttribute('class', 'btn btn-link');
        comEdit.innerText = 'edit';
        comEdit.addEventListener('click', ($event) => {
            $event.preventDefault();
            if (document.getElementsByClassName('cancel-com-edit').length > 0) {
                document.getElementsByClassName('cancel-com-edit')[0].click()
            }
            comEdit.replaceWith(comEditCancel);
            comBodyParag.replaceWith(comBodyParag2);
            comBodyParag2.innerText = comTxt;
            comBodyParag2.focus();
            comBody.appendChild(editSubmit);
        });

        const comEditCancel = document.createElement('button');
        comEditCancel.setAttribute('class', 'btn btn-link cancel-com-edit');
        comEditCancel.innerText = 'cancel';
        comEditCancel.addEventListener('click', ($event) => {
            $event.preventDefault();
            comBodyParag2.replaceWith(comBodyParag)
            comBody.removeChild(editSubmit);
            comEditCancel.replaceWith(comEdit);
        });

        const editSubmit = document.createElement('button');
        editSubmit.setAttribute('class', 'btn btn-link');
        editSubmit.innerText = 'submit';
        editSubmit.addEventListener('click', ($event) => {
            $event.preventDefault();
            if (amountOfSubComments = 'disable' && postId === undefined) {
                editComOrSubComSubmit((mmApi + '/comment2nd/' + mmCommentId), singleCommentDiv, comBodyParag, comEdit, comEditCancel);
            } else {
                editComOrSubComSubmit((mmApi + '/comment/' + mmCommentId), singleCommentDiv, comBodyParag, comEdit, comEditCancel);
            }
        });

        comBodyParag2 = document.createElement('textarea');
        comBodyParag2.setAttribute('class', 'form-control editedCommentData');
        /*comBodyParag2.oninput = function () {
            comBodyParag2.style.height = "20px";
            comBodyParag2.style.height = Math.min(comBodyParag2.scrollHeight, 200) + "px";
        };*/
        comBodyParag2.oninput = function () {
            comBodyParag2.style.height = "20px";
            comBodyParag2.style.height = Math.min(comBodyParag2.scrollHeight, 200) + "px";
            if (comBodyParag2.scrollHeight > 200) {
                comBodyParag2.style.overflowY = 'scroll';
            } else {
                comBodyParag2.style.overflowY = '';
            }
        };

        const comDelete = document.createElement('button');
        comDelete.setAttribute('class', 'btn btn-link');
        comDelete.innerText = 'delete';

        comDelete.addEventListener('click', ($event) => {
            $event.preventDefault();
            if (amountOfSubComments === 'disable' && postId === undefined) {
                delPostComOrSubCom((mmApi + '/comment2nd/' + mmCommentId), singleCommentDiv);
            } else {
                delPostComOrSubCom((mmApi + '/comment/' + mmCommentId), singleCommentDiv)
            }
        }, { once: true })

        btnGroup.append(comEdit, comDelete);
    }
    const likesDiv = document.createElement('div');
    likesDiv.setAttribute('class', 'likesDiv');
    comFooter.appendChild(likesDiv);

    const comLikesTip = document.createElement('span');
    comLikesTip.setAttribute('class', 'tooltiptext');

    const comLikes = document.createElement('i');
    comLikes.setAttribute('class', 'far fa-thumbs-up');
    comLikes.innerText = amountOfLikes;
    if (amountOfSubComments === 'disable' && postId === undefined) {
        apiAddress = [like = { 'like': 1 }, ('POST'), (mmApi + '/comment2nd/' + mmCommentId + '/likes')];
        likeComment(usersWhoLiked, amountOfLikes, whoIsLoggedIn, comLikes, apiAddress, comLikesTip);
    } else {
        apiAddress = [like = { 'like': 1 }, ('POST'), (mmApi + '/comment/' + mmCommentId + '/likes')];
        likeComment(usersWhoLiked, amountOfLikes, whoIsLoggedIn, comLikes, apiAddress, comLikesTip);
    }

    const comDislikes = document.createElement('i');
    comDislikes.setAttribute('class', 'far fa-thumbs-down');
    comDislikes.innerText = amountOfDislikes;
    if (amountOfSubComments === 'disable' && postId === undefined) {
        apiAddress = [like = { 'like': -1 }, ('POST'), (mmApi + '/comment2nd/' + mmCommentId + '/likes')];
        dislikeComment(usersWhoDisliked, amountOfDislikes, whoIsLoggedIn, comDislikes, apiAddress, comLikesTip);
    } else {
        apiAddress = [like = { 'like': -1 }, ('POST'), (mmApi + '/comment/' + mmCommentId + '/likes')];
        dislikeComment(usersWhoDisliked, amountOfDislikes, whoIsLoggedIn, comDislikes, apiAddress, comLikesTip);
    }

    likesDiv.append(comLikes, comLikesTip, comDislikes);

    let inputLabel2nd;
    let add2ndComment;
    if (amountOfSubComments !== 'disable') {
        add2ndComment = document.createElement('div');
        add2ndComment.setAttribute('class', 'col-md-12 addCommentDiv add-sub-comment');
        singleCommentDiv.appendChild(add2ndComment);
        let subCom = true
        createCommentForm(add2ndComment, mmCommentId, subCom, postId);
        inputLabel2nd = singleCommentDiv.children[1].children[0].children[0];
    } else {
        add2ndComment = document.createElement('div');
        inputLabel2nd = document.createElement('span'); //dummy elements to disable sub commenting
    }

    inputLabel2ndCommentsSpan(
        add2ndComment,
        inputLabel2nd,
        mmCommentId,
        amountOfSubComments,
        singleCommentDiv,
        whoIsLoggedIn,
    );
    if (amountOfSubComments === 'disable' && postId === undefined) {
        reportEventListener(comReport, mainComment, mmCommentId, whoCreatedComment, postId, ('2nd'))
    } else {
        reportEventListener(comReport, mainComment, mmCommentId, whoCreatedComment, postId)
    }
    preventJs();
}

function delPostComOrSubCom(apiAddress, containingElmt) {
    let result = confirm('Do you really want to delete your post?')
    if (result) {
        let submitData = { 'delete': 'delete' };
        let keyWord = 'DELETE';

        submitMMFormData(submitData, keyWord, apiAddress);
        containingElmt.style.display = 'none';
    }
}

function editComOrSubComSubmit(apiAddress, singleCommentDiv, previousParag, editButton, cancelButton) {
    let editedTextArea = singleCommentDiv.getElementsByClassName('editedCommentData')[0];
    let comment = editedTextArea.value;

    if (editedTextArea.value.trim().length > 1) {
        let submitComment = { comment };
        let keyWord = 'PUT';
        submitMMFormData(submitComment, keyWord, apiAddress);
        previousParag.innerText = editedTextArea.value.trim();
        editedTextArea.parentElement.removeChild(editedTextArea.parentElement.lastChild);
        editedTextArea.replaceWith(previousParag);
        cancelButton.replaceWith(editButton);
    } else {
        editedTextArea.setAttribute('placeholder', 'You can not submit empty comment');
        editedTextArea.focus();
        return
    }
}

function likeComment(usersLiked, amountOfLikes, whoIsLoggedIn, likeButton, apiAddress, likesTip) {
    let userLikes = JSON.parse(usersLiked);
    if (userLikes.usersLiked.includes(whoIsLoggedIn)) {
        likeButton.classList.add('likedClass');
    }
    likeButton.style.cursor = 'pointer';
    likeButton.addEventListener('click', ($event) => {
        $event.preventDefault();
        submitMMFormData(apiAddress[0], apiAddress[1], apiAddress[2]).then((likeResponse) => {
            if (likeResponse !== undefined) {
                if (likeResponse.like === true) {
                    likeButton.innerText = amountOfLikes + 1;
                    likeButton.classList.add('likedClass');
                    if (userLikes.usersLiked.includes(whoIsLoggedIn)) {
                        likeButton.innerText = amountOfLikes;
                    }
                } else if (likeResponse.like === false) {
                    likeButton.innerText = amountOfLikes;
                    likeButton.classList.remove('likedClass');
                    if (userLikes.usersLiked.includes(whoIsLoggedIn)) {
                        likeButton.innerText = amountOfLikes - 1;
                    }
                } else if (likeResponse.message) {
                    likesTip.innerText = likeResponse.message;
                    likesTip.style.visibility = 'visible';
                    setTimeout(() => { likesTip.style.visibility = 'hidden' }, 3000)
                }

            }
        });
    });
}
function dislikeComment(usersDisliked, amountOfLikes, whoIsLoggedIn, likeButton, apiAddress, likesTip) {
    let userLikes = JSON.parse(usersDisliked);
    if (userLikes.usersDisliked.includes(whoIsLoggedIn)) {
        likeButton.classList.add('dislikedClass');
    }
    likeButton.style.cursor = 'pointer';
    likeButton.addEventListener('click', ($event) => {
        $event.preventDefault();

        submitMMFormData(apiAddress[0], apiAddress[1], apiAddress[2]).then((likeResponse) => {
            if (likeResponse !== undefined) {
                if (likeResponse.dislike === true) {
                    likeButton.innerText = amountOfLikes + 1;
                    likeButton.classList.add('dislikedClass');
                    if (userLikes.usersDisliked.includes(whoIsLoggedIn)) {
                        likeButton.innerText = amountOfLikes;
                    }
                } else if (likeResponse.dislike === false) {
                    likeButton.innerText = amountOfLikes;
                    likeButton.classList.remove('dislikedClass');
                    if (userLikes.usersDisliked.includes(whoIsLoggedIn)) {
                        likeButton.innerText = amountOfLikes - 1;
                    }
                } else if (likeResponse.message) {
                    likesTip.innerText = likeResponse.message;
                    likesTip.style.visibility = 'visible';
                    setTimeout(() => { likesTip.style.visibility = 'hidden' }, 3000)
                }
            }
        });
    });
}
function reportEventListener(reportButton, divToReplace, whatToReportId, whatToReportCreatorId, postId, lastComLevel) {
    reportButton.addEventListener('click', ($event) => {
        $event.preventDefault();
        const comRepReason = document.createElement('div');
        comRepReason.setAttribute('id', 'comRepReasonDiv')

        if (document.getElementById('comRepReasonDiv')) {
            document.getElementById('comRepReasonDiv').remove();
        }
        let replace
        if (lastComLevel !== '2nd') {
            divToReplace.insertAdjacentElement('afterend', comRepReason)
            replace = 'replace';
        } else {
            divToReplace.insertAdjacentElement('afterend', comRepReason)
            replace = 'append'
        }

        const comRepForm = document.createElement('form');
        comRepForm.setAttribute('class', '');
        comRepReason.appendChild(comRepForm);

        createReportDiv(comRepForm, divToReplace, comRepReason, replace);

        comRepSubmit = document.createElement('button');
        comRepSubmit.setAttribute('class', 'btn btn-link')
        comRepSubmit.innerText = 'Submit'
        comRepForm.lastChild.appendChild(comRepSubmit)

        comRepSubmit.addEventListener('click', ($event) => {
            $event.preventDefault();
            let repReasonData = document.querySelector('input[name="reportOptions"]:checked').value;
            let submitReportData
            let apiLink = mmApi + '/report'
            if (replace === 'append') {
                submitReportData = {
                    'level': 'bottom',
                    'commentId2nd': whatToReportId,
                    'reportReason': repReasonData,
                    'whoCreatedPost': whatToReportCreatorId
                };

            } else if (postId === undefined) {
                submitReportData = {
                    'level': 'top',
                    'postId': whatToReportId,
                    'commentId': null,
                    'reportReason': repReasonData,
                    'whoCreatedPost': whatToReportCreatorId
                };
            } else if (replace === 'replace') {
                submitReportData = {
                    'level': 'mid',
                    'postId': postId,
                    'commentId': whatToReportId,
                    'reportReason': repReasonData,
                    'whoCreatedPost': whatToReportCreatorId
                };
            }
            submitMMFormData(submitReportData, ('POST'), apiLink);
        });
        preventJs();
    });
}