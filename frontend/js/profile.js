let api = 'http://127.0.0.1:3000/user/profile';

let request = new XMLHttpRequest();
request.open('GET', api, true);
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
        leftPart.appendChild(profPicDiv);

        const profPic = document.createElement('img');
        profPic.setAttribute('alt', 'Users profile picture');
        profPic.setAttribute('src', data.userData[0].userPicture);
        profPicDiv.appendChild(profPic);

        const profRank = document.createElement('img');
        profRank.setAttribute('alt', 'rank');
        profRank.setAttribute('src', 'img/rankPH.jpg');
        profPicDiv.appendChild(profRank);

        const moreUserProf = document.createElement('div');
        leftPart.appendChild(moreUserProf);

        const userWSLabel = document.createElement('label');
        userWSLabel.setAttribute('for', 'userWS');
        userWSLabel.innerText = 'Your website:';
        const userWS = document.createElement('p');
        if (data.userData[0].userWebSite !== null) {
            const link = document.createElement('a')
            link.setAttribute('href', data.userData[0].userWebSite);
            link.innerText = 'link'
        } else {
            userWS.innerText = 'none'
        }
        const userFBLabel = document.createElement('label');
        userFBLabel.setAttribute('for', 'facebook');
        userFBLabel.innerText = 'Facebook:';
        const userFB = document.createElement('p');
        if (data.userData[0].facebook !== null) {
            const link = document.createElement('a')
            link.setAttribute('href', data.userData[0].facebook);
            link.innerText = 'link'
        } else {
            userFB.innerText = 'none'
        }
        const userTwtLabel = document.createElement('label');
        userTwtLabel.setAttribute('for', 'twitter');
        userTwtLabel.innerText = 'Twitter:';
        const userTwt = document.createElement('p');
        if (data.userData[0].twitter !== null) {
            const link = document.createElement('a')
            link.setAttribute('href', data.userData[0].twitter);
            link.innerText = 'link'
        } else {
            userTwt.innerText = 'none'
        }
        const userLiInLabel = document.createElement('label');
        userLiInLabel.setAttribute('for', 'linkedIn');
        userLiInLabel.innerText = 'LinkedIn:';
        const userLiIn = document.createElement('p');
        if (data.userData[0].linkendIn !== null) {
            const link = document.createElement('a');
            link.setAttribute('href', data.userData[0].linkendIn);
            link.innerText = 'link';
        } else {
            userLiIn.innerText = 'none';

        }
        moreUserProf.append(userWSLabel, userWS, userFBLabel, userFB, userTwtLabel, userTwt, userLiInLabel, userLiIn);

        moreUserProf.appendChild(document.createElement('hr'));

        let memberSince = document.createElement('p');
        memberSince.innerText = 'Member since: ' + countTime(data.userData[0].timeCreated);
        moreUserProf.appendChild(memberSince);
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

        const usersThoughts = document.createElement('p');
        usersThoughts.setAttribute('id', 'userThoughts');
        usersThoughts.innerText = data.userData[0].personalLine;
        headerDiv.appendChild(usersThoughts);
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
        sucArtListItem1.innerText = 'header1' // article header from db
        const sucArtListItem2 = document.createElement('li');
        sucArtListItem2.innerText = 'header2' // article header from db
        const sucArtListItem3 = document.createElement('li');
        sucArtListItem3.innerText = 'header3' // article header from db
        sucArtList.append(sucArtListItem1, sucArtListItem2, sucArtListItem3);
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
        recArtListItem1.innerText = data.recentPosts[0].postTitle;
        const recArtCreator1 = document.createElement('p');
        recArtCreator1.innerText = 'By: ' + data.recentPosts[0].username;

        const recArtListItem2 = document.createElement('li');
        recArtListItem2.innerText = data.recentPosts[1].postTitle;
        const recArtCreator2 = document.createElement('p');
        recArtCreator2.innerText = 'By: ' + data.recentPosts[1].username;

        const recArtListItem3 = document.createElement('li');
        recArtListItem3.innerText = data.recentPosts[2].postTitle;
        const recArtCreator3 = document.createElement('p');
        recArtCreator3.innerText = 'By: ' + data.recentPosts[2].username;

        recArtList.append(recArtListItem1, recArtCreator1, recArtListItem2, recArtCreator2, recArtListItem3, recArtCreator3);
        recentArticles.appendChild(recArtList);

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