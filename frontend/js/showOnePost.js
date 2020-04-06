let api = 'http://127.0.0.1:3000/api/posts';

const showPost = document.getElementById('showPost');

let url = window.location.href
let reqPostId = url.substring(url.lastIndexOf('?') + 1)

let request = new XMLHttpRequest();

request.open('GET', api + '/' + reqPostId, true);
request.withCredentials = true;

request.onload = function () {
    // Begin accessing JSON data here
    data = JSON.parse(this.response);
    console.log(data)
    if (request.status >= 200 && request.status < 400) {
        const userCredentials = document.getElementById('credentials');
        userCredentials.innerText = data.userInfo[0].firstName + ' ' + data.userInfo[0].lastName

        const container = document.createElement('div');
        container.setAttribute('class', 'col-md-12 mainContainer');

        const postTitle = document.createElement('h2');
        postTitle.setAttribute('class', 'postTitleClass');
        postTitle.textContent = data.post[0].postTitle;
        container.appendChild(postTitle);

        const divMainContent = document.createElement('div');
        divMainContent.setAttribute('class', 'col-md-12 divMainContent');
        container.appendChild(divMainContent);

        let postPicture;
        if (!data.post[0].postPicture == null || !data.post[0].postPicture == '') {
            postPicture = document.createElement('img');
            postPicture.setAttribute('class', 'postPictureClass');
            postPicture.setAttribute('src', data.post[0].postPicture);
            divMainContent.appendChild(postPicture);
        }

        let postText;
        if (!data.post[0].postText == null || !data.post[0].postText == '') {
            postText = document.createElement('p');
            postText.setAttribute('class', 'postTextClass');
            postText.textContent = data.post[0].postText;
            divMainContent.appendChild(postText);
        }

        const createdByMain = document.createElement('div');
        createdByMain.setAttribute('class', 'col-md-12 createdByMain')
        container.appendChild(createdByMain)

        const createdBy = document.createElement('h4');
        createdBy.setAttribute('class', 'createdByClass');
        createdBy.innerText = data.post[0].username;
        createdByMain.appendChild(createdBy);

        const likes = document.createElement('div');
        likes.setAttribute('class', 'col-md-12 likes')
        container.appendChild(likes)

        const postLikes = document.createElement('i')
        postLikes.setAttribute('class', 'far fa-thumbs-up');
     
        postLikes.innerText = data.post[0].postLikes;
        likes.appendChild(postLikes);

        let userLikes = JSON.parse(data.post[0].postUserLiked);
        if (userLikes.usersLiked.includes(data.userInfo[0].userId)) {
            postLikes.classList.add('likedClass');
        }
        postLikes.style.cursor = 'pointer';
        postLikes.addEventListener('click', ($event) => {
            $event.preventDefault();
            let like = { 'like': 1 };
            submitFormDataLike(like).then((likeResponse) => {
                if (likeResponse !== undefined) {
                    if (likeResponse.like === true) {
                        postLikes.innerText = data.post[0].postLikes + 1;
                        postLikes.classList.add('likedClass');
                        if (userLikes.usersLiked.includes(data.userInfo[0].userId)) {
                            postLikes.innerText = data.post[0].postLikes;
                        }
                    } else if (likeResponse.like === false) {
                        postLikes.innerText = data.post[0].postLikes;
                        postLikes.classList.remove('likedClass');
                        if (userLikes.usersLiked.includes(data.userInfo[0].userId)) {
                            postLikes.innerText = data.post[0].postLikes - 1;
                        }
                    }
                }
            });
        });

        const likesTip = document.createElement('span');
        likesTip.setAttribute('class', 'tooltiptext');
        likes.appendChild(likesTip)

        const postDislikes = document.createElement('i');
        postDislikes.setAttribute('class', 'far fa-thumbs-down');
        
        postDislikes.innerText = data.post[0].postDislikes;
        likes.appendChild(postDislikes);

        let userDislikes = JSON.parse(data.post[0].postUserDisliked);
        if (userDislikes.usersDisliked.includes(data.userInfo[0].userId)) {
            postDislikes.classList.add('dislikedClass')
        }
        postDislikes.style.cursor = 'pointer';
        postDislikes.addEventListener('click', ($event) => {
            $event.preventDefault();
            let like = { 'like': -1 };
            submitFormDataLike(like).then((likeResponse) => {
                if (likeResponse !== undefined) {
                    if (likeResponse.dislike === true) {
                        postDislikes.innerText = data.post[0].postDislikes + 1;
                        postDislikes.classList.add('dislikedClass');
                        if (userDislikes.usersDisliked.includes(data.userInfo[0].userId)) {
                            postDislikes.innerText = data.post[0].postDislikes;
                        }
                    } else if (likeResponse.dislike === false) {
                        postDislikes.innerText = data.post[0].postDislikes
                        postDislikes.classList.remove('dislikedClass');
                        if (userDislikes.usersDisliked.includes(data.userInfo[0].userId)) {
                            postDislikes.innerText = data.post[0].postDislikes - 1;
                        }
                    }
                }
            });
        });

        function makeRequestLike(like) {
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.withCredentials = true;
                request.open('POST', api + '/' + data.post[0].postId + '/likes');
                request.onreadystatechange = () => {
                    if (request.readyState === 4) {
                        if (request.status >= 200 && request.status < 400) {
                            resolve(request.response);
                        } else if (request.status = 403) {
                            let respMessage = JSON.parse(request.response)
                            likesTip.innerText = respMessage.message;
                            likesTip.style.visibility = 'visible';
                            setTimeout(() => { likesTip.style.visibility = 'hidden' }, 3000)
                        } else {
                            reject(request.response);
                        }
                    }
                };
                request.setRequestHeader('Content-Type', 'application/json');
                request.send(JSON.stringify(like));
            });
        }
        async function submitFormDataLike(like) {
            try {
                const requestPromise = makeRequestLike(like);
                const response = await requestPromise;
                responseId = (JSON.parse(response));
                return responseId
            }
            catch (errorResponse) {
                alert(errorResponse);
            };
        }
        if (data.userCreatedThisPost) {
            const modifyButton = document.createElement('button');
            modifyButton.setAttribute('class', 'btn btn-warning');
            modifyButton.innerHTML = 'Modify';
            createdByMain.appendChild(modifyButton);

            modifyButton.addEventListener('click', () => {
                showPost.removeChild(container)
                modifyUserPost()
            });
        }

        if (data.userCreatedThisPost) {
            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('class', 'btn btn-danger');
            deleteButton.innerHTML = 'Delete';
            createdByMain.appendChild(deleteButton);

            deleteButton.addEventListener('click', ($event) => {
                $event.preventDefault();
                makeDeleteRequest()
                submitDeleteFormData()
                function makeDeleteRequest() {
                    return new Promise((resolve, reject) => {
                        let request = new XMLHttpRequest();
                        request.open('DELETE', api + '/' + reqPostId);
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
                        window.location.href = '/frontend/home.html'
                    }
                    catch (errorResponse) {
                        alert(errorResponse);
                    };
                }
            });
        };
        let timePeriods = document.createElement('div');
        timePeriods.setAttribute('class', 'col-md-12 timePeriods');
        container.appendChild(timePeriods);

        if (data.post[0].userId !== data.userInfo[0].userId) {
            const postReport = document.createElement('button');
            postReport.setAttribute('class', 'btn btn-link')
            postReport.innerText = 'report';
            timePeriods.appendChild(postReport)

            postReport.addEventListener('click', ($event) => {
                $event.preventDefault();
                const comRepReason = document.createElement('div');
                comRepReason.setAttribute('class', 'col-md-12');
                comRepReason.setAttribute('id', 'comRepReasonDiv')

                if (document.getElementById('comRepReasonDiv') !== null) {
                    document.getElementById('comRepReasonDiv').parentElement.removeChild(document.getElementById('comRepReasonDiv'));
                }
                container.appendChild(comRepReason);

                const comRepForm = document.createElement('form');
                comRepForm.setAttribute('class', '');
                comRepReason.appendChild(comRepForm);

                createReportDiv(comRepForm);

                comRepSubmit = document.createElement('button');
                comRepSubmit.setAttribute('class', 'btn btn-info')
                comRepSubmit.innerText = 'Submit'
                comRepForm.lastChild.appendChild(comRepSubmit)

                comRepSubmit.addEventListener('click', ($event) => {
                    $event.preventDefault();
                    let repReasonData = document.querySelector('input[name="reportOptions"]:checked').value;

                    let submitReportData = {
                        'postId': data.post[0].postId,
                        'reportReason': repReasonData,
                        'whoCreatedPost': data.post[0].userId
                    };
                    submitReport(submitReportData);
                });
            });
        }

        let timeEdited
        if (!data.post[0].timeEdited == null || !data.post[0].timeEdited == '') {
            timeEdited = document.createElement('p');
            timeEdited.setAttribute('class', 'timeEditedClass');
            timeEdited.textContent = 'Edited: ' + countTime(data.post[0].timeEdited);
            timePeriods.appendChild(timeEdited);
        }

        const postTimeCreated = document.createElement('p');
        postTimeCreated.setAttribute('class', 'timeCreatedClass');
        postTimeCreated.innerText = 'Created: ' + countTime(data.post[0].postTimeCreated);

        timePeriods.appendChild(postTimeCreated);
        showPost.appendChild(container);

        // ** Comments START **
        let addComment = document.createElement('div');
        addComment.setAttribute('class', 'col-md-12 addCommentDiv');
        showPost.appendChild(addComment);

        createCommentForm(addComment)

        document.getElementsByClassName('labelDiv')[0].addEventListener('click', () => {
            if (document.getElementById('comInputArea').style.opacity === '1') {
                document.getElementById('comInputArea').style.opacity = '0';
                addComment.style.height = '40px';
                document.getElementsByClassName('fas fa-chevron-down')[0].setAttribute('class', 'fas fa-chevron-up');
            } else {
                addComment.style.height = '200px';
                setTimeout(() => { document.getElementById('comInputArea').style.opacity = '1' }, 180)

                document.getElementsByClassName('fas fa-chevron-up')[0].setAttribute('class', 'fas fa-chevron-down');
            }
        })
        document.getElementsByClassName('commentButtonDiv')[0].lastChild.addEventListener('click', ($event) => {
            $event.preventDefault()
            if (document.getElementById('commentTextInput').value.trim().length > 1) {
                submitCommentFormData();
            } else {
                document.getElementById('commentTextInput').setAttribute('placeholder', 'You can not submit empty comment');
                document.getElementById('commentTextInput').focus();
                return
            }
        })

        const commentsDiv = document.createElement('div');
        commentsDiv.setAttribute('class', 'col-md-12');
        commentsDiv.setAttribute('id', 'commentsDiv')
        showPost.appendChild(commentsDiv);

        for (let i = 0; i < data.comment.length; i++) {
            const oneCommentDiv = document.createElement('div');
            oneCommentDiv.setAttribute('class', 'col-md-12 mCommentDiv');
            commentsDiv.appendChild(oneCommentDiv)

            const mainComment = document.createElement('section');
            mainComment.setAttribute('class', 'mainComment')
            oneCommentDiv.appendChild(mainComment)

            const creator = document.createElement('div');
            creator.setAttribute('class', 'col-md-1 comLeftPart');
            mainComment.appendChild(creator);

            const userImg = document.createElement('img');
            userImg.setAttribute('src', data.comment[i].userPicture)
            userImg.setAttribute('alt', 'User picture')
            creator.appendChild(userImg)

            const commInfo = document.createElement('div');
            commInfo.setAttribute('class', 'col-md-11 comRightPart');
            mainComment.appendChild(commInfo);

            const whoAndWhen = document.createElement('div');
            whoAndWhen.setAttribute('class', 'col-md-12 whoAndWhen');
            commInfo.appendChild(whoAndWhen);

            const byWho = document.createElement('h5');
            byWho.innerText = data.comment[i].username;
            const byWhen = document.createElement('p');
            byWhen.innerText = 'Created: ' + countTime(data.comment[i].comTimeCreated);
            whoAndWhen.append(byWho, byWhen);

            const comBody = document.createElement('div');
            comBody.setAttribute('class', 'col-md-12 comBody');
            commInfo.appendChild(comBody);

            let comBodyParag = document.createElement('p');
            comBodyParag.innerText = data.comment[i].commentText;
            comBody.appendChild(comBodyParag);

            const comFooter = document.createElement('div');
            comFooter.setAttribute('class', 'col-md-12 comFooter');
            mainComment.appendChild(comFooter);

            if (data.comment[i].userId !== data.userInfo[0].userId) {
                const comReport = document.createElement('button');
                comReport.setAttribute('class', 'btn btn-link')
                comReport.innerText = 'report';
                comFooter.appendChild(comReport)

                comReport.addEventListener('click', ($event) => {
                    $event.preventDefault();

                    const comRepReason = document.createElement('div');
                    comRepReason.setAttribute('class', 'col-md-12');
                    comRepReason.setAttribute('id', 'comRepReasonDiv')

                    if (document.getElementById('comRepReasonDiv') !== null) {
                        document.getElementById('comRepReasonDiv').parentElement.removeChild(document.getElementById('comRepReasonDiv'));
                    }
                    mainComment.appendChild(comRepReason);

                    const comRepForm = document.createElement('form');
                    comRepForm.setAttribute('class', '');
                    comRepReason.appendChild(comRepForm);

                    createReportDiv(comRepForm);

                    comRepSubmit = document.createElement('button');
                    comRepSubmit.setAttribute('class', 'btn btn-info')
                    comRepSubmit.innerText = 'Submit'
                    comRepForm.lastChild.appendChild(comRepSubmit)


                    comRepSubmit.addEventListener('click', ($event) => {
                        $event.preventDefault();
                        let repReasonData = document.querySelector('input[name="reportOptions"]:checked').value;

                        let submitReportData = {
                            'commentId': data.comment[i].commentId,
                            'postId': data.post[0].postId,
                            'reportReason': repReasonData,
                            'whoCreatedPost': data.comment[i].userId
                        };
                        submitReport(submitReportData);
                    })
                }, { once: true });
            }

            if (data.comment[i].userId === data.userInfo[0].userId) {
                const comEdit = document.createElement('button');
                comEdit.setAttribute('class', 'btn btn-link');
                comEdit.innerText = 'edit';
                comEdit.addEventListener('click', ($event) => {
                    $event.preventDefault();

                    comBody.removeChild(comBodyParag);
                    comBodyParag2 = document.createElement('textarea');
                    comBodyParag2.setAttribute('id', 'editedCommentData');
                    comBodyParag2.oninput = function () {
                        comBodyParag2.style.height = "20px";
                        comBodyParag2.style.height = Math.min(comBodyParag2.scrollHeight, 200) + "px";
                    };
                    comBodyParag2.innerText = data.comment[i].commentText;
                    comBody.appendChild(comBodyParag2);
                    comBodyParag2.focus();

                    editSubmit = document.createElement('button');
                    editSubmit.setAttribute('class', 'btn btn-info');
                    editSubmit.innerText = 'submit';
                    comBody.appendChild(editSubmit);

                    comEdit.innerText = 'cancel';
                    comEdit.addEventListener('click', ($event) => {
                        $event.preventDefault();
                        comBody.removeChild(comBodyParag2)
                        comBody.removeChild(editSubmit);
                        comBody.appendChild(comBodyParag)
                        comEdit.innerText = 'edit';
                    }, { once: true });

                    editSubmit.addEventListener('click', ($event) => {
                        $event.preventDefault();
                        reqComId = data.comment[i].commentId
                        submitEditedCommentFormData();
                    }, { once: true })
                }, { once: true })

                const comDelete = document.createElement('button');
                comDelete.setAttribute('class', 'btn btn-link');
                comDelete.innerText = 'delete';
                comDelete.addEventListener('click', ($event) => {
                    $event.preventDefault();
                    reqComId = data.comment[i].commentId
                    submitDeleteComment()
                }, { once: true })
                comFooter.append(comEdit, comDelete);
            }

            const ComOnComment = document.createElement('button');
            ComOnComment.setAttribute('class', 'btn btn-link');

            add2ndComment = document.createElement('div');
            add2ndComment.setAttribute('class', 'col-md-12 add2ndCommentDiv')
            createCommentForm(add2ndComment)
            oneCommentDiv.appendChild(add2ndComment)

            ComOnComment.addEventListener('click', ($event) => {
                $event.preventDefault();

                comOnComNumber = document.getElementsByClassName('mCommentDiv')[i].getElementsByClassName('mCommentDiv2nd')
                for (let j = 0; j < document.getElementsByClassName('add2ndCommentDiv').length; j++) {
                    if (document.getElementsByClassName('add2ndCommentDiv')[j].style.opacity === '1') {
                        document.getElementsByClassName('add2ndCommentDiv')[j].style.height = '0';
                        document.getElementsByClassName('add2ndCommentDiv')[j].style.opacity = '0';
                    }
                }
                document.getElementsByClassName('add2ndCommentDiv')[i].style.opacity = '1';
                document.getElementsByClassName('add2ndCommentDiv')[i].style.height = '200px';
                //Listener for click on label
                document.getElementsByClassName('add2ndCommentDiv')[i].children[0].firstChild.addEventListener('click', ($event) => {
                    $event.preventDefault();
                    document.getElementsByClassName('add2ndCommentDiv')[i].style.height = '0';
                    document.getElementsByClassName('add2ndCommentDiv')[i].style.opacity = '0';

                    for (let n = 0; n < document.getElementsByClassName('mCommentDiv2nd').length; n++) {
                        document.getElementsByClassName('mCommentDiv2nd')[n].style.height = '0';
                        document.getElementsByClassName('mCommentDiv2nd')[n].style.opacity = '0';
                        document.getElementsByClassName('mCommentDiv2nd')[n].style.display = 'none';
                    }
                });
                for (let n = 0; n < document.getElementsByClassName('mCommentDiv2nd').length; n++) {
                    document.getElementsByClassName('mCommentDiv2nd')[n].style.height = '0';
                    document.getElementsByClassName('mCommentDiv2nd')[n].style.opacity = '0';
                    document.getElementsByClassName('mCommentDiv2nd')[n].style.display = 'none';
                }
                for (let m = 0; m < comOnComNumber.length; m++) {
                    if (document.getElementsByClassName('add2ndCommentDiv')[i].style.opacity === '1') {
                        comOnComNumber[m].style.display = 'block';
                        comOnComNumber[m].style.opacity = '1';
                        comOnComNumber[m].style.height = 'auto';
                    } else {
                        comOnComNumber[m].style.opacity = '0';
                        comOnComNumber[m].style.height = '0';
                        comOnComNumber[m].style.display = 'none';
                    }
                }

                sub2ndLvlComButton = document.getElementsByClassName('add2ndCommentDiv')[i].firstChild.lastChild.lastChild.lastChild
                sub2ndLvlComButton.addEventListener('click', ($event) => {
                    $event.preventDefault()

                    if (document.getElementsByClassName('add2ndCommentDiv')[i].firstChild.lastChild.firstChild.value.trim().length > 1) {
                        let comOnComText = document.getElementsByClassName('add2ndCommentDiv')[i].firstChild.lastChild.firstChild.value;
                        let submit2ndComment = {
                            'postId': data.post[0].postId,
                            'commentId': data.comment[i].commentId,
                            'comOnComText': comOnComText,
                        }
                        submit2ndComFormData(submit2ndComment);
                    } else {
                        document.getElementsByClassName('add2ndCommentDiv')[i].firstChild.lastChild.firstChild.setAttribute('placeholder', 'You can not submit empty comment');
                        document.getElementsByClassName('add2ndCommentDiv')[i].firstChild.lastChild.firstChild.focus();
                        return
                    }
                });
            });
            comFooter.appendChild(ComOnComment)

            if (data.comment[i].edited !== 0) {
                const editedParag = document.createElement('p');
                editedParag.innerText = 'Edited: ' + countTime(data.comment[i].timeEdited);
                comFooter.appendChild(editedParag);
            }

            const likesDiv = document.createElement('div');
            likesDiv.setAttribute('class', 'likesDiv');
            comFooter.appendChild(likesDiv);

            const comLikes = document.createElement('i');
            comLikes.setAttribute('class', 'far fa-thumbs-up');
        
            comLikes.innerText = data.comment[i].likes;
            let comUsersLiked = JSON.parse(data.comment[i].comUserLikes);
            if (comUsersLiked.usersLiked.includes(data.userInfo[0].userId)) {
                comLikes.classList.add('likedClass');
            }
            comLikes.style.cursor = 'pointer';
            comLikes.addEventListener('click', ($event) => {
                $event.preventDefault();
                let like = { 'like': 1 };
                submitFormDataLikeCom(like).then((comLikeResponse) => {
                    if (comLikeResponse !== undefined) {
                        if (comLikeResponse.comLike === true) {
                            comLikes.innerText = data.comment[i].likes + 1;
                            comLikes.classList.add('likedClass');
                            if (comUsersLiked.usersLiked.includes(data.userInfo[0].userId)) {
                                comLikes.innerText = data.comment[i].likes;
                            }
                        } else if (comLikeResponse.comLike === false) {
                            comLikes.innerText = data.comment[i].likes;
                            comLikes.classList.remove('likedClass');
                            if (comUsersLiked.usersLiked.includes(data.userInfo[0].userId)) {
                                comLikes.innerText = data.comment[i].likes - 1;
                            }
                        }
                    }
                });
            });
            const comLikesTip = document.createElement('span');
            comLikesTip.setAttribute('class', 'tooltiptext');

            const comDislikes = document.createElement('i');
            comDislikes.setAttribute('class', 'far fa-thumbs-down');
            
            comDislikes.innerText = data.comment[i].dislikes;
            let comUsersDisliked = JSON.parse(data.comment[i].comUserDislikes);
            if (comUsersDisliked.usersDisliked.includes(data.userInfo[0].userId)) {
                comDislikes.classList.add('dislikedClass');
            }
            comDislikes.style.cursor = 'pointer';
            comDislikes.addEventListener('click', ($event) => {
                $event.preventDefault();
                let like = { 'like': -1 };
                submitFormDataLikeCom(like).then((comLikeResponse) => {
                    if (comLikeResponse !== undefined) {
                        if (comLikeResponse.comDislike === true) {
                            comDislikes.innerText = data.comment[i].dislikes + 1;
                            comDislikes.classList.add('dislikedClass');
                            if (comUsersDisliked.usersDisliked.includes(data.userInfo[0].userId)) {
                                comDislikes.innerText = data.comment[i].dislikes;
                            }
                        } else if (comLikeResponse.comDislike === false) {
                            comDislikes.innerText = data.comment[i].dislikes;
                            comDislikes.classList.remove('dislikedClass');
                            if (comUsersDisliked.usersDisliked.includes(data.userInfo[0].userId)) {
                                comDislikes.innerText = data.comment[i].dislikes - 1;
                            }
                        }
                    }
                });
            });
            likesDiv.append(comLikes, comLikesTip, comDislikes);

            function makeRequestLikeCom(like) {
                return new Promise((resolve, reject) => {
                    let request = new XMLHttpRequest();
                    request.withCredentials = true;
                    request.open('POST', api + '/comment/' + data.comment[i].commentId + '/likes');
                    request.onreadystatechange = () => {
                        if (request.readyState === 4) {
                            if (request.status >= 200 && request.status < 400) {
                                resolve(request.response);
                            } else if (request.status = 403) {
                                let respMessage = JSON.parse(request.response);
                                comLikesTip.innerText = respMessage.message;
                                comLikesTip.style.visibility = 'visible';
                                setTimeout(() => { comLikesTip.style.visibility = 'hidden' }, 3000);
                            } else {
                                reject(request.response);
                            }
                        }
                    };
                    request.setRequestHeader('Content-Type', 'application/json');
                    request.send(JSON.stringify(like));
                });
            }
            async function submitFormDataLikeCom(like) {
                try {
                    const requestPromise = makeRequestLikeCom(like);
                    const response = await requestPromise;
                    responseId = (JSON.parse(response));
                    return responseId
                }
                catch (errorResponse) {
                    alert(errorResponse);
                };
            }
            // COM ON COM START*****************************************************
            if (data.comment[i].commentOnComment.length !== 0) {
                for (let k = 0; k < data.comment[i].commentOnComment.length; k++) {
                    const oneCommentDiv2nd = document.createElement('div');
                    oneCommentDiv2nd.setAttribute('class', 'col-md-12 mCommentDiv2nd');
                    oneCommentDiv.appendChild(oneCommentDiv2nd);

                    const creator2nd = document.createElement('div');
                    creator2nd.setAttribute('class', 'col-md-1 comLeftPart2nd');
                    oneCommentDiv2nd.appendChild(creator2nd);

                    const userImg2nd = document.createElement('img');
                    userImg2nd.setAttribute('src', data.comment[i].commentOnComment[k].userPicture)
                    userImg2nd.setAttribute('alt', 'User picture')
                    creator2nd.appendChild(userImg2nd)

                    const commInfo2nd = document.createElement('div');
                    commInfo2nd.setAttribute('class', 'col-md-11 comRightPart2nd');
                    oneCommentDiv2nd.appendChild(commInfo2nd);

                    const whoAndWhen2nd = document.createElement('div');
                    whoAndWhen2nd.setAttribute('class', 'col-md-12 whoAndWhen2nd');
                    commInfo2nd.appendChild(whoAndWhen2nd);

                    const byWho2nd = document.createElement('h5');
                    byWho2nd.innerText = data.comment[i].commentOnComment[k].username;
                    const byWhen2nd = document.createElement('p');
                    byWhen2nd.innerText = 'Created: ' + countTime(data.comment[i].commentOnComment[k].timeCreated);
                    whoAndWhen2nd.append(byWho2nd, byWhen2nd);

                    const comBody2nd = document.createElement('div');
                    comBody2nd.setAttribute('class', 'col-md-12 comBody2nd');
                    commInfo2nd.appendChild(comBody2nd);

                    let comBodyParag2nd = document.createElement('p');
                    comBodyParag2nd.innerText = data.comment[i].commentOnComment[k].comSecLevText;
                    comBody2nd.appendChild(comBodyParag2nd);

                    const comFooter2nd = document.createElement('div');
                    comFooter2nd.setAttribute('class', 'col-md-12 comFooter2nd');
                    oneCommentDiv2nd.appendChild(comFooter2nd);

                    if (data.comment[i].commentOnComment[k].userId !== data.userInfo[0].userId) {
                        const comReport2nd = document.createElement('button');
                        comReport2nd.setAttribute('class', 'btn btn-link')
                        comReport2nd.innerText = 'report';
                        comFooter2nd.appendChild(comReport2nd)

                        comReport2nd.addEventListener('click', ($event) => {
                            $event.preventDefault();

                            const comRepReason2nd = document.createElement('div');
                            comRepReason2nd.setAttribute('class', 'col-md-12');
                            comRepReason2nd.setAttribute('id', 'comRepReasonDiv2nd')

                            if (document.getElementById('comRepReasonDiv2nd') !== null) {
                                document.getElementById('comRepReasonDiv2nd').parentElement.removeChild(document.getElementById('comRepReasonDiv2nd'));
                            }
                            oneCommentDiv2nd.appendChild(comRepReason2nd);

                            const comRepForm2nd = document.createElement('form');
                            comRepForm2nd.setAttribute('class', '');
                            comRepReason2nd.appendChild(comRepForm2nd);

                            createReportDiv(comRepForm2nd);

                            comRepSubmit2nd = document.createElement('button');
                            comRepSubmit2nd.setAttribute('class', 'btn btn-info')
                            comRepSubmit2nd.innerText = 'Submit'
                            comRepForm2nd.lastChild.appendChild(comRepSubmit2nd)


                            comRepSubmit2nd.addEventListener('click', ($event) => {
                                $event.preventDefault();
                                let repReasonData = document.querySelector('input[name="reportOptions"]:checked').value;

                                let submitReportData = {
                                    'postId': data.post[0].postId,
                                    'commentId': data.comment[i].commentId,
                                    'comSecLevId': data.comment[i].commentOnComment[k].comSecLevId,
                                    'reportReason': repReasonData,
                                    'whoCreatedPost': data.comment[i].commentOnComment[k].userId
                                };
                                submitReport(submitReportData);
                            })
                        }, { once: true });
                    }

                    if (data.comment[i].commentOnComment[k].userId === data.userInfo[0].userId) {

                        const comEdit2nd = document.createElement('button');
                        comEdit2nd.setAttribute('class', 'btn btn-link');
                        comEdit2nd.innerText = 'edit';
                        comEdit2nd.addEventListener('click', ($event) => {
                            $event.preventDefault();
                            comBody2nd.removeChild(comBodyParag2nd);
                            comBodyParag22nd = document.createElement('textarea');
                            comBodyParag22nd.setAttribute('class', 'editedCommentData2nd');
                            comBodyParag22nd.oninput = function () {
                                comBodyParag22nd.style.height = "20px";
                                comBodyParag22nd.style.height = Math.min(comBodyParag22nd.scrollHeight, 200) + "px";
                            };
                            comBodyParag22nd.innerText = data.comment[i].commentOnComment[k].comSecLevText;
                            comBody2nd.appendChild(comBodyParag22nd);
                            comBodyParag22nd.focus();

                            editSubmit2nd = document.createElement('button');
                            editSubmit2nd.setAttribute('class', 'btn btn-info');
                            editSubmit2nd.innerText = 'submit';
                            comBody2nd.appendChild(editSubmit2nd);

                            comEdit2nd.innerText = 'cancel';
                            comEdit2nd.addEventListener('click', ($event) => {
                                $event.preventDefault();
                                comBody2nd.removeChild(comBodyParag22nd)
                                comBody2nd.removeChild(editSubmit2nd);
                                comBody2nd.appendChild(comBodyParag2nd)
                                comEdit2nd.innerText = 'edit';
                            }, { once: true });

                            editSubmit2nd.addEventListener('click', ($event) => {
                                $event.preventDefault();
                                reqComId2nd = data.comment[i].commentOnComment[k].comSecLevId
                                submitEditedCommentFormData2nd();
                            }, { once: true })

                        }, { once: true })

                        const comDelete2nd = document.createElement('button');
                        comDelete2nd.setAttribute('class', 'btn btn-link');
                        comDelete2nd.innerText = 'delete2';
                        comDelete2nd.addEventListener('click', ($event) => {
                            $event.preventDefault();
                            reqComId2nd = data.comment[i].commentOnComment[k].comSecLevId
                            submitDeleteComment2nd()
                        }, { once: true })
                        comFooter2nd.append(comEdit2nd, comDelete2nd);
                    }

                    if (data.comment[i].commentOnComment[k].edited !== 0) {
                        const editedParag2nd = document.createElement('p');
                        editedParag2nd.innerText = 'Edited: ' + countTime(data.comment[i].commentOnComment[k].timeEdited);
                        comFooter2nd.appendChild(editedParag2nd);
                    }

                    const likesDiv2nd = document.createElement('div');
                    likesDiv2nd.setAttribute('class', 'likesDiv2nd');
                    comFooter2nd.appendChild(likesDiv2nd);

                    const comLikes2nd = document.createElement('i');
                    comLikes2nd.setAttribute('class', 'far fa-thumbs-up');
                    
                    comLikes2nd.innerText = data.comment[i].commentOnComment[k].likes;
                    let comUserLikes2nd = JSON.parse(data.comment[i].commentOnComment[k].comUserLikes)
                    if (comUserLikes2nd.usersLiked.includes(data.userInfo[0].userId)) {
                        comLikes2nd.classList.add('likedClass');
                    }
                    comLikes2nd.style.cursor = 'pointer';
                    comLikes2nd.addEventListener('click', ($event) => {
                        $event.preventDefault();
                        let com2ndLike = { 'like': 1 };
                        submitFormDataLikeCom2nd(com2ndLike).then((comLikeResponse2nd) => {
                            if (comLikeResponse2nd !== undefined) {
                                if (comLikeResponse2nd.like === true) {
                                    comLikes2nd.innerText = data.comment[i].commentOnComment[k].likes + 1;
                                    comLikes2nd.classList.add('likedClass');
                                    if (comUserLikes2nd.usersLiked.includes(data.userInfo[0].userId)) {
                                        comLikes2nd.innerText = data.comment[i].commentOnComment[k].likes;
                                    }
                                } else if (comLikeResponse2nd.like === false) {
                                    comLikes2nd.innerText = data.comment[i].commentOnComment[k].likes;
                                    comLikes2nd.classList.remove('likedClass');
                                    if (comUserLikes2nd.usersLiked.includes(data.userInfo[0].userId)) {
                                        comLikes2nd.innerText = data.comment[i].commentOnComment[k].likes - 1;
                                    }
                                }
                            }
                        });
                    });
                    const comLikesTip2nd = document.createElement('span');
                    comLikesTip2nd.setAttribute('class', 'tooltiptext');

                    const comDislikes2nd = document.createElement('i');
                    comDislikes2nd.setAttribute('class', 'far fa-thumbs-down');
                    
                    comDislikes2nd.innerText = data.comment[i].commentOnComment[k].dislikes;
                    let comUserDislikes2nd = JSON.parse(data.comment[i].commentOnComment[k].comUserDislikes)
                    if (comUserDislikes2nd.usersDisliked.includes(data.userInfo[0].userId)) {
                        comDislikes2nd.classList.add('dislikedClass');
                    }
                    comDislikes2nd.style.cursor = 'pointer';
                    comDislikes2nd.addEventListener('click', ($event) => {
                        $event.preventDefault();
                        let com2ndLike = { 'like': -1 };
                        submitFormDataLikeCom2nd(com2ndLike).then((comLikeResponse2nd) => {
                            if (comLikeResponse2nd !== undefined) {
                                if (comLikeResponse2nd.dislike === true) {
                                    comDislikes2nd.innerText = data.comment[i].commentOnComment[k].dislikes + 1;
                                    comDislikes2nd.classList.add('dislikedClass');
                                    if (comUserDislikes2nd.usersDisliked.includes(data.userInfo[0].userId)) {
                                        comDislikes2nd.innerText = data.comment[i].commentOnComment[k].dislikes;
                                    }
                                } else if (comLikeResponse2nd.dislike === false) {
                                    comDislikes2nd.innerText = data.comment[i].commentOnComment[k].dislikes;
                                    comDislikes2nd.classList.remove('dislikedClass');
                                    if (comUserDislikes2nd.usersDisliked.includes(data.userInfo[0].userId)) {
                                        comDislikes2nd.innerText = data.comment[i].commentOnComment[k].dislikes - 1;
                                    }
                                }
                            }
                        });
                    });
                    likesDiv2nd.append(comLikes2nd, comLikesTip2nd, comDislikes2nd);

                    function makeRequestLikeCom2nd(com2ndLike) {
                        return new Promise((resolve, reject) => {
                            let request = new XMLHttpRequest();
                            request.withCredentials = true;
                            request.open('POST', api + '/comment2nd/' + data.comment[i].commentOnComment[k].comSecLevId + '/likes');
                            request.onreadystatechange = () => {
                                if (request.readyState === 4) {
                                    if (request.status >= 200 && request.status < 400) {
                                        resolve(request.response);
                                    } else if (request.status = 403) {
                                        let respMessage = JSON.parse(request.response)
                                        comLikesTip2nd.innerText = respMessage.message;
                                        comLikesTip2nd.style.visibility = 'visible';
                                        setTimeout(() => { comLikesTip2nd.style.visibility = 'hidden' }, 3000)
                                    } else {
                                        reject(request.response);
                                    }
                                }
                            };
                            request.setRequestHeader('Content-Type', 'application/json');
                            request.send(JSON.stringify(com2ndLike));
                        });
                    }
                    async function submitFormDataLikeCom2nd(com2ndLike) {
                        try {
                            const requestPromise = makeRequestLikeCom2nd(com2ndLike);
                            const response = await requestPromise;
                            responseId = (JSON.parse(response));
                            return responseId
                        }
                        catch (errorResponse) {
                            alert(errorResponse);
                        };
                    }
                }
            }
            document.getElementsByClassName('mainComment')[0].style.borderRadius = '0 0 15px 15px'

            let numbOfComPerCom = document.getElementsByClassName('mCommentDiv')[i].getElementsByClassName('mCommentDiv2nd').length;
            if (numbOfComPerCom !== 0) {
                ComOnComment.innerText = 'comment (' + numbOfComPerCom + ')';
            } else {
                ComOnComment.innerText = 'comment';
            }
        }

    } else {
        window.location.href = '/frontend/index.html';
        // alert('There is an error');
    }

}
request.send();

