let footer = document.getElementsByClassName('modal-footer')[0]
let navbar = document.getElementsByClassName('navbar-fixed-top')[0]
let measureContentHeight
if ((window.location.pathname).split('/')[1].split('?')[0] === 'post.html' || (window.location.pathname).split('/')[1].split('?')[0] === 'home.html') {
    window.addEventListener('load', () => {
        if ((window.location.pathname).split('/')[1].split('?')[0] === 'post.html') {
            measureContentHeight = document.getElementById('showPost');
        } else if ((window.location.pathname).split('/')[1].split('?')[0] === 'home.html') {
            measureContentHeight = document.getElementById('unreadPosts')
        }
        setTimeout(() => {
            if (window.innerHeight - navbar.offsetHeight - footer.offsetHeight > measureContentHeight.offsetHeight) {
                footer.style.position = 'absolute'
            } else {
                footer.style.position = 'relative'
            }
            window.addEventListener('click', () => {
                setTimeout(() => {
                    if (window.innerHeight - navbar.offsetHeight - footer.offsetHeight > measureContentHeight.offsetHeight + 20) {
                        footer.style.position = 'absolute'
                    } else {
                        footer.style.position = 'relative'
                    }
                }, 30);
            });
            window.addEventListener('click', () => {
                setTimeout(() => {
                    if (window.innerHeight - navbar.offsetHeight - footer.offsetHeight > measureContentHeight.offsetHeight + 20) {
                        footer.style.position = 'absolute'
                    } else {
                        footer.style.position = 'relative'
                    }
                }, 150);
            }, { once: true });
        }, 50);
    })
}
function createCommentForm(addComment, mmCommentId, subCom, postId) {
    const commentForm = document.createElement('form');
    commentForm.setAttribute('class', 'form-inline');

    const labelDiv = document.createElement('div')
    labelDiv.setAttribute('class', 'labelDiv');
    commentForm.appendChild(labelDiv);

    const showHideComArea = document.createElement('i');
    showHideComArea.setAttribute('class', 'fas fa-chevron-up');
    labelDiv.appendChild(showHideComArea);

    const commentFormLabel = document.createElement('label');
    commentFormLabel.setAttribute('for', 'comment');
    commentFormLabel.innerText = 'Add your comment here:'
    labelDiv.appendChild(commentFormLabel);

    const comInputArea = document.createElement('div');
    comInputArea.setAttribute('id', 'comInputArea');
    commentForm.appendChild(comInputArea);

    const commentInput = document.createElement('textarea');
    commentInput.setAttribute('type', 'text');
    commentInput.setAttribute('class', 'form-control commentTextInput')
    commentInput.setAttribute('name', 'commentTextInput');
    commentInput.oninput = function () {
        commentInput.style.height = "60px";
        commentInput.style.height = Math.min(commentInput.scrollHeight, 200) + "px";
        if (commentInput.scrollHeight > 200) {
            commentInput.style.overflowY = 'scroll';
        } else {
            commentInput.style.overflowY = '';
        }
    };
    comInputArea.appendChild(commentInput);

    const commentButtonDiv = document.createElement('div');
    commentButtonDiv.setAttribute('class', 'col-md-12 commentButtonDiv');
    comInputArea.appendChild(commentButtonDiv);

    const commentReset = document.createElement('button');
    commentReset.setAttribute('class', 'btn btn-link');
    commentReset.innerText = 'reset';
    commentButtonDiv.appendChild(commentReset);

    commentReset.addEventListener('click', ($event) => {
        $event.preventDefault()
        commentForm.reset()
    });

    const commentSubmit = document.createElement('button');
    commentSubmit.setAttribute('class', 'btn btn-link');
    commentSubmit.innerText = 'comment';
    commentButtonDiv.appendChild(commentSubmit);
    addComment.appendChild(commentForm);
    labelDiv.addEventListener('click', () => {
        if (comInputArea.style.opacity === '1') {
            comInputArea.style.opacity = '0';
            commentInput.style.display = 'none';
            addComment.style.height = '30px';
            showHideComArea.setAttribute('class', 'fas fa-chevron-up');
        } else {
            addComment.style.height = 'auto';
            setTimeout(() => { comInputArea.style.opacity = '1' }, 150)
            showHideComArea.setAttribute('class', 'fas fa-chevron-down');
            commentInput.style.display = 'block';
            commentInput.focus();
        }
    });
    let keyWord = 'POST';
    commentButtonDiv.lastChild.addEventListener('click', ($event) => {
        $event.preventDefault()
        if (commentInput.value.trim().length > 0) {
            if ((window.location.pathname).split('/')[1].split('?')[0] === 'post.html') {
                if (subCom === true) {
                    comment = addComment.getElementsByClassName('commentTextInput')[0].value;
                    let submitComment = { comment, mmCommentId, postId };
                    let apiLink = api + '/commentOnComment';
                    submitMMFormData(submitComment, keyWord, apiLink).then(() => { window.location.reload() });
                    commentForm.reset();
                } else {
                    comment = addComment.getElementsByClassName('commentTextInput')[0].value;
                    let submitComment = { comment, mmCommentId };
                    let apiLink = api + '/comment';
                    submitMMFormData(submitComment, keyWord, apiLink).then(() => { window.location.reload() });
                    commentForm.reset();
                }
            } else if ((window.location.pathname).split('/')[1] === 'profile.html' || (window.location.pathname).split('/')[1] === 'posts.html') {
                if (subCom === true) {
                    comment = addComment.getElementsByClassName('commentTextInput')[0].value;
                    let submitComment = { comment, mmCommentId, postId };
                    let apiLink = mmApi + '/commentOnComment';
                    submitMMFormData(submitComment, keyWord, apiLink).then(() => { window.location.reload() });
                    commentForm.reset();
                } else {
                    comment = addComment.getElementsByClassName('commentTextInput')[0].value;
                    let submitComment = { comment, mmCommentId };
                    let apiLink = mmApi + '/comment';
                    submitMMFormData(submitComment, keyWord, apiLink).then(() => { window.location.reload() });
                    commentForm.reset();
                }
            }
        } else {
            commentInput.setAttribute('placeholder', 'You can not submit empty comment');
            commentInput.focus();
            return
        }
    });
    preventJs();
}

