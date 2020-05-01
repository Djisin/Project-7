let api = 'http://127.0.0.1:3000/api/posts';

const showAllPosts = document.getElementById('showAllPosts');

let request = new XMLHttpRequest();
request.open('GET', api, true);
request.withCredentials = true;
request.onload = function () {
    let data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        const userCredentials = document.getElementById('credentials');
        userCredentials.innerText = data.userInfo[0].firstName + ' ' + data.userInfo[0].lastName
        if (data.posts !== 0) {
            for (let i = 0; i < data.posts.length; i++) {
                const container = document.getElementById('unreadPosts');

                const postDiv = document.createElement('div');
                postDiv.setAttribute('class', 'onePostDiv');
                container.appendChild(postDiv);
                postDiv.addEventListener('click', () => {
                    window.location.href = '/frontend/post.html?' + data.posts[i].postId
                });

                postsSeen = JSON.parse(data.userInfo[0].postsSeen);
                postsSeen = postsSeen.seen;
                if (postsSeen.includes(data.posts[i].postId)) {
                    const postTitle = document.createElement('h3');
                    postTitle.setAttribute('class', 'postTitleClass SeenPost');
                    postTitle.textContent = data.posts[i].postTitle;
                    postDiv.appendChild(postTitle);
                } else {
                    const postTitle = document.createElement('h3');
                    postTitle.setAttribute('class', 'postTitleClass');
                    postTitle.textContent = data.posts[i].postTitle
                    postDiv.appendChild(postTitle);
                }

                const contentDiv = document.createElement('div');
                contentDiv.setAttribute('class', 'col-md-12 contentDiv');
                postDiv.appendChild(contentDiv);
                let postPicture
                if (!data.posts[i].postPicture == null || !data.posts[i].postPicture == '') {
                    postPicture = document.createElement('img');
                    postPicture.setAttribute('class', 'postPictureClass');
                    postPicture.setAttribute('src', data.posts[i].postPicture);
                    contentDiv.appendChild(postPicture);
                    console.log(data.posts[i].postText.length)
                    if (data.posts[i].postText.length < 170) {
                        postPicture.style.maxWidth = '100%';
                        postPicture.style.maxHeight = '210px';
                        postPicture.style.marginBottom = '9px';
                    }
                }
                let postText
                if (!data.posts[i].postText == null || !data.posts[i].postText == '') {
                    postText = document.createElement('p');
                    postText.setAttribute('class', 'postTextClass');
                    postText.textContent = data.posts[i].postText;
                    contentDiv.appendChild(postText);
                }

                const createdByDiv = document.createElement('div');
                createdByDiv.setAttribute('class', 'createdByClass');
                postDiv.appendChild(createdByDiv);

                const creatorDiv = document.createElement('div');
                creatorDiv.setAttribute('class','creatorDiv');
                createdByDiv.appendChild(creatorDiv);

                const createdBy = document.createElement('h5');
                createdBy.innerText = data.posts[i].username;
                creatorDiv.appendChild(createdBy);
                
                const postTimeCreated = document.createElement('p');
                postTimeCreated.textContent = countTime(data.posts[i].postTimeCreated);
                creatorDiv.appendChild(postTimeCreated)

                likesDiv = document.createElement('div');
                likesDiv.setAttribute('class','likesDiv');
                createdByDiv.appendChild(likesDiv);

                likes = document.createElement('i');
                likes.setAttribute('class', 'far fa-thumbs-up');
                if (data.posts[i].postLikes > 0) {
                    likes.style.color = '#639a67'
                }
                likes.innerText = '' + data.posts[i].postLikes;
                likesDiv.appendChild(likes);

                dislikes = document.createElement('i');
                dislikes.setAttribute('class', 'far fa-thumbs-down');
                if (data.posts[i].postDislikes > 0) {
                    dislikes.style.color = '#da2d2d';
                }
                dislikes.innerText = '' + data.posts[i].postDislikes;
                likesDiv.appendChild(dislikes);

                showAllPosts.appendChild(container)
            }
        }
    } else {
        window.location.href = '/frontend/index.html'
    }
}
request.send();