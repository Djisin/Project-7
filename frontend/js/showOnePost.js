let api = 'http://127.0.0.1:3000/api/posts';

const showPost = document.getElementById('showPost');

let url = window.location.href
let reqPostId = url.substring(url.lastIndexOf('?') + 1)
reqPostId = reqPostId.replace(/[^0-9]/g, '');
let request = new XMLHttpRequest();

request.open('GET', api + '/' + reqPostId + '/post', true);
request.withCredentials = true;

request.onload = function () {
    data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        const userCredentials = document.getElementById('credentials');
        userCredentials.innerText = data.userInfo[0].firstName + ' ' + data.userInfo[0].lastName;

        const container = document.createElement('div');
        container.setAttribute('class', 'col-xs-12 col-sm-12 col-md-12 mainContainer');

        setTimeout(() => {
            container.style.opacity = '1';
            document.getElementsByTagName('footer')[0].style.opacity = '1';
        }, 750);

        const postTitle = document.createElement('h3');
        postTitle.setAttribute('class', 'postTitleClass');
        postTitle.textContent = data.post[0].postTitle;
        container.appendChild(postTitle);

        const divMainContent = document.createElement('div');
        divMainContent.setAttribute('class', 'col-xs-12 col-sm-12 col-md-12 divMainContent');
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
            postText = document.createElement('article');
            postText.setAttribute('class', 'postTextClass');
            postText.innerHTML = data.post[0].postText;
            divMainContent.appendChild(postText);
        }

        const createdByMain = document.createElement('div');
        createdByMain.setAttribute('class', 'col-md-12 createdByMain');
        container.appendChild(createdByMain);

        const createdBy = document.createElement('h4');
        createdBy.setAttribute('class', 'createdByClass');
        const createdByLink = document.createElement('a');
        createdByLink.setAttribute('href', 'http://127.0.0.1:5500/profile.html?' + data.post[0].userId);
        createdByLink.innerText = data.post[0].username;
        createdBy.appendChild(createdByLink);
        createdByMain.appendChild(createdBy);

        const likes = document.createElement('div');
        likes.setAttribute('class', 'col-md-12 likes')
        createdByMain.appendChild(likes)

        const likesTip = document.createElement('span');
        likesTip.setAttribute('class', 'tooltiptext');

        const postLikes = document.createElement('i')
        postLikes.setAttribute('class', 'far fa-thumbs-up');
        postLikes.innerText = data.post[0].postLikes;
        apiAddress = [like = { 'like': 1 }, ('POST'), (api + '/' + data.post[0].postId + '/likes')];
        likeComment(
            (data.post[0].postUserLiked),
            (data.post[0].postLikes),
            (data.userInfo[0].userId),
            postLikes,
            apiAddress,
            likesTip
        );

        const postDislikes = document.createElement('i');
        postDislikes.setAttribute('class', 'far fa-thumbs-down');
        postDislikes.innerText = data.post[0].postDislikes;
        apiAddress = [like = { 'like': -1 }, ('POST'), (api + '/' + data.post[0].postId + '/likes')];
        dislikeComment(
            (data.post[0].postUserDisliked),
            (data.post[0].postDislikes),
            (data.userInfo[0].userId),
            postDislikes,
            apiAddress,
            likesTip
        );
        likes.append(postLikes, likesTip, postDislikes);

        const buttonDiv = document.createElement('div');
        buttonDiv.setAttribute('class', 'btn-group');
        createdByMain.appendChild(buttonDiv);

        let timePeriods = document.createElement('div');
        timePeriods.setAttribute('class', 'col-md-12 timePeriods');
        container.appendChild(timePeriods);

        const postReport = document.createElement('button');
        if ((data.post[0].userId !== data.userInfo[0].userId) || data.userInfo[0].admin === 1) {
            postReport.setAttribute('class', 'btn btn-link')
            postReport.innerText = 'report';
            if (screen.width > 600) {
                buttonDiv.appendChild(postReport)
            } else if (data.userInfo[0].admin !== 1) {
                hamburgerMenu(buttonDiv, [postReport])
            }
            reportEventListener(postReport, timePeriods, data.post[0].postId, data.post[0].userId, (undefined))
        }
        if (data.userCreatedThisPost || data.userInfo[0].admin === 1) {
            const modifyButton = document.createElement('button');
            modifyButton.setAttribute('id', 'modifyButton')
            modifyButton.setAttribute('class', 'btn btn-link');
            modifyButton.innerHTML = 'modify';
            createOrEditArticle(('modify'), (data.post[0].postTitle), (data.post[0].postText), (data.post[0].postPicture), (data.post[0].postId), modifyButton)

            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('class', 'btn btn-link');
            deleteButton.innerHTML = 'delete';
            if (screen.width > 600) {
                buttonDiv.append(modifyButton, deleteButton)
            } else if (data.userInfo[0].admin === 1) {
                hamburgerMenu(buttonDiv, [modifyButton, deleteButton, postReport])
            } else {
                hamburgerMenu(buttonDiv, [modifyButton, deleteButton])
            }

            deleteButton.addEventListener('click', ($event) => {
                $event.preventDefault();
                let result = confirm('Do you really want to delete your Article?');
                if (result) {
                    submitMMFormData({ 'delete': 'delete' }, ('DELETE'), (api + '/' + reqPostId)).then(() => {
                        window.location.href = 'http://127.0.0.1:5500/home.html';
                    });
                }
            });
        };

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

        let addComment = document.createElement('div');
        addComment.setAttribute('class', 'col-md-12 addCommentDiv');
        addComment.style.width = '100%';
        container.appendChild(addComment);

        createCommentForm(addComment, data.post[0].postId)

        let inputLabel = container.getElementsByClassName('labelDiv')[0];
        inputLabelCommentsSpan(
            addComment,
            inputLabel,
            (data.post[0].postId),
            (data.post[0].numberOfComments),
            container,
            (data.userInfo[0].userId),
            (data.userInfo[0].admin)
        );

    } else {
        window.location.href = 'home.html';
    }
}
request.send();