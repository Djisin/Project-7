/*function submitCommentFormData() {
    comment = document.getElementsByClassName('commentTextInput')[0].value;
    let submitComment = { comment, reqPostId };

    submitFormData(submitComment);

    function makeRequest(submitComment) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.withCredentials = true;
            request.open('POST', api + '/comment');
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

    async function submitFormData(submitComment) {
        try {
            const requestPromise = makeRequest(submitComment);
            const response = await requestPromise;
            responseId = (JSON.parse(response));
            location.reload()
        }
        catch (errorResponse) {
            alert(errorResponse);
        };
    }
}*/

function submitEditedCommentFormData() {
    comment = document.getElementById('editedCommentData').value;

    if (document.getElementById('editedCommentData').value.trim().length > 1) {
        let submitComment = { comment, reqComId };
        submitFormData(submitComment);
    } else {
        document.getElementById('editedCommentData').setAttribute('placeholder', 'You can not submit empty comment');
        document.getElementById('editedCommentData').focus();
        return
    }

    function makeRequest(submitComment) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.withCredentials = true;
            request.open('PUT', api + '/comment/:id');
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

    async function submitFormData(submitComment) {
        try {
            const requestPromise = makeRequest(submitComment);
            const response = await requestPromise;
            responseId = (JSON.parse(response));
            location.reload()
        }
        catch (errorResponse) {
            alert(errorResponse);
        };
    }
}

function submitReport(submitReportData) {
    submitFormData(submitReportData);
    function makeRequest(submitReportData) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.withCredentials = true;
            request.open('POST', api + '/report');
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
            request.send(JSON.stringify(submitReportData));
        });
    }
    async function submitFormData(submitReportData) {
        try {
            const requestPromise = makeRequest(submitReportData);
            const response = await requestPromise;
            responseId = (JSON.parse(response));
            location.reload()
        }
        catch (errorResponse) {
            alert(errorResponse);
        };
    }
}

function submitDeleteComment() {
    let submitComment = { reqComId };

    submitFormData(submitComment);

    function makeRequest(submitComment) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.withCredentials = true;
            request.open('DELETE', api + '/comment/:id');
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

    async function submitFormData(submitComment) {
        try {
            const requestPromise = makeRequest(submitComment);
            const response = await requestPromise;
            responseId = (JSON.parse(response));
            location.reload()
        }
        catch (errorResponse) {
            alert(errorResponse);
        };
    }
}

function submit2ndComFormData(submit2ndComment) {
    submit2ndFormData(submit2ndComment);
    function make2ndRequest(submit2ndComment) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.withCredentials = true;
            request.open('POST', api + '/commentOnComment');
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
            request.send(JSON.stringify(submit2ndComment));
        });
    }
    async function submit2ndFormData(submit2ndComment) {
        try {
            const requestPromise = make2ndRequest(submit2ndComment);
            const response = await requestPromise;
            responseId = (JSON.parse(response));
            location.reload()
        }
        catch (errorResponse) {
            alert(errorResponse);
        };
    }
}

function submitDeleteComment2nd() {
    let submitComment2nd = { reqComId2nd };

    submitFormData2nd(submitComment2nd);

    function makeRequest2nd(submitComment2nd) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.withCredentials = true;
            request.open('DELETE', api + '/comment2nd/:id');
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
            request.send(JSON.stringify(submitComment2nd));
        });
    }

    async function submitFormData2nd(submitComment2nd) {
        try {
            const requestPromise = makeRequest2nd(submitComment2nd);
            const response = await requestPromise;
            responseId = (JSON.parse(response));
            location.reload()
        }
        catch (errorResponse) {
            alert(errorResponse);
        };
    }
}