function createReportDiv(comRepForm, divToReplace, comRepReason, replace) {
    const comRepCol1 = document.createElement('div');
    comRepCol1.setAttribute('class', ' btn-group');
    comRepForm.appendChild(comRepCol1);

    const comRepFormRow1 = document.createElement('div');
    comRepFormRow1.setAttribute('class', 'col-md-3');
    comRepCol1.appendChild(comRepFormRow1)

    const comRepInput1 = document.createElement('input');
    comRepInput1.setAttribute('class', 'form-check-input');
    comRepInput1.setAttribute('type', 'radio');
    comRepInput1.setAttribute('name', 'reportOptions');
    comRepInput1.setAttribute('id', 'reportOption1');
    comRepInput1.setAttribute('value', 'Spam');
    comRepInput1.checked = true
    comRepLabel1 = document.createElement('label');
    comRepLabel1.setAttribute('for', 'reportOption1');
    comRepLabel1.innerText = 'Spam';
    comRepFormRow1.append(comRepInput1, comRepLabel1);

    const comRepFormRow2 = document.createElement('div');
    comRepFormRow2.setAttribute('class', 'col-md-3');
    comRepCol1.appendChild(comRepFormRow2)
    const comRepInput2 = document.createElement('input');
    comRepInput2.setAttribute('class', 'form-check-input');
    comRepInput2.setAttribute('type', 'radio');
    comRepInput2.setAttribute('name', 'reportOptions');
    comRepInput2.setAttribute('id', 'reportOption2');
    comRepInput2.setAttribute('value', 'Violence');
    comRepLabel2 = document.createElement('label');
    comRepLabel2.setAttribute('for', 'reportOption2');
    comRepLabel2.innerText = 'Violence';
    comRepFormRow2.append(comRepInput2, comRepLabel2);

    const comRepFormRow3 = document.createElement('div');
    comRepFormRow3.setAttribute('class', 'col-md-3');
    comRepCol1.appendChild(comRepFormRow3)
    const comRepInput3 = document.createElement('input');
    comRepInput3.setAttribute('class', 'form-check-input');
    comRepInput3.setAttribute('type', 'radio');
    comRepInput3.setAttribute('name', 'reportOptions');
    comRepInput3.setAttribute('id', 'reportOption3');
    comRepInput3.setAttribute('value', 'Fake news');
    comRepLabel3 = document.createElement('label');
    comRepLabel3.setAttribute('for', 'reportOption3');
    comRepLabel3.innerText = 'Fake news';
    comRepFormRow3.append(comRepInput3, comRepLabel3);

    const comRepFormRow4 = document.createElement('div');
    comRepFormRow4.setAttribute('class', 'col-md-3');
    comRepCol1.appendChild(comRepFormRow4)
    const comRepInput4 = document.createElement('input');
    comRepInput4.setAttribute('class', 'form-check-input');
    comRepInput4.setAttribute('type', 'radio');
    comRepInput4.setAttribute('name', 'reportOptions');
    comRepInput4.setAttribute('id', 'reportOption4');
    comRepInput4.setAttribute('value', 'Harrasment');
    comRepLabel4 = document.createElement('label');
    comRepLabel4.setAttribute('for', 'reportOption4');
    comRepLabel4.innerText = 'Harrasment';
    comRepFormRow4.append(comRepInput4, comRepLabel4);

    const comRepCol2 = document.createElement('div');
    comRepCol2.setAttribute('class', ' btn-group');
    comRepForm.appendChild(comRepCol2);

    const comRepFormRow5 = document.createElement('div');
    comRepFormRow5.setAttribute('class', 'col-md-8');
    comRepCol2.appendChild(comRepFormRow5)
    const comRepInput5 = document.createElement('input');
    comRepInput5.setAttribute('class', 'form-check-input');
    comRepInput5.setAttribute('type', 'radio');
    comRepInput5.setAttribute('name', 'reportOptions');
    comRepInput5.setAttribute('id', 'reportOption5');
    comRepLabel5 = document.createElement('input');
    comRepLabel5.setAttribute('for', 'reportOption5');
    comRepLabel5.setAttribute('class', 'form-control');
    comRepLabel5.setAttribute('id', 'reportLabel5');
    comRepLabel5.setAttribute('placeholder', 'Different reason?');
    comRepLabel5.addEventListener('input', () => {
        comRepInput5.value = comRepLabel5.value;
        comRepInput5.checked = true
    })
    comRepFormRow5.append(comRepInput5, comRepLabel5);

    const comRepFormRow6 = document.createElement('div');
    comRepFormRow6.setAttribute('class', 'col-md-4');
    comRepCol2.appendChild(comRepFormRow6)
    const comRepCancel = document.createElement('button')
    comRepCancel.setAttribute('class', 'btn btn-link');
    comRepCancel.innerText = 'Cancel';
    comRepCancel.addEventListener('click', () => {
        if (replace === 'replace') {
            comRepReason.replaceWith(divToReplace)
        } else if (replace === 'append') {
            comRepReason.parentElement.removeChild(comRepReason)
        } else {
            comRepCancel.parentElement.parentElement.parentElement.parentElement.removeChild(document.getElementById('comRepReasonDiv'))
        }
    })
    comRepCol2.appendChild(comRepCancel)
    preventJs();
}

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
    }
    catch (errorResponse) {
        alert(errorResponse);
    };
}

