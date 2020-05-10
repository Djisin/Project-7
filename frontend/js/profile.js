let api = 'http://127.0.0.1:3000/user/profile';

let url = window.location.href;
let reqProfId = url.substring(url.lastIndexOf('?') + 1);

let request = new XMLHttpRequest();
request.open('GET', api + '?user=' + reqProfId, true);
request.withCredentials = true;

request.onload = function () {
    let data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {

        let submitData = new FormData
        //User info on navbar
        if (reqProfId == data.userInfo[0].userId) {
            document.getElementsByClassName('prof')[0].classList.add('active');
        } else if (isNaN(reqProfId)) {
            document.getElementsByClassName('prof')[0].classList.add('active');
        }

        const userCredentials = document.getElementById('credentials');
        userCredentials.innerText = data.userInfo[0].firstName + ' ' + data.userInfo[0].lastName
        //Profile structure
        const profileSection = document.getElementById('userProfile');
        profileSection.setAttribute('class', 'col-md-12');
        setTimeout(() => {
            profileSection.style.display = 'block'
            document.getElementsByTagName('footer')[0].style.opacity = '1'
        }, 750);

        const leftPart = document.createElement('section');
        leftPart.setAttribute('id', 'leftPart');
        leftPart.setAttribute('class', 'col-md-3');

        const middlePart = document.createElement('section');
        middlePart.setAttribute('id', 'middlePart');
        middlePart.setAttribute('class', 'col-md-6');

        const rightPart = document.createElement('section');
        rightPart.setAttribute('id', 'rightPart');
        rightPart.setAttribute('class', 'col-md-3');

        profileSection.append(leftPart, middlePart, rightPart);
        //Left side
        const profPicDiv = document.createElement('div');
        profPicDiv.setAttribute('id', 'profPicDiv');
        leftPart.appendChild(profPicDiv);

        const profPic = document.createElement('img');
        profPic.setAttribute('alt', 'Users profile picture');
        profPic.setAttribute('src', data.userData[0].userPicture);
        profPicDiv.appendChild(profPic);
        profPic.onerror = () => {
            profPic.setAttribute('src', 'img/userDef.jpg')
        }
        const profPicParag = document.createElement('span');
        profPicParag.setAttribute('class', 'help-block');
        leftPart.appendChild(profPicParag)
        if ((data.userInfo[0].userId === data.userData[0].userId) || data.userInfo[0].admin === 1) {
            const ripSpan = document.createElement('span');
            ripSpan.setAttribute('class', 'ripple-1');
            profPicDiv.appendChild(ripSpan)
            const ripSpan2 = document.createElement('span');
            ripSpan2.setAttribute('class', 'ripple-2');
            profPicDiv.appendChild(ripSpan2)
            profPicDiv.style.cursor = 'pointer';
        }
        const editPicBtnDiv = document.createElement('div');
        editPicBtnDiv.setAttribute('class', 'btn-group')
        profPicDiv.appendChild(editPicBtnDiv);
        if ((data.userInfo[0].userId === data.userData[0].userId) || data.userInfo[0].admin === 1) {
            let editPicBtn = document.createElement('button');
            editPicBtn.setAttribute('class', 'btn btn-default');
            editPicBtn.innerText = 'Change';

            let changePicIn = document.createElement('input');
            changePicIn.setAttribute('type', 'file');
            changePicIn.setAttribute('id', 'chagePic');
            let h = 1;
            profPic.addEventListener('click', () => {
                if (h % 2 === 0) {
                    editPicBtnDiv.removeChild(editPicBtn);
                } else {
                    editPicBtnDiv.appendChild(editPicBtn);
                }
                h++
            });

            editPicBtn.addEventListener('click', ($event) => {
                $event.preventDefault();
                changePicIn.click();

                changePicIn.onchange = function () {

                    let editedData = {
                        'userNetws': null,
                        'profPicture': true,
                        'personalLine': null,
                    };
                    if (!['image/jpg', 'image/jpeg', 'image/png'].includes(changePicIn.type)) {
                        profPicParag.innerText = 'Only .jpg, .jpeg or .png is allowed.'
                        profPicParag.style.color = '#a94442'
                        profPicDiv.style.borderColor = '#a94442'
                        setTimeout(() => {
                            profPicParag.innerText = '';
                            profPicDiv.style.borderColor = '';
                            profPicParag.style.color = '';
                        }, 8000);
                        return false
                    }

                    editedData = JSON.stringify(editedData);
                    let newProfPic = changePicIn.files[0];
                    submitData.append('file', newProfPic);
                    submitData.append('editedData', editedData);

                    submitFormDataProfEdit(submitData).then(() => {
                        setTimeout(() => {
                            window.location.reload();
                        }, 250);
                    });
                }
            });
        }
        const profRankDiv = document.createElement('div');
        profRankDiv.setAttribute('id', 'profRankDiv');
        leftPart.appendChild(profRankDiv)
        const profRank = document.createElement('img');
        profRank.setAttribute('alt', 'rank');
        profRank.setAttribute('id', 'rank');

        if (data.userData[0].numberOfPosts === 0) {
            profRank.setAttribute('src', 'img/r0.png');
        } else if (data.userData[0].numberOfPosts > 0 && data.userData[0].numberOfPosts <= 3) {
            profRank.setAttribute('src', 'img/r1.png');
        } else if (data.userData[0].numberOfPosts > 3 && data.userData[0].numberOfPosts <= 5) {
            profRank.setAttribute('src', 'img/r2.png');
        } else if (data.userData[0].numberOfPosts > 5 && data.userData[0].numberOfPosts <= 7) {
            profRank.setAttribute('src', 'img/r3.png');
        } else if (data.userData[0].numberOfPosts > 7 && data.userData[0].numberOfPosts <= 9) {
            profRank.setAttribute('src', 'img/r4.png');
        } else if (data.userData[0].numberOfPosts > 9 && data.userData[0].numberOfPosts <= 11) {
            profRank.setAttribute('src', 'img/r5.png');
        } else if (data.userData[0].numberOfPosts > 11) {
            profRank.setAttribute('src', 'img/r6.png');
        }
        profRankDiv.appendChild(profRank);

        const moreUserProf = document.createElement('div');
        moreUserProf.setAttribute('id', 'moreUserProf')
        leftPart.appendChild(moreUserProf);

        function consructUserNetworks() {
            const userWSLabel = document.createElement('label');
            userWSLabel.innerText = 'Your website:';
            moreUserProf.appendChild(userWSLabel);
            if (data.userData[0].userWebSite !== null) {
                const link = document.createElement('a');
                link.setAttribute('href', data.userData[0].userWebSite);
                link.setAttribute('target', '_blank');
                link.innerText = data.userData[0].userWebSite;
                moreUserProf.appendChild(link);
            } else {
                const userWS = document.createElement('p');
                userWS.innerText = 'none';
                moreUserProf.appendChild(userWS);
            }

            const userFBLabel = document.createElement('label');
            userFBLabel.innerText = 'Facebook:';
            moreUserProf.appendChild(userFBLabel);;
            if (data.userData[0].facebook !== null) {
                const link = document.createElement('a')
                link.setAttribute('href', data.userData[0].facebook);
                link.setAttribute('target', '_blank');
                link.innerText = data.userData[0].facebook;
                moreUserProf.appendChild(link);
            } else {
                const userFB = document.createElement('p');
                userFB.innerText = 'none';
                moreUserProf.appendChild(userFB);
            }

            const userTwtLabel = document.createElement('label');
            userTwtLabel.innerText = 'Twitter:';
            moreUserProf.appendChild(userTwtLabel);
            if (data.userData[0].twitter !== null) {
                const link = document.createElement('a');
                link.setAttribute('href', data.userData[0].twitter);
                link.setAttribute('target', '_blank');
                link.innerText = data.userData[0].twitter;
                moreUserProf.appendChild(link);
            } else {
                const userTwt = document.createElement('p');
                userTwt.innerText = 'none';
                moreUserProf.appendChild(userTwt);
            }

            const userLiInLabel = document.createElement('label');
            userLiInLabel.innerText = 'LinkedIn:';
            moreUserProf.appendChild(userLiInLabel);
            if (data.userData[0].linkendIn !== null) {
                const link = document.createElement('a');
                link.setAttribute('href', data.userData[0].linkendIn);
                link.setAttribute('target', '_blank');
                link.innerText = data.userData[0].linkendIn;
                moreUserProf.appendChild(link);
            } else {
                const userLiIn = document.createElement('p');
                userLiIn.innerText = 'none';
                moreUserProf.appendChild(userLiIn);
            }
            if ((data.userInfo[0].userId === data.userData[0].userId) || data.userInfo[0].admin === 1) {
                const editUserNetws = document.createElement('div');
                editUserNetws.setAttribute('class', 'btn-group');
                moreUserProf.appendChild(editUserNetws)
                moreUserProf.style.cursor = 'pointer';

                editUserNetwsBtn = document.createElement('button');
                editUserNetwsBtn.setAttribute('class', 'btn btn-default');
                editUserNetwsBtn.innerText = 'Edit your networks'
                editUserNetwsBtn.style.opacity = 0;
                editUserNetws.appendChild(editUserNetwsBtn);
                let u = 1;
                moreUserProf.addEventListener('click', () => {
                    if (u % 2 === 0) {
                        editUserNetwsBtn.style.opacity = 0;
                    } else {
                        editUserNetwsBtn.style.opacity = 1;
                    }
                    u++
                });

                editUserNetwsBtn.addEventListener('click', ($event) => {
                    $event.preventDefault();

                    while (moreUserProf.firstChild) {
                        moreUserProf.removeChild(moreUserProf.lastChild);
                    }

                    const editWs = document.createElement('input');
                    editWs.setAttribute('type', 'url');
                    editWs.setAttribute('id', 'editWs');
                    editWs.value = data.userData[0].userWebSite;
                    const editFb = document.createElement('input');
                    editFb.setAttribute('type', 'url');
                    editFb.setAttribute('id', 'editFb');
                    editFb.value = data.userData[0].facebook;
                    const editTw = document.createElement('input');
                    editTw.setAttribute('type', 'url');
                    editTw.setAttribute('id', 'editTw');
                    editTw.value = data.userData[0].twitter;
                    const editLi = document.createElement('input');
                    editLi.setAttribute('type', 'url');
                    editLi.setAttribute('id', 'editLi');
                    editLi.value = data.userData[0].linkendIn;

                    moreUserProf.append(userWSLabel, editWs, userFBLabel, editFb, userTwtLabel, editTw, userLiInLabel, editLi)
                    editUserNetws.removeChild(editUserNetwsBtn);
                    moreUserProf.append(editUserNetws);

                    const editCancel = document.createElement('button');
                    editCancel.setAttribute('class', 'btn btn-default');
                    editCancel.innerText = 'Cancel';
                    editUserNetws.appendChild(editCancel);
                    editCancel.addEventListener('click', ($event) => {
                        $event.preventDefault();
                        while (moreUserProf.firstChild) {
                            moreUserProf.removeChild(moreUserProf.lastChild);
                        }
                        consructUserNetworks();
                        setTimeout(() => {
                            editUserNetwsBtn.style.opacity = 0;
                        }, 1000);
                    });

                    const submitEditNetws = document.createElement('button');
                    submitEditNetws.setAttribute('class', 'btn btn-default');
                    submitEditNetws.innerText = 'Submit';
                    editUserNetws.appendChild(submitEditNetws);
                    preventJs();
                    submitEditNetws.addEventListener('click', ($event) => {
                        $event.preventDefault();

                        let netwUpdates = {
                            'editWs': editWs.value.trim(),
                            'editFb': editFb.value.trim(),
                            'editTw': editTw.value.trim(),
                            'editLi': editLi.value.trim(),
                        }
                        let editedData = {
                            'userNetws': netwUpdates,
                            'profPicture': null,
                            'personalLine': null,
                        }

                        if (editWs.value.trim().includes('https://') || editWs.value.trim().includes('http://') || editWs.value.trim().length < 1) {
                            if (editFb.value.trim().includes('https://www.facebook.com/') || editFb.value.trim().length === 0) {
                                if (editTw.value.trim().includes('https://twitter.com/') || editTw.value.trim().length === 0) {
                                    if (editLi.value.trim().includes('https://www.linkedin.com/in/') || editLi.value.trim().length === 0) {
                                        editedData = JSON.stringify(editedData);
                                        submitData.append('editedData', editedData);
                                        submitFormDataProfEdit(submitData).then(() => {
                                            setTimeout(() => {
                                                window.location.reload()
                                            }, 1000);
                                        });
                                    } else {
                                        editLi.value = ''
                                        editLi.placeholder = 'Provide your profile link';
                                        return
                                    }
                                } else {
                                    editTw.value = ''
                                    editTw.placeholder = 'Provide your profile link';
                                    return
                                }
                            } else {
                                editFb.value = ''
                                editFb.placeholder = 'Provide your profile link';
                                return
                            }
                        } else {
                            editWs.value = ''
                            editWs.placeholder = 'Link must contain http or https';
                            return
                        }
                    });
                });
            }
        }
        consructUserNetworks();
        //Middle part
        //Header section
        const headerDiv = document.createElement('div');
        headerDiv.setAttribute('id', 'header-div');
        middlePart.appendChild(headerDiv);

        const usersName = document.createElement('h3');
        usersName.innerText = data.userData[0].firstName + ' ' + data.userData[0].lastName;
        headerDiv.appendChild(usersName);

        const usersUsername = document.createElement('h5');
        usersUsername.innerText = '(' + data.userData[0].username + ')';
        headerDiv.appendChild(usersUsername);

        let usersThoughts = document.createElement('p');

        usersThoughts.innerText = data.userData[0].personalLine;
        if (data.userData[0].personalLine === null || data.userData[0].personalLine === '') {
            if (data.userInfo[0].userId === data.userData[0].userId) {
                usersThoughts.innerText = 'Share your thoughts';
            }
        }
        headerDiv.appendChild(usersThoughts);

        if ((data.userInfo[0].userId === data.userData[0].userId) || data.userInfo[0].admin === 1) {
            usersThoughts.style.cursor = 'pointer';
            usersThoughts.addEventListener('click', ($event) => {
                $event.preventDefault();
                headerDiv.removeChild(usersThoughts);

                const editPersLineTArea = document.createElement('textarea');
                if (usersThoughts.innerText === 'Share your thoughts') {
                    editPersLineTArea.innerText = ''
                } else {
                    editPersLineTArea.innerText = usersThoughts.innerText;
                }
                headerDiv.append(editPersLineTArea);
                editPersLineTArea.focus();

                const persLineBtns = document.createElement('div')
                persLineBtns.setAttribute('class', 'pers-line-footer')
                headerDiv.appendChild(persLineBtns);

                const countLetters = document.createElement('p');
                persLineBtns.appendChild(countLetters);
                countLetters.innerText = editPersLineTArea.value.length + '/250 max';

                editPersLineTArea.addEventListener('input', ($event) => {
                    countLetters.innerText = editPersLineTArea.value.length + '/250 max';
                    if (editPersLineTArea.value.length >= 250) {
                        editPersLineTArea.value = editPersLineTArea.value.substring(0, 249)
                    }
                });

                const lineBtns = document.createElement('div')
                lineBtns.setAttribute('class', 'btn-group')
                persLineBtns.appendChild(lineBtns);

                const editPersLineBtnCancel = document.createElement('button');
                editPersLineBtnCancel.innerText = 'Cancel';
                editPersLineBtnCancel.setAttribute('class', 'btn btn-default');

                const editPersLineBtnSub = document.createElement('button');
                editPersLineBtnSub.innerText = 'Submit';
                editPersLineBtnSub.setAttribute('class', 'btn btn-default');
                lineBtns.append(editPersLineBtnCancel, editPersLineBtnSub);

                editPersLineBtnCancel.addEventListener('click', ($event) => {
                    $event.preventDefault();
                    headerDiv.removeChild(editPersLineTArea);
                    headerDiv.removeChild(persLineBtns);
                    headerDiv.appendChild(usersThoughts);
                });

                editPersLineBtnSub.addEventListener('click', ($event) => {
                    $event.preventDefault();
                    if (editPersLineTArea.value.trim().length === 0)
                        editPersLineTArea.value = 'Share your thoughts'
                    let editedData = {
                        'userNetws': null,
                        'profPicture': null,
                        'personalLine': editPersLineTArea.value,
                    }
                    editedData = JSON.stringify(editedData);
                    submitData.append('editedData', editedData);

                    submitFormDataProfEdit(submitData);

                    usersThoughts.innerText = editPersLineTArea.value;
                    headerDiv.removeChild(editPersLineTArea);
                    headerDiv.removeChild(persLineBtns);
                    headerDiv.append(usersThoughts);
                });
                preventJs();
            });
        }
        //Content create
        if (data.userData[0].userId === data.userInfo[0].userId) {
            //Located in js/comments.js
            constructCreateMMPost(middlePart);
        }

        const noMMPosts = document.createElement('p');
        noMMPosts.setAttribute('class', 'no-mmp-parag');
        if (data.mmContent.length === 0 && (data.userInfo[0].userId !== data.userData[0].userId)) {
            noMMPosts.innerText = 'User did not create any personal posts';
            middlePart.appendChild(noMMPosts);
        } else if (data.mmContent.length === 0) {
            noMMPosts.innerText = 'You do not have any posts';
            middlePart.appendChild(noMMPosts);
        }

        //Located in js/mmPost.js
        constructMMPost(middlePart, (data.mmContent), (data.userInfo[0].userId), (data.userInfo[0].admin));

        //Right part
        //Numbers
        let membDiv = document.createElement('div');
        membDiv.setAttribute('class', 'member-div');
        rightPart.appendChild(membDiv);

        let memberSince = document.createElement('p');
        memberSince.innerText = 'Member since: ' + countTime(data.userData[0].timeCreated);
        membDiv.appendChild(memberSince);
        if (data.userInfo[0].userId === data.userData[0].userId) {
            const mripSpan = document.createElement('span');
            mripSpan.setAttribute('class', 'ripple-3');
            membDiv.appendChild(mripSpan);
            membDiv.style.cursor = 'pointer';
        }
        if (data.userData[0].userId === data.userInfo[0].userId) {
            const profDelete = document.createElement('button');
            profDelete.setAttribute('class', 'btn btn-default');
            profDelete.innerText = 'Delete profile';
            let y = 1;
            membDiv.addEventListener('click', () => {
                if (y % 2 === 0) {
                    profDelete.replaceWith(memberSince);
                    profDelete.style.opacity = '0';
                } else {
                    memberSince.replaceWith(profDelete);
                    profDelete.style.opacity = '1';
                }
                y++
            });

            profDelete.addEventListener('click', ($event) => {
                $event.preventDefault();

                const pwInputDiv = document.createElement('div');
                pwInputDiv.setAttribute('class', 'pw-input-div');
                membDiv.replaceWith(pwInputDiv);

                const pwParag = document.createElement('p');
                pwParag.innerText = `Be careful, deleting your profile will include all articles and posts you've created.\n
                This action is irreversible.\n
                Once deleted, your profile can not be recovered.`
                pwInputDiv.appendChild(pwParag);

                const pwInput = document.createElement('input');
                pwInput.setAttribute('class', 'form-control');
                pwInput.placeholder = 'Confirm with password';
                pwInput.setAttribute('type', 'password');
                pwInput.setAttribute('id', 'pwInput');
                pwInputDiv.appendChild(pwInput);

                const delBtnGroup = document.createElement('div');
                delBtnGroup.setAttribute('class', 'btn-group');
                pwInputDiv.appendChild(delBtnGroup);

                const delCancel = document.createElement('button');
                delCancel.setAttribute('class', 'btn btn-default');
                delCancel.innerText = 'Cancel';
                delCancel.addEventListener('click', ($event) => {
                    $event.preventDefault();
                    pwInputDiv.replaceWith(membDiv);
                    profDelete.replaceWith(memberSince);
                    profDelete.style.opacity = '0';
                });

                const delSubmit = document.createElement('button');
                delSubmit.setAttribute('class', 'btn btn-default');
                delSubmit.innerText = 'Delete';
                delBtnGroup.append(delCancel, delSubmit)

                delSubmit.addEventListener('click', ($event) => {
                    $event.preventDefault();

                    if (document.getElementById('pwInput').value.trim().length === 0) {
                        pwInput.placeholder = 'Insert password'
                        setTimeout(() => {
                            pwInput.placeholder = 'Confirm with password'
                        }, 3000);
                        pwInput.focus();
                    } else {
                        let result = confirm('Do you really want to delete your profile?');
                        if (result) {
                            submitMMFormData({ 'delete': 'delete', password: pwInput.value }, 'DELETE', (api + '/' + data.userInfo[0].userId)).then((resp) => {
                                if (resp !== undefined) {
                                    if (resp.success === true) {
                                        logoutButton.click();
                                    } else {
                                        pwInput.value = '';
                                        pwInput.placeholder = 'Incorrect password'
                                        pwInput.focus();
                                        setTimeout(() => {
                                            pwInput.placeholder = 'Confirm with password'
                                        }, 3000);
                                    }
                                }
                            });
                        }
                    }
                });
            });
        }

        //Located in js/comments.js
        constructRightPartNumbers(rightPart, (data.userData[0].numberOfPosts), (data.mmContent.length))
        constructRightPartSuccArticles(rightPart, (data.userData[0].succPosts))
        constructRPRecCreated(rightPart, (data.recentPosts))

        function makeRequestProfEdit(submitData) {
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.open('PUT', api + '/' + data.userInfo[0].userId);
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
                request.send(submitData);
            });
        }
        async function submitFormDataProfEdit(submitData) {
            try {
                const requestPromise = makeRequestProfEdit(submitData);
                const response = await requestPromise;
                return response
            }
            catch (errorResponse) {
                alert(errorResponse);
            };
        }
        preventJs()
    } else {
        window.location.href = 'index.html';
    }
}
request.send();