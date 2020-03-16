let api = 'http://127.0.0.1:3000/api/posts';

const showAllPosts = document.getElementById('showAllPosts');

let request = new XMLHttpRequest();
request.open('GET', api, true);
request.withCredentials = true
request.onload = function () {
    //if (request.status = 401) { window.location.href = '/frontend/index.html' }
    // Begin accessing JSON data here
    let data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        for (let i = 0; i < data.posts.length; i++) {

            /*let post = data[i].postId;
            let postTitle = data[i].postTitle
            let postText = data[i].postText
            let postPicture = data[i].postPicture
            let edited = data[i].edited
            let timeEdited = data[i].timeEdited
            let postTimeCreated = data[i].postTimeCreated
            let postLikes = data[i].postLikes
            let postDislikes = data[i].postDislikes
            let postUserDisliked = data[i].postUserDisliked
            let postUserLiked = data[i].postUserLiked
            let createdBy = data[i].userId*/
            const container = document.createElement('div');

            container.addEventListener('click', () => {
                /*submitData = {
                    postId: data.posts[i].postId
                }
                submitFormData(submitData)*/
                //console.log(submitData)
                window.location.href = '/frontend/post.html?' + data.posts[i].postId
            })

            const postTitle = document.createElement('h2');
            postTitle.setAttribute('class', 'postTitleClass');
            postTitle.textContent = data.posts[i].postTitle
            container.appendChild(postTitle);

            let postText
            if (!data.posts[i].postText == null || !data.posts[i].postText == '') {
                postText = document.createElement('p');
                postText.setAttribute('class', 'postTextClass');
                postText.textContent = data.posts[i].postText;
                container.appendChild(postText);
            }
            let postPicture
            if (!data.posts[i].postPicture == null || !data.posts[i].postPicture == '') {
                postPicture = document.createElement('img');
                postPicture.setAttribute('class', 'postPictureClass');
                postPicture.setAttribute('src', data.posts[i].postPicture);
                container.appendChild(postPicture);
            }

            let edited
            if (!data.posts[i].edited == 0) {

                edited = document.createElement('p');
                edited.setAttribute('class', 'editedClass');
                edited.textContent = 'Edited';
                container.appendChild(edited);
            }
            //console.log(data.posts[i].timeEdited)
            let timeEdited
            if (!data.posts[i].timeEdited == null || !data.posts[i].timeEdited == '') {
                timeEdited = document.createElement('p');
                timeEdited.setAttribute('class', 'timeEditedClass');
                timeEdited.textContent = data.posts[i].timeEdited;
                container.appendChild(timeEdited);
            }

            const postTimeCreated = document.createElement('p');
            postTimeCreated.setAttribute('class', 'timeCreatedClass');
            postTimeCreated.innerText = data.posts[i].postTimeCreated;
            container.appendChild(postTimeCreated)

            const postLikes = document.createElement('p')
            postLikes.setAttribute('class', 'likesClass');
            postLikes.innerText = data.posts[i].postLikes;
            container.appendChild(postLikes);

            const postDislikes = document.createElement('p')
            postDislikes.setAttribute('class', 'likesClass');
            postDislikes.innerText = data.posts[i].postDislikes;
            container.appendChild(postDislikes);

            const postUserLiked = document.createElement('p')
            postUserLiked.setAttribute('class', 'userLikesClass');
            //treba petlja da se napravi
            postUserLiked.innerText = data.posts[i].postUserLiked;
            container.appendChild(postUserLiked)

            const postUserDisliked = document.createElement('p')
            postUserDisliked.setAttribute('class', 'userLikesClass');
            //treba petlja da se napravi
            postUserDisliked.innerText = data.posts[i].postUserDisliked;
            container.appendChild(postUserDisliked)

            const createdBy = document.createElement('h4');
            createdBy.setAttribute('class', 'createdByClass');
            createdBy.innerText = data.posts[i].username;
            container.appendChild(createdBy)


            showAllPosts.appendChild(container)
        }

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
            if(responseId.loggedOut=true){
               window.location.replace("index.html"); 
            }else{
                console.log('response id nije dobar')
            }
            
        }
        catch (errorResponse) {
            alert(errorResponse);
        };
    }
});