let api = 'http://127.0.0.1:3000/user/profile';
let mmApi = 'http://127.0.0.1:3000/api/mmposts';

let request = new XMLHttpRequest();
request.open('GET', mmApi + '/');
request.withCredentials = true;

request.onload = function () {
    let data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {

        const userCredentials = document.getElementById('credentials');
        userCredentials.innerText = data.userInfo[0].firstName + ' ' + data.userInfo[0].lastName

        const communitySection = document.getElementById('community-section');
        communitySection.setAttribute('class', 'col-md-12');
        setTimeout(() => {
            communitySection.style.display = 'block'
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

        communitySection.append(leftPart, middlePart, rightPart);

        //LeftPart

        const members = document.createElement('div');
        members.setAttribute('class', 'numbersDiv');
        leftPart.appendChild(members);

        const fdLabel1 = document.createElement('label');
        fdLabel1.setAttribute('for', '');
        fdLabel1.innerText = 'How many memebers do we have?';
        const fdParag1 = document.createElement('p');
        fdParag1.innerText = 'neki broj';
        members.append(fdLabel1, fdParag1);

        const mostSuccWriter = document.createElement('div');
        mostSuccWriter.setAttribute('class', 'numbersDiv');
        leftPart.appendChild(mostSuccWriter);

        const fdLabel2 = document.createElement('label');
        fdLabel2.setAttribute('for', '');
        fdLabel2.innerText = 'The most successfull writer of our community?';
        const fdParag2 = document.createElement('p');
        fdParag2.innerText = 'neki Lik, mozda slika?';
        mostSuccWriter.append(fdLabel2, fdParag2);

        const mostSuccArticle = document.createElement('div');
        mostSuccArticle.setAttribute('class', 'numbersDiv');
        leftPart.appendChild(mostSuccArticle);

        const fdLabel3 = document.createElement('label');
        fdLabel3.setAttribute('for', '');
        fdLabel3.innerText = 'The most times read?';
        const fdlink = document.createElement('a');
        fdlink.setAttribute('href', 'http://127.0.0.1:5500/frontend/post.html?' + data.mostReadArticle.postId)
        fdlink.innerText = data.mostReadArticle.postTitle;
        const fdParag3 = document.createElement('p');
        fdParag3.innerText = 'and it was read ' + data.mostReadArticle.count + ' times.'
        mostSuccArticle.append(fdLabel3, fdlink, fdParag3);

        const mostLikedArticle = document.createElement('div');
        mostLikedArticle.setAttribute('class', 'numbersDiv');
        leftPart.appendChild(mostLikedArticle);

        const fdLabel4 = document.createElement('label');
        fdLabel4.setAttribute('for', '');
        fdLabel4.innerText = 'Article with the most likes?';
        const fdParag4 = document.createElement('p');
        fdParag4.innerText = 'neki broj';
        mostLikedArticle.append(fdLabel4, fdParag4);
        //MiddlePart
        //Located in js/mmPosts.js
        constructCreateMMPost(middlePart);
        constructMMPost(middlePart, (data.mmContent), (data.userInfo[0].userId));

        //rightPart
        //Located in js/comments.js
        constructRightPartNumbers(rightPart, (data.userInfo[0].numberOfArticles), (data.userInfo[0].numberOfPosts));//nije dobar poslednji
        constructRightPartSuccArticles(rightPart, (data.userInfo[0].succPosts));
        constructRPRecCreated(rightPart, (data.recentPosts));

        //On load
        preventJs();
    } else {
        window.location.href = '/frontend/index.html';
    }
}
request.send();