function submitEditedCommentFormData2nd() {
    comment2nd = document.getElementsByClassName('editedCommentData2nd')[0].value;

    if (document.getElementsByClassName('editedCommentData2nd')[0].value.trim().length > 1) {
        let submitComment2nd = { comment2nd, reqComId2nd };
        submitEditedFormData2nd(submitComment2nd);
    } else {
        document.getElementsByClassName('editedCommentData2nd')[0].setAttribute('placeholder', 'You can not submit empty comment');
        document.getElementsByClassName('editedCommentData2nd')[0].focus();
        return
    }

    function makeEditedRequest2nd(submitComment2nd) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.withCredentials = true;
            request.open('PUT', api + '/comment2nd/:id');
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
            request.send(JSON.stringify(submitComment2nd));
        });
    }

    async function submitEditedFormData2nd(submitComment2nd) {
        try {
            const requestPromise = makeEditedRequest2nd(submitComment2nd);
            const response = await requestPromise;
            responseId = (JSON.parse(response));
            location.reload()
        }
        catch (errorResponse) {
            alert(errorResponse);
        };
    }
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
    //commentInput.disabled = true;
    //commentInput.setAttribute('id', '');
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
    })
    commentButtonDiv.lastChild.addEventListener('click', ($event) => {
        $event.preventDefault()
        if (commentInput.value.trim().length > 1) {
            if ((window.location.pathname).split('/')[2].split('?')[0] === 'post.html') {

                comment = document.getElementsByClassName('commentTextInput')[0].value;
                let submitComment = { comment, reqPostId };
                let keyWord = 'POST';
                let apiLink = api + '/comment';
                submitMMComment1st(submitComment, keyWord, apiLink);
            } else if ((window.location.pathname).split('/')[2] === 'profile.html') {
                if (subCom === true) {

                    comment = addComment.getElementsByClassName('commentTextInput')[0].value;
                    let submitComment = { comment, mmCommentId, postId };
                    let keyWord = 'POST';
                    let apiLink = mmApi + '/commentOnComment';
                    submitMMComment1st(submitComment, keyWord, apiLink);
                    commentForm.reset();
                } else {

                    comment = addComment.getElementsByClassName('commentTextInput')[0].value;
                    let submitComment = { comment, mmCommentId };
                    let keyWord = 'POST';
                    let apiLink = mmApi + '/comment';
                    submitMMComment1st(submitComment, keyWord, apiLink);
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
    comRepInput1.setAttribute('value', 'OPTION1');
    comRepInput1.checked = true
    comRepLabel1 = document.createElement('label');
    comRepLabel1.setAttribute('for', 'reportOption1');
    comRepLabel1.innerText = 'OPTION1';
    comRepFormRow1.append(comRepInput1, comRepLabel1);

    const comRepFormRow2 = document.createElement('div');
    comRepFormRow2.setAttribute('class', 'col-md-3');
    comRepCol1.appendChild(comRepFormRow2)
    const comRepInput2 = document.createElement('input');
    comRepInput2.setAttribute('class', 'form-check-input');
    comRepInput2.setAttribute('type', 'radio');
    comRepInput2.setAttribute('name', 'reportOptions');
    comRepInput2.setAttribute('id', 'reportOption2');
    comRepInput2.setAttribute('value', 'OPTION2');
    comRepLabel2 = document.createElement('label');
    comRepLabel2.setAttribute('for', 'reportOption2');
    comRepLabel2.innerText = 'OPTION2';
    comRepFormRow2.append(comRepInput2, comRepLabel2);

    const comRepFormRow3 = document.createElement('div');
    comRepFormRow3.setAttribute('class', 'col-md-3');
    comRepCol1.appendChild(comRepFormRow3)
    const comRepInput3 = document.createElement('input');
    comRepInput3.setAttribute('class', 'form-check-input');
    comRepInput3.setAttribute('type', 'radio');
    comRepInput3.setAttribute('name', 'reportOptions');
    comRepInput3.setAttribute('id', 'reportOption3');
    comRepInput3.setAttribute('value', 'OPTION3');
    comRepLabel3 = document.createElement('label');
    comRepLabel3.setAttribute('for', 'reportOption3');
    comRepLabel3.innerText = 'OPTION3';
    comRepFormRow3.append(comRepInput3, comRepLabel3);

    const comRepFormRow4 = document.createElement('div');
    comRepFormRow4.setAttribute('class', 'col-md-3');
    comRepCol1.appendChild(comRepFormRow4)
    const comRepInput4 = document.createElement('input');
    comRepInput4.setAttribute('class', 'form-check-input');
    comRepInput4.setAttribute('type', 'radio');
    comRepInput4.setAttribute('name', 'reportOptions');
    comRepInput4.setAttribute('id', 'reportOption4');
    comRepInput4.setAttribute('value', 'OPTION4');
    comRepLabel4 = document.createElement('label');
    comRepLabel4.setAttribute('for', 'reportOption4');
    comRepLabel4.innerText = 'OPTION4';
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
        // oneCommentDiv.removeChild(comRepReason);
    })
    comRepCol2.appendChild(comRepCancel)
    preventJs();
}
// mm Comments
function submitMMComment1st(submitComment, keyWord, apiLink) {
    /*comment = document.getElementsByClassName('commentTextInput')[0].value;
    let submitComment = { comment, reqMMPostId };*/

    submitFormData(submitComment);

    function makeRequest(submitComment) {
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

    async function submitFormData(submitComment) {
        try {
            const requestPromise = makeRequest(submitComment);
            const response = await requestPromise;
            responseId = (JSON.parse(response));
            location.reload()
        }
        catch (errorResponse) {
            alert(errorResponse);
        };
    }
};
function preventJs() {
    let inputFields = document.getElementsByTagName('input');
    let textareaFields = document.getElementsByTagName('textarea');
    for (let i = 0; i < inputFields.length; i++) {
        preventJ(inputFields[i]);
    }
    for (let i = 0; i < textareaFields.length; i++) {
        preventJ(textareaFields[i]);
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
}