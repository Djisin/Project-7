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
                setTimeout(() => {
                    if (editPicBtnDiv.firstChild) {
                        editPicBtnDiv.removeChild(editPicBtn)
                    }
                }, 2000);
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
        //console.log(data.userData[0].numberOfPosts)
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
        //profRank.setAttribute('src', 'img/rankPH.png');
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
                editUserNetwsBtn.innerText = 'Edit'
                editUserNetwsBtn.style.opacity = 0;
                editUserNetws.appendChild(editUserNetwsBtn);

                moreUserProf.addEventListener('mouseover', () => {
                    editUserNetwsBtn.style.opacity = 1;
                });
                moreUserProf.addEventListener('mouseout', () => {
                    setTimeout(() => {
                        editUserNetwsBtn.style.opacity = 0;
                    }, 2000);
                });

                editUserNetwsBtn.addEventListener('click', ($event) => {
                    $event.preventDefault();

                    while (moreUserProf.firstChild) {
                        moreUserProf.removeChild(moreUserProf.lastChild);
                    }

                    const editWs = document.createElement('input');
                    editWs.setAttribute('id', 'editWs');
                    editWs.value = data.userData[0].userWebSite;
                    const editFb = document.createElement('input');
                    editFb.setAttribute('id', 'editFb');
                    editFb.value = data.userData[0].facebook;
                    const editTw = document.createElement('input');
                    editTw.setAttribute('id', 'editTw');
                    editTw.value = data.userData[0].twitter;
                    const editLi = document.createElement('input');
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
        leftPart.appendChild(document.createElement('hr'));

        let memberSince = document.createElement('p');
        memberSince.innerText = 'Member since: ' + countTime(data.userData[0].timeCreated);
        leftPart.appendChild(memberSince);
        //Middle part
        //Header section
        const headerDiv = document.createElement('div');
        headerDiv.setAttribute('id', 'headerDiv');
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
        if (data.userData[0].personalLine === null || data.userData[0].personalLine === ''){
            if (data.userInfo[0].userId === data.userData[0].userId){
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

            usersThoughts.addEventListener('mouseover', () => {
                editPersLineBtn.style.opacity = 1;
            })
            usersThoughts.addEventListener('mouseout', () => {
                setTimeout(() => {
                    editPersLineBtn.style.opacity = 0;
                }, 2000);
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
                persLineBtns.setAttribute('class', 'btn-group')
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
                const editPersLineBtnCancel = document.createElement('button');
                editPersLineBtnCancel.innerText = 'Cancel';
                editPersLineBtnCancel.setAttribute('class', 'btn btn-default');

                const editPersLineBtnSub = document.createElement('button');
                editPersLineBtnSub.innerText = 'Submit';
                editPersLineBtnSub.setAttribute('class', 'btn btn-default');
                persLineBtns.append(editPersLineBtnCancel, editPersLineBtnSub);

                editPersLineBtnCancel.addEventListener('click', ($event) => {
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
            });
        }
        //Content
        const contentDiv = document.createElement('div');
        contentDiv.setAttribute('id', 'contentDiv');
        middlePart.appendChild(contentDiv);

        const contentHeader = document.createElement('h3');
        contentHeader.innerText = 'Your posts';
        contentDiv.appendChild(contentHeader);

        if(data.userData[0].mmContent.length ===0){
            const noMMPosts = document.createElement('p');
            noMMPosts.innerText = 'You did not create any posts'
            contentDiv.appendChild(noMMPosts);
        }
        //Right part
        //Numbers
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
        usersPosts.innerText = 'Your posts:'
        const usersPostsParag = document.createElement('p');
        usersPostsParag.innerText = 'sss'; //treba value
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
            infoParag.innerText = 'You did not create any articles';
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