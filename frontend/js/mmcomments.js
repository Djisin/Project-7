function makeMMComRequest(submitComment, keyWord, apiLink) {
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
        request.send(JSON.stringify(submitComment));
    });
}

async function submitMMComFormData(submitComment, keyWord, apiLink) {
    try {
        const requestPromise = makeMMComRequest(submitComment, keyWord, apiLink);
        const response = await requestPromise;
        responseId = (JSON.parse(response));
        return responseId;
    }
    catch (errorResponse) {
        alert(errorResponse);
    };
}

function inputLabelCommentsSpan(addComment, inputLabel, numberOfComments, postId, singlePost) {
    inputLabel.addEventListener('click', () => {
        if (addComment.style.height !== '30px') {
            inputLabel.lastChild.style.display = 'none';
        } else {
            inputLabel.lastChild.style.display = 'block';
        }
        let submitComment = [];
         submitMMComFormData(submitComment, ('GET'), (mmApi + '/' + postId))
            .then((postComments) => {
                if (postComments.length !== 0) {
                    let njnjnj =postComments
                    let j =0;
                    while( j < njnjnj.length) {
                        console.log('zika')
                        commentBuilder(
                            singlePost,
                            (postComments[j].userPicture),
                            (postComments[j].username),
                            (postComments[j].timeCreated),
                            (postComments[j].commentText)
                        )
                        j++
                    }
                }
            });
        //commentBuilder(comBuilderData);

    })

    let commentSpan = document.createElement('span');
    if (numberOfComments !== 0) {
        commentSpan.innerText = 'Comments(' + numberOfComments + ')';
    } else {
        commentSpan.innerText = 'No comments';
    }
    inputLabel.appendChild(commentSpan);
}

function commentBuilder(singlePost, ImgSrc, byWhoInfo, byWhenInfo, comTxt) {
    console.log('zika')
    let singleCommentDiv = document.createElement('div');
    singleCommentDiv.setAttribute('class', 'col-md-12 single-comment-div');
    singleCommentDiv.style.padding = '0';
    singlePost.appendChild(singleCommentDiv);

    const mainComment = document.createElement('section');
    mainComment.setAttribute('class', 'mainComment')
    singleCommentDiv.appendChild(mainComment)

    const creator = document.createElement('div');
    creator.setAttribute('class', 'col-md-2 comLeftPart');
    mainComment.appendChild(creator);

    const userImg = document.createElement('img');
    userImg.setAttribute('src', ImgSrc)
    userImg.setAttribute('alt', 'User picture')
    creator.appendChild(userImg)

    const commInfo = document.createElement('div');
    commInfo.setAttribute('class', 'col-md-10 comRightPart');
    mainComment.appendChild(commInfo);

    const whoAndWhen = document.createElement('div');
    whoAndWhen.setAttribute('class', 'col-md-12 whoAndWhen');
    commInfo.appendChild(whoAndWhen);

    const byWho = document.createElement('h5');
    byWho.innerText = byWhoInfo;
    const byWhen = document.createElement('p');
    byWhen.innerText = 'Created: ' + countTime(byWhenInfo);
    whoAndWhen.append(byWho, byWhen);

    const comBody = document.createElement('div');
    comBody.setAttribute('class', 'col-md-12 comBody');
    commInfo.appendChild(comBody);
}