function preventJs() {
    let inputFields = document.getElementsByTagName('input');
    let textareaFields = document.getElementsByTagName('textarea');
    for (let i = 0; i < inputFields.length; i++) {
        preventJ(inputFields[i]);
    }
    for (let i = 0; i < textareaFields.length; i++) {
        preventJ(textareaFields[i]);
    }
}

function preventJ(field) {
    field.addEventListener('input', () => {
        if (field.value.toLowerCase().trim().includes('javascript:') || field.value.toLowerCase().trim().includes('<script>') || field.value.toLowerCase().trim().includes('document.cookie')) {
            submitMMFormData({ field: field.outerHTML, fieldInput: field.value, location: window.location.href }, ('POST'), (api + '/hkReport'))
                .then(message => { alert(message.message) });
            field.value = '';
            alert(`
                    BE AWARE! Attempting to hack is serious offence and has been reported. \n 
                    Another try might cause permanent auto deletion of your account WITHOUT any posibility of recovering.\n
                    This will include ALL articles and posts you have created.
                `);
            logoutButton.click();
        }
    });
}
function constructRightPartNumbers(attachTo, numberOfPosts, totalNumberOfPosts) {
    const numbersDiv = document.createElement('div');
    numbersDiv.setAttribute('class', 'numbersDiv');
    attachTo.appendChild(numbersDiv);

    const userArticles = document.createElement('label');
    userArticles.setAttribute('for', 'articleNumber');
    userArticles.innerText = 'Created articles:'

    const userArticlesParag = document.createElement('p');
    userArticlesParag.innerText = numberOfPosts
    numbersDiv.append(userArticles, userArticlesParag);

    const usersPosts = document.createElement('label');
    usersPosts.setAttribute('for', 'postNumber');
    usersPosts.innerText = 'Created posts:'

    const usersPostsParag = document.createElement('p');
    usersPostsParag.innerText = totalNumberOfPosts;
    numbersDiv.append(usersPosts, usersPostsParag);
}

