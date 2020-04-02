
let api = 'http://127.0.0.1:3000/api/posts';

const showAllPosts = document.getElementById('showAllPosts');

let request = new XMLHttpRequest();
request.open('GET', api, true);
request.withCredentials = true;
request.onload = function () {
    //if (request.status = 401) { window.location.href = '/frontend/index.html' }
    // Begin accessing JSON data here
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
                }
                let postText
                if (!data.posts[i].postText == null || !data.posts[i].postText == '') {
                    postText = document.createElement('p');
                    postText.setAttribute('class', 'postTextClass');
                    postText.textContent = data.posts[i].postText;
                    contentDiv.appendChild(postText);
                }

                const createdByDiv = document.createElement('div');
                createdByDiv.setAttribute('class', 'col-md-12 createdByClass');
                postDiv.appendChild(createdByDiv);

                const createdBy = document.createElement('h5');
                createdBy.innerText = 'By: ' + data.posts[i].username;
                createdByDiv.appendChild(createdBy)

                likes = document.createElement('i');
                likes.setAttribute('class', 'far fa-thumbs-up');
                if (data.posts[i].postLikes > 0) {
                    likes.style.color = '#639a67'
                }
                likes.innerText = '' + data.posts[i].postLikes;
                createdByDiv.appendChild(likes);

                dislikes = document.createElement('i');
                dislikes.setAttribute('class', 'far fa-thumbs-down');
                if (data.posts[i].postDislikes > 0) {
                    dislikes.style.color = '#da2d2d';
                }
                dislikes.innerText = '' + data.posts[i].postDislikes;
                createdByDiv.appendChild(dislikes);

                const postTimeCreated = document.createElement('p');
                postTimeCreated.setAttribute('class', 'timeCreatedClass');
                finalDate = data.posts[i].postTimeCreated;
                finalDate = new Date(finalDate).toISOString().slice(0, 19).replace('T', ' ');
                postTimeCreated.innerText = finalDate;
                postDiv.appendChild(postTimeCreated)

                showAllPosts.appendChild(container)
            }
        } else {
            noPost = document.createElement('p');
            noPost.innerText = 'There are no new posts';
            document.getElementById('readPosts').appendChild(noPost);
        }
        /*if (data.posts !== 0) {
            for (let j = 0; j < data.posts.length; j++) {
                const container2 = document.getElementById('unreadPosts');

                const postDiv2 = document.createElement('div');
                postDiv2.setAttribute('class', 'onePostDiv');
                container2.appendChild(postDiv2)
                postDiv2.addEventListener('click', () => {
                    window.location.href = '/frontend/post.html?' + data.posts[j].postId
                })


                const postTitle = document.createElement('h2');
                postTitle.setAttribute('class', 'postTitleClass');
                postTitle.textContent = data.posts[j].postTitle
                postDiv2.appendChild(postTitle);

                let postText
                if (!data.posts[j].postText == null || !data.posts[j].postText == '') {
                    postText = document.createElement('p');
                    postText.setAttribute('class', 'postTextClass');
                    postText.textContent = data.posts[j].postText;
                    postDiv2.appendChild(postText);
                }
                let postPicture
                if (!data.posts[j].postPicture == null || !data.posts[j].postPicture == '') {
                    postPicture = document.createElement('img');
                    postPicture.setAttribute('class', 'postPictureClass');
                    postPicture.setAttribute('src', data.posts[j].postPicture);
                    postDiv2.appendChild(postPicture);
                }

                let edited
                if (!data.posts[j].edited == 0) {

                    edited = document.createElement('p');
                    edited.setAttribute('class', 'editedClass');
                    edited.textContent = 'Edited';
                    postDiv2.appendChild(edited);
                }
                let timeEdited
                if (!data.posts[j].timeEdited == null || !data.posts[j].timeEdited == '') {
                    timeEdited = document.createElement('p');
                    timeEdited.setAttribute('class', 'timeEditedClass');
                    timeEdited.textContent = data.posts[j].timeEdited;
                    postDiv2.appendChild(timeEdited);
                }

                const postTimeCreated = document.createElement('p');
                postTimeCreated.setAttribute('class', 'timeCreatedClass');
                postTimeCreated.innerText = data.posts[j].postTimeCreated;
                postDiv2.appendChild(postTimeCreated)

                const postLikes = document.createElement('p')
                postLikes.setAttribute('class', 'likesClass');
                postLikes.innerText = data.posts[j].postLikes;
                postDiv2.appendChild(postLikes);

                const postDislikes = document.createElement('p')
                postDislikes.setAttribute('class', 'likesClass');
                postDislikes.innerText = data.posts[j].postDislikes;
                postDiv2.appendChild(postDislikes);

                const postUserLiked = document.createElement('p')
                postUserLiked.setAttribute('class', 'userLikesClass');
                //treba petlja da se napravi
                postUserLiked.innerText = data.posts[j].postUserLiked;
                postDiv2.appendChild(postUserLiked)

                const postUserDisliked = document.createElement('p')
                postUserDisliked.setAttribute('class', 'userLikesClass');
                //treba petlja da se napravi
                postUserDisliked.innerText = data.posts[j].postUserDisliked;
                postDiv2.appendChild(postUserDisliked)

                const createdBy = document.createElement('h4');
                createdBy.setAttribute('class', 'createdByClass');
                createdBy.innerText = data.posts[j].username;
                postDiv2.appendChild(createdBy)


                showAllPosts.appendChild(container2)
            }
        } else {
            noPost = document.createElement('p');
            noPost.innerText = 'You still did not read any post';
            document.getElementById('readPosts').appendChild(noPost);

        }*/

    } else {
        window.location.href = '/frontend/index.html'
        //alert('There is an error');
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