logoutApi = 'http://127.0.0.1:3000'
logoutButton = document.getElementById('logoutButton')
logoutButton.addEventListener('click', () => {

    logoutButton.setAttribute('method', 'POST')
    submitFormData()

    function makeRequest() {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('POST', logoutApi + '/logout');
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
            request.setRequestHeader('Content-Type', 'application/json');
            request.send();
        });
    }
    async function submitFormData() {
        try {
            const requestPromise = makeRequest();
            const response = await requestPromise;
            responseId = (JSON.parse(response));
            if (responseId.loggedOut = true) {
                window.location.replace("index.html");
            } else {
                console.log('response id nije dobar')
            }

        }
        catch (errorResponse) {
            alert(errorResponse);
        };
    }
});
function countTime(timeToCount) {
    today = new Date();
    d1 = new Date(today.toISOString());
    d2 = new Date(timeToCount);
    let diffTime
    diff = d1 - d2
    if (diff < 60e3) {
        diffTime = Math.floor(diff / 1000) + 'sec ago';
        return diffTime;
    }
    else if (diff >= 60e3 && diff < 3.6e+6) {
        diffTime = Math.floor(diff / 60e3) + 'min ago'
    }
    else if (diff >= 3.6e+6 && diff < 8.64e+7) {
        diffTime = Math.floor(diff / 3.6e+6) + 'h ago';
        return diffTime;
    }
    else if (diff >= 8.64e+7 && diff < 2.628e+9) {
        diffTime = Math.floor(diff / 8.64e+7) + 'd ago';
    }
    else if (diff >= 2.628e+9 && diff < 3.154e+10) {
        diffTime = Math.floor(diff / 2.628e+9) + `m'th ago`;
    }
    else if (diff >= 3.154e+10) {
        diffTime = Math.floor(diff / 3.154e+10) + 'y ago';
    }
    else {
        console.log('Problem with times in the function');
    }
    return diffTime;
}