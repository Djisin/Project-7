
let api = 'http://127.0.0.1:3000/user/profile';
let mmApi = 'http://127.0.0.1:3000/api/mmposts';

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
            profileSection.style.display='block'
        }, 1000);

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

        const editPicBtnDiv = document.createElement('div');
        editPicBtnDiv.setAttribute('class', 'btn-group')
        profPicDiv.appendChild(editPicBtnDiv);
        if (data.userInfo[0].userId === data.userData[0].userId) {
            let editPicBtn = document.createElement('button');
            editPicBtn.setAttribute('class', 'btn btn-default');
            editPicBtn.innerText = 'Change';

            let changePicIn = document.createElement('input');
            changePicIn.setAttribute('type', 'file');
            changePicIn.setAttribute('id', 'chagePic');
            profPic.addEventListener('mouseover', () => {
                editPicBtnDiv.appendChild(editPicBtn)
            });

            profPic.addEventListener('mouseleave', () => {
                //setTimeout(() => {
                if (editPicBtnDiv.firstChild) {
                    editPicBtnDiv.removeChild(editPicBtn)
                }
                //}, 2000);
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
                    editedData = JSON.stringify(editedData);
                    let newProfPic = changePicIn.files[0];
                    submitData.append('file', newProfPic);
                    submitData.append('editedData', editedData);

                    submitFormDataProfEdit(submitData);
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
            if (data.userInfo[0].userId === data.userData[0].userId) {
                const editUserNetws = document.createElement('div');
                editUserNetws.setAttribute('class', 'btn-group');
                moreUserProf.appendChild(editUserNetws)

                editUserNetwsBtn = document.createElement('button');
                editUserNetwsBtn.setAttribute('class', 'btn btn-default');
                editUserNetwsBtn.innerText = 'Edit your networks'
                editUserNetwsBtn.style.opacity = 0;
                editUserNetws.appendChild(editUserNetwsBtn);

                moreUserProf.addEventListener('mouseover', () => {
                    editUserNetwsBtn.style.opacity = 1;
                });
                moreUserProf.addEventListener('mouseout', () => {
                    //setTimeout(() => {
                    editUserNetwsBtn.style.opacity = 0;
                    //}, 2000);
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

                        editedData = JSON.stringify(editedData);
                        submitData.append('editedData', editedData);

                        submitFormDataProfEdit(submitData);

                        setTimeout(() => {
                            window.location.reload()
                        }, 1000);
                    })
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
        usersThoughts.setAttribute('id', 'userThoughts');
        usersThoughts.innerText = data.userData[0].personalLine;
        if (data.userData[0].personalLine === null || data.userData[0].personalLine === '') {
            if (data.userInfo[0].userId === data.userData[0].userId) {
                usersThoughts.innerText = 'Share your thoughts'
            }
        }
        headerDiv.appendChild(usersThoughts);

        if (data.userInfo[0].userId === data.userData[0].userId) {

            const editPersLineBtn = document.createElement('button');
            editPersLineBtn.style.opacity = 0;
            editPersLineBtn.style.position = 'absolute';
            editPersLineBtn.style.marginTop = '40px';
            headerDiv.appendChild(editPersLineBtn);

            headerDiv.addEventListener('mouseover', () => {
                editPersLineBtn.style.opacity = 1;
            })
            headerDiv.addEventListener('mouseout', () => {
                //setTimeout(() => {
                editPersLineBtn.style.opacity = 0;
                // }, 2000);
            })

            editPersLineBtn.setAttribute('class', 'btn btn-default');
            editPersLineBtn.innerText = 'Edit';

            editPersLineBtn.addEventListener('click', ($event) => {
                $event.preventDefault();
                headerDiv.removeChild(usersThoughts);
                headerDiv.removeChild(editPersLineBtn);

                const editPersLineTArea = document.createElement('textarea');
                editPersLineTArea.innerText = usersThoughts.innerText;
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
                    headerDiv.append(usersThoughts, editPersLineBtn);
                });

                editPersLineBtnSub.addEventListener('click', ($event) => {
                    $event.preventDefault();
                    let editedData = {
                        'userNetws': null,
                        'profPicture': null,
                        'personalLine': editPersLineTArea.value,
                    }
                    editedData = JSON.stringify(editedData);
                    submitData.append('editedData', editedData);

                    submitFormDataProfEdit(submitData);

                    headerDiv.removeChild(editPersLineTArea);
                    headerDiv.removeChild(persLineBtns);
                    headerDiv.append(usersThoughts, editPersLineBtn);

                    usersThoughts.innerText = editPersLineTArea.value;
                });
                preventJs();
            });
        }
        //Content create
        if (data.userData[0].userId === data.userInfo[0].userId) {
            const contentDiv = document.createElement('div');
            contentDiv.setAttribute('id', 'create-content-div');
            middlePart.appendChild(contentDiv);

            const contentHeader = document.createElement('h3');
            contentHeader.innerText = 'Your posts';
            contentDiv.appendChild(contentHeader);

            const createMMPostDiv = document.createElement('form');
            createMMPostDiv.setAttribute('id', 'createMMDiv');
            contentDiv.appendChild(createMMPostDiv);

            const createMMPostTxt = document.createElement('textarea');
            createMMPostTxt.setAttribute('id', 'mmPostTxt');
            createMMPostTxt.setAttribute('class', 'form-control')
            createMMPostTxt.placeholder = 'Write something here...'
            createMMPostDiv.appendChild(createMMPostTxt);

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
                //linkButton.classList.remove('disabled');
            }

            function showMMLabel() {
                mmLabel.style.flexGrow = '100';
                mmLabel.style.padding = ' 6px 12px 6px 12px';
                mmLabel.style.border = null;
                mmLabel.style.opacity = '1';
                linkInput.value = '';
                //
                //linkButton.classList.add('disabled');
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
        const noMMPosts = document.createElement('p');
        noMMPosts.setAttribute('class', 'no-mmp-parag');
        if (data.mmContent.length === 0 && (data.userInfo[0].userId !== data.userData[0].userId)) {
            noMMPosts.innerText = 'User did not create any posts';
            middlePart.appendChild(noMMPosts);
        } else if (data.mmContent.length === 0) {
            noMMPosts.innerText = 'You did not create any posts';
            middlePart.appendChild(noMMPosts);
        }
        const divOnTop = document.createElement('div');
        divOnTop.setAttribute('id', 'divOnTop');
        middlePart.appendChild(divOnTop);
        //MM content created by user

        const contentDivMM = document.createElement('div');
        contentDivMM.setAttribute('class', 'col-md-12 content-div');
        middlePart.appendChild(contentDivMM);

        for (let i = 0; i < data.mmContent.length; i++) {

            const singlePost = document.createElement('div');
            singlePost.setAttribute('class', 'col-md-12 mmPosts slide-in-fwd-center');
            contentDivMM.appendChild(singlePost);
            singlePost.style.animationDelay = (i+0.3)-(0.8*i)+'s'
            
            singlePost.addEventListener('mouseover', () => {
                singlePost.getElementsByClassName('singlePostFooter')[0].children[1].style.opacity = '1'
            });
            singlePost.addEventListener('mouseout', () => {
                singlePost.getElementsByClassName('singlePostFooter')[0].children[1].style.opacity = '0'
            });

            const singlePostHeader = document.createElement('div');
            singlePostHeader.setAttribute('class', 'singlePostHeader');
            singlePost.appendChild(singlePostHeader);

            const userPic = document.createElement('img');
            userPic.setAttribute('alt', 'User picture')
            userPic.setAttribute('src', data.mmContent[i].userPicture);
            singlePostHeader.appendChild(userPic);

            const userName = document.createElement('p');
            userName.innerText = data.mmContent[i].username;
            singlePostHeader.appendChild(userName);

            const mmPostTimeCreated = document.createElement('p');
            mmPostTimeCreated.setAttribute('class', 'timeCreated');
            mmPostTimeCreated.innerText = countTime(data.mmContent[i].timeCreated);
            singlePostHeader.appendChild(mmPostTimeCreated);
            //singlePost.appendChild(document.createElement('hr'));
            const singlePostText = document.createElement('p');
            singlePostText.setAttribute('class', 'post-text-content');

            if (data.mmContent[i].postText !== null) {
                singlePostText.innerText = data.mmContent[i].postText;
                singlePost.appendChild(singlePostText);
            }
            if (data.mmContent[i].embed === 0) {
                if (data.mmContent[i].postMMField !== null) {

                    mmField = data.mmContent[i].postMMField;
                    mmPic = mmField.substring(mmField.length - 4);

                    let posibleImgExtensions = ['.jpg', '.png', 'apng', '.bmp', '.gif', '.svg', 'webp'];
                    let posibleVidExtensions = ['.flv', '.mp4', '.ts', '.3gp', '.mov', '.avi', '.wmv'];

                    if (posibleImgExtensions.includes(mmPic)) {
                        const postPicture = document.createElement('img');
                        postPicture.setAttribute('alt', 'Picture can not load');
                        postPicture.setAttribute('src', data.mmContent[i].postMMField);
                        singlePost.appendChild(postPicture);
                    } else if (posibleVidExtensions.includes(mmPic)) {
                        const postVideo = document.createElement('video');
                        postVideo.setAttribute('alt', 'Video can not be loaded');
                        postVideo.controls = true;
                        postVideo.setAttribute('src', data.mmContent[i].postMMField);
                        singlePost.appendChild(postVideo);
                    }
                }
            } else if (data.mmContent[i].embed === 1) {
                if (data.mmContent[i].postMMField !== null) {
                    const embed = document.createElement('iframe');
                    embed.setAttribute('class', 'embed-responsive-item');
                    embed.frameBorder = 0;
                    embed.width = '100%'
                    embed.allowFullscreen = true;
                    embed.setAttribute('src', data.mmContent[i].postMMField);
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
            if (data.mmContent[i].timeEdited !== null) {
                edited.innerText = 'Edited: ' + countTime(data.mmContent[i].timeEdited)
            }
            singlePostFooter.appendChild(edited);

            const postButtonGroup = document.createElement('div');
            postButtonGroup.setAttribute('class', 'btn-group');
            postButtonGroup.style.opacity='0';
            singlePostFooter.appendChild(postButtonGroup);

            const comReport = document.createElement('button');
            if (data.mmContent[i].userId !== data.userInfo[0].userId) {
                comReport.setAttribute('class', 'btn btn-link')
                comReport.innerText = 'report';
                postButtonGroup.appendChild(comReport)
            }

            if (data.userData[0].userId === data.userInfo[0].userId) {
                const editButton = document.createElement('button');
                editButton.setAttribute('class', 'btn btn-link editMMPost');
                editButton.innerText = 'edit';
                postButtonGroup.appendChild(editButton);

                let multimedia = data.mmContent[i].postMMField;
                let embeding = data.mmContent[i].embed;
                let mmText = data.mmContent[i].postText;
                let editingPostId = data.mmContent[i].mmPostId;
                editMMPostFunction(divOnTop, editButton, mmText, multimedia, embeding, editingPostId);

                const deleteButton = document.createElement('button');
                deleteButton.setAttribute('class', 'btn btn-link');
                deleteButton.innerText = 'delete';
                postButtonGroup.appendChild(deleteButton);

                deleteButton.addEventListener('click', ($event) => {
                    $event.preventDefault();

                    //deletePost((data.mmContent[i].mmPostId), singlePost)
                    delPostComOrSubCom((mmApi + '/' + data.mmContent[i].mmPostId), singlePost)
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
            likes.innerText = data.mmContent[i].postLikes;
            apiAddress = [like = { 'like': 1 }, ('POST'), (mmApi + '/' + data.mmContent[i].mmPostId + '/likes')];
            likeComment(
                (data.mmContent[i].postUsersLiked),
                data.mmContent[i].postLikes,
                data.userInfo[0].userId,
                likes,
                apiAddress,
                likesTip);

            const dislikes = document.createElement('i');
            dislikes.setAttribute('class', 'far fa-thumbs-down');
            dislikes.innerText = data.mmContent[i].postDislikes;
            apiAddress = [like = { 'like': -1 }, ('POST'), (mmApi + '/' + data.mmContent[i].mmPostId + '/likes')];
            dislikeComment(
                (data.mmContent[i].postUsersDisliked),
                data.mmContent[i].postDislikes,
                data.userInfo[0].userId,
                dislikes,
                apiAddress,
                likesTip);
            likesDiv.append(likes, likesTip, dislikes);

            //add comments
            let addComment = document.createElement('div');
            addComment.setAttribute('class', 'col-md-12 addCommentDiv');
            singlePost.appendChild(addComment);

            //Function from comment.js for Building input Comment form var order: div for form, post id
            createCommentForm(addComment, (data.mmContent[i].mmPostId));

            let inputLabel = singlePost.getElementsByClassName('labelDiv')[0];

            //Function for comment span on input comment variable order: div for form, inputLabel, numberOfComments, post id, div to attach comments
            inputLabelCommentsSpan(
                addComment,
                inputLabel,
                (data.mmContent[i].mmPostId),
                (data.mmContent[i].numberOfComments),
                singlePost,
                (data.userInfo[0].userId)
            );
            reportEventListener(comReport, singlePostFooter, (data.mmContent[i].mmPostId), (data.mmContent[i].userId), (undefined))
        }

        //Right part
        //Numbers
        let membDiv = document.createElement('div');
        membDiv.setAttribute('class', 'member-div');
        rightPart.appendChild(membDiv);

        let memberSince = document.createElement('p');
        memberSince.innerText = 'Member since: ' + countTime(data.userData[0].timeCreated);
        membDiv.appendChild(memberSince);

        if (data.userData[0].userId === data.userInfo[0].userId) {
            const profDelete = document.createElement('button');
            profDelete.setAttribute('class', 'btn btn-default');
            profDelete.innerText = 'Delete profile';
            membDiv.addEventListener('mouseover', () => {
                memberSince.replaceWith(profDelete);
                profDelete.style.opacity = '1';
            });
            membDiv.addEventListener('mouseout', () => {
                profDelete.replaceWith(memberSince);
                profDelete.style.opacity = '0';
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

        const numbersDiv = document.createElement('div');
        numbersDiv.setAttribute('id', 'numbersDiv');
        rightPart.appendChild(numbersDiv);

        const userArticles = document.createElement('label');
        userArticles.setAttribute('for', 'articleNumber');
        userArticles.innerText = 'Created articles:'
        const userArticlesParag = document.createElement('p');
        userArticlesParag.innerText = data.userData[0].numberOfPosts
        numbersDiv.append(userArticles, userArticlesParag);

        const usersPosts = document.createElement('label');
        usersPosts.setAttribute('for', 'postNumber');
        usersPosts.innerText = 'Created posts:'
        const usersPostsParag = document.createElement('p');
        usersPostsParag.innerText = data.mmContent.length;
        numbersDiv.append(usersPosts, usersPostsParag);
        //Successfull articles
        const sucArticles = document.createElement('div');
        sucArticles.setAttribute('id', 'succArticles');
        rightPart.appendChild(sucArticles);

        const sucArtHeader = document.createElement('h4');
        sucArtHeader.innerText = 'Successfull articles';
        sucArticles.appendChild(sucArtHeader);

        const sucArtList = document.createElement('ul');
        sucArticles.appendChild(sucArtList);

        if (data.userData[0].succPosts.length !== 0) {
            for (let j = 0; j < data.userData[0].succPosts.length; j++) {

                const sucArtListItem1 = document.createElement('li');

                const succLink = document.createElement('a');
                succLink.setAttribute('href', '/frontend/post.html?' + data.userData[0].succPosts[j].postId)
                succLink.innerText = data.userData[0].succPosts[j].postTitle;
                sucArtListItem1.appendChild(succLink)

                const meter = document.createElement('meter');
                meter.setAttribute('min', '0');
                meter.setAttribute('max', '100');
                meter.setAttribute('value', data.userData[0].succPosts[j].postLikes - data.userData[0].succPosts[j].postDislikes);

                sucArtList.append(sucArtListItem1, meter)
            }
        } else {
            const infoParag = document.createElement('p');
            infoParag.innerText = 'No articles to dispay';
            infoParag.style.fontStyle = 'italic'
            sucArticles.appendChild(infoParag);
        }
        //Recently created section
        const recentArticles = document.createElement('div');
        recentArticles.setAttribute('id', 'recentArticles');
        rightPart.appendChild(recentArticles);

        const recentArtHeader = document.createElement('h4');
        recentArtHeader.innerText = 'Recent community articles';
        recentArticles.appendChild(recentArtHeader);

        const recArtList = document.createElement('ul');
        recentArticles.appendChild(recArtList);

        if (data.recentPosts.length !== 0) {
            for (let j = 0; j < data.recentPosts.length; j++) {

                const recArtListItem = document.createElement('li');

                const recLink = document.createElement('a');
                recLink.setAttribute('href', '/frontend/post.html?' + data.recentPosts[j].postId);
                recLink.innerText = data.recentPosts[j].postTitle;
                recArtListItem.appendChild(recLink);

                const recArtCreator = document.createElement('p');
                recArtCreator.innerText = 'By: ' + data.recentPosts[j].username;

                recArtList.append(recArtListItem, recArtCreator);
            }
        }

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
            }
            catch (errorResponse) {
                alert(errorResponse);
            };
        }
        preventJs()
    } else {
        window.location.href = '/frontend/index.html';
    }
}
request.send();

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

function makeMMRequest(submitMMData, keyWord, apiLink) {
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
        request.send(JSON.stringify(submitMMData));
    });
}

async function submitMMFormData(submitMMData, keyWord, reqOpen) {
    try {
        const requestPromise = makeMMRequest(submitMMData, keyWord, reqOpen);
        const response = await requestPromise;
        responseId = (JSON.parse(response));
        return responseId
        //location.reload()
    }
    catch (errorResponse) {
        alert(errorResponse);
    };
}