function constructRightPartSuccArticles(attachTo, succPosts) {
    const sucArticles = document.createElement('div');
    sucArticles.setAttribute('id', 'succArticles');
    attachTo.appendChild(sucArticles);

    const sucArtHeader = document.createElement('h4');
    sucArtHeader.innerText = 'Successfull articles';
    sucArticles.appendChild(sucArtHeader);

    const sucArtList = document.createElement('ul');
    sucArticles.appendChild(sucArtList);

    if (succPosts.length !== 0) {
        for (let j = 0; j < succPosts.length; j++) {

            const sucArtListItem1 = document.createElement('li');

            const succLink = document.createElement('a');
            succLink.setAttribute('href', './post.html?' + succPosts[j].postId)
            succLink.innerText = succPosts[j].postTitle;
            sucArtListItem1.appendChild(succLink)

            const meter = document.createElement('meter');
            meter.setAttribute('min', '0');
            meter.setAttribute('max', '100');
            meter.setAttribute('value', succPosts[j].postLikes - succPosts[j].postDislikes);

            sucArtList.append(sucArtListItem1, meter)
        }
    } else {
        const infoParag = document.createElement('p');
        infoParag.innerText = 'No articles to dispay';
        infoParag.style.fontStyle = 'italic'
        sucArticles.appendChild(infoParag);
    }
}

function constructRPRecCreated(attachTo, recentPosts) {
    const recentArticles = document.createElement('div');
    recentArticles.setAttribute('id', 'recentArticles');
    attachTo.appendChild(recentArticles);

    const recentArtHeader = document.createElement('h4');
    recentArtHeader.innerText = 'Recent community articles';
    recentArticles.appendChild(recentArtHeader);

    const recArtList = document.createElement('ul');
    recentArticles.appendChild(recArtList);

    if (recentPosts.length !== 0) {
        for (let j = 0; j < recentPosts.length; j++) {

            const recArtListItem = document.createElement('li');

            const recLink = document.createElement('a');
            recLink.setAttribute('href', './post.html?' + recentPosts[j].postId);
            recLink.innerText = recentPosts[j].postTitle;
            recArtListItem.appendChild(recLink);

            const recArtCreator = document.createElement('p');
            recArtCreator.innerText = 'By: ' + recentPosts[j].username;

            recArtList.append(recArtListItem, recArtCreator);
        }
    }
}
function hamburgerMenu(attachTo, listItems) {

    const container = document.createElement('div');
    container.setAttribute('class', 'dropdown hamburger-dropdown');
    attachTo.appendChild(container);

    const collapseButton = document.createElement('button');
    collapseButton.setAttribute('class', 'btn btn-link dropdown-toggle');
    collapseButton.setAttribute('type', 'button');
    collapseButton.setAttribute('data-toggle', 'dropdown');
    collapseButton.setAttribute('aria-label', 'Additional options');
    container.appendChild(collapseButton);

    const buttonSpan = document.createElement('i');
    buttonSpan.setAttribute('class', 'fas fa-bars fa-1x');
    collapseButton.appendChild(buttonSpan);

    const ul = document.createElement('div');
    ul.setAttribute('class', 'dropdown-menu');
    container.appendChild(ul);

    for (let i = 0; i < listItems.length; i++) {
        listItems[i].classList.add('dropdown-item')
        ul.appendChild(listItems[i]);
    }
}

function replaceParagWTextArea(comBodyParag) {
    comBodyParag2 = document.createElement('textarea');
    comBodyParag2.setAttribute('class', 'form-control editedCommentData');
    comBodyParag2.oninput = function () {
        comBodyParag2.style.height = "20px";
        comBodyParag2.style.height = Math.min(comBodyParag2.scrollHeight, 200) + "px";
        if (comBodyParag2.scrollHeight > 200) {
            comBodyParag2.style.overflowY = 'scroll';
        } else {
            comBodyParag2.style.overflowY = '';
        }
    };
    comBodyParag.replaceWith(comBodyParag2);
    comBodyParag2.innerText = comBodyParag.innerText;
    comBodyParag2.focus();
}

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