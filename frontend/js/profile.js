let api = 'http://127.0.0.1:3000/user/profile';

let url = window.location.href;
let reqProfId = url.substring(url.lastIndexOf('?') + 1);

let request = new XMLHttpRequest();
request.open('GET', api + '?user=' + reqProfId, true);
request.withCredentials = true;

request.onload = function () {
    let data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        //User info on navbar
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

        let editPicBtn = document.createElement('button');
        editPicBtn.setAttribute('class', 'btn btn-default');
        editPicBtn.innerText = 'Change';
        editPicBtnDiv.appendChild(editPicBtn)

        let changePicIn = document.createElement('input');
        changePicIn.setAttribute('type', 'file');
        changePicIn.setAttribute('id', 'chagePic');
        /*profPic.addEventListener('mouseover', () => {

        });

        profPic.addEventListener('mouseleave', () => {
            editPicBtnDiv.removeChild(editPicBtn)
        });*/

        editPicBtn.addEventListener('click', ($event) => {
            $event.preventDefault();
            changePicIn.click();

            //changePicIn.onchange
        })

        const profRank = document.createElement('img');
        profRank.setAttribute('alt', 'rank');
        profRank.setAttribute('src', 'img/rankPH.jpg');
        leftPart.appendChild(profRank);

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

            const editUserNetws = document.createElement('div');
            editUserNetws.setAttribute('class', 'btn-group');
            moreUserProf.appendChild(editUserNetws)

            editUserNetwsBtn = document.createElement('button');
            editUserNetwsBtn.setAttribute('class', 'btn btn-default');
            editUserNetwsBtn.innerText = 'Edit'
            editUserNetws.appendChild(editUserNetwsBtn);

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
                    submitFormDataProfEdit(editedData);

                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                })
            });
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
        headerDiv.appendChild(usersThoughts);

        if (data.userInfo[0].userId === data.userData[0].userId) {

            const editPersLineBtn = document.createElement('button');
            editPersLineBtn.setAttribute('class', 'btn btn-default');
            editPersLineBtn.innerText = 'Edit';
            headerDiv.appendChild(editPersLineBtn)
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
                    editedData = {
                        'userNetws': null,
                        'profPicture': null,
                        'personalLine': editPersLineTArea.value,
                    }
                    submitFormDataProfEdit(editedData);

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
        //Recent articles
        const sucArticles = document.createElement('div');
        sucArticles.setAttribute('id', 'succArticles');
        rightPart.appendChild(sucArticles);

        const sucArtHeader = document.createElement('h4');
        sucArtHeader.innerText = 'Successfull articles';
        sucArticles.appendChild(sucArtHeader);

        const sucArtList = document.createElement('ul');

        const sucArtListItem1 = document.createElement('li');
        const succLink1 = document.createElement('a');
        succLink1.setAttribute('href', '/frontend/post.html?' + data.userData[0].succPosts[0].postId)
        succLink1.innerText = data.userData[0].succPosts[0].postTitle;
        sucArtListItem1.appendChild(succLink1)
        const meter1 = document.createElement('meter');
        meter1.setAttribute('min', '0');
        meter1.setAttribute('max', '100');
        meter1.setAttribute('value', data.userData[0].succPosts[0].postLikes - data.userData[0].succPosts[0].postDislikes);

        const sucArtListItem2 = document.createElement('li');
        const succLink2 = document.createElement('a');
        succLink2.setAttribute('href', '/frontend/post.html?' + data.userData[0].succPosts[1].postId)
        succLink2.innerText = data.userData[0].succPosts[1].postTitle;
        sucArtListItem2.appendChild(succLink2)
        const meter2 = document.createElement('meter');
        meter2.setAttribute('min', '0');
        meter2.setAttribute('max', '100');
        meter2.setAttribute('value', data.userData[0].succPosts[1].postLikes - data.userData[0].succPosts[1].postDislikes);

        const sucArtListItem3 = document.createElement('li');
        const succLink3 = document.createElement('a');
        succLink3.setAttribute('href', '/frontend/post.html?' + data.userData[0].succPosts[2].postId)
        succLink3.innerText = data.userData[0].succPosts[2].postTitle;
        sucArtListItem3.appendChild(succLink3)
        const meter3 = document.createElement('meter');
        meter3.setAttribute('min', '0');
        meter3.setAttribute('max', '100');
        meter3.setAttribute('value', data.userData[0].succPosts[2].postLikes - data.userData[0].succPosts[2].postDislikes);

        sucArtList.append(sucArtListItem1, meter1, sucArtListItem2, meter2, sucArtListItem3, meter3);
        sucArticles.appendChild(sucArtList);

        //Recently created section
        const recentArticles = document.createElement('div');
        recentArticles.setAttribute('id', 'recentArticles');
        rightPart.appendChild(recentArticles);

        const recentArtHeader = document.createElement('h4');
        recentArtHeader.innerText = 'Recently created';
        recentArticles.appendChild(recentArtHeader);

        const recArtList = document.createElement('ul');

        const recArtListItem1 = document.createElement('li');
        const recLink1 = document.createElement('a');
        recLink1.setAttribute('href', '/frontend/post.html?' + data.recentPosts[0].postId);
        recLink1.innerText = data.recentPosts[0].postTitle;
        recArtListItem1.appendChild(recLink1);
        const recArtCreator1 = document.createElement('p');
        recArtCreator1.innerText = 'By: ' + data.recentPosts[0].username;

        const recArtListItem2 = document.createElement('li');
        const recLink2 = document.createElement('a');
        recLink2.setAttribute('href', '/frontend/post.html?' + data.recentPosts[1].postId);
        recLink2.innerText = data.recentPosts[1].postTitle;
        recArtListItem2.appendChild(recLink2);
        const recArtCreator2 = document.createElement('p');
        recArtCreator2.innerText = 'By: ' + data.recentPosts[1].username;

        const recArtListItem3 = document.createElement('li');
        const recLink3 = document.createElement('a');
        recLink3.setAttribute('href', '/frontend/post.html?' + data.recentPosts[2].postId);
        recLink3.innerText = data.recentPosts[2].postTitle;
        recArtListItem3.appendChild(recLink3);
        const recArtCreator3 = document.createElement('p');
        recArtCreator3.innerText = 'By: ' + data.recentPosts[2].username;

        recArtList.append(recArtListItem1, recArtCreator1, recArtListItem2, recArtCreator2, recArtListItem3, recArtCreator3);
        recentArticles.appendChild(recArtList);

        function makeRequestProfEdit(editedData) {
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
                request.setRequestHeader('Content-Type', 'application/json');
                request.send(JSON.stringify(editedData));
            });
        }
        async function submitFormDataProfEdit(editedData) {
            try {
                const requestPromise = makeRequestProfEdit(editedData);
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