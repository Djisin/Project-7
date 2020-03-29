function submitCommentFormData() {
    comment = document.getElementById('commentTextInput').value;
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
}

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

function createCommentForm(addComment, add2ndComment) {
    const commentForm = document.createElement('form');
    commentForm.setAttribute('class', '');

    const labelDiv = document.createElement('div')
    labelDiv.setAttribute('class', 'labelDiv');
    commentForm.appendChild(labelDiv);

    const commentFormLabel = document.createElement('label');
    commentFormLabel.setAttribute('for', 'comment');
    commentFormLabel.innerText = 'Add your comment here:'
    labelDiv.appendChild(commentFormLabel);

    const showHideComArea = document.createElement('i');
    showHideComArea.setAttribute('class', 'fas fa-chevron-up');
    labelDiv.appendChild(showHideComArea);

    const comInputArea = document.createElement('div');
    comInputArea.setAttribute('id', 'comInputArea');
    commentForm.appendChild(comInputArea);

    const commentInput = document.createElement('textarea');
    commentInput.setAttribute('type', 'text');
    commentInput.setAttribute('name', 'commentTextInput');
    commentInput.setAttribute('id', 'commentTextInput');
    comInputArea.appendChild(commentInput);

    const commentButtonDiv = document.createElement('div');
    commentButtonDiv.setAttribute('class', 'col-md-12 commentButtonDiv');
    comInputArea.appendChild(commentButtonDiv);

    const commentReset = document.createElement('button');
    commentReset.setAttribute('class', 'btn btn-secondary');
    commentReset.innerText = 'Reset';
    commentButtonDiv.appendChild(commentReset);

    commentReset.addEventListener('click', ($event) => {
        $event.preventDefault()
        commentForm.reset()
    });

    const commentSubmit = document.createElement('button');
    commentSubmit.setAttribute('class', 'btn btn-info');
    commentSubmit.innerText = 'Comment';
    commentButtonDiv.appendChild(commentSubmit);

    if (addComment) {
        addComment.appendChild(commentForm);


    } else if (add2ndComment) {
        add2ndComment.appendChild(commentForm)
    }
}

function createReportDiv(comRepForm) {
    const comRepFormRow1 = document.createElement('div');
    comRepFormRow1.setAttribute('class', 'col-md-3');
    comRepForm.appendChild(comRepFormRow1)
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
    comRepForm.appendChild(comRepFormRow2)
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
    comRepForm.appendChild(comRepFormRow3)
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
    comRepForm.appendChild(comRepFormRow4)
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

    const comRepFormRow5 = document.createElement('div');
    comRepFormRow5.setAttribute('class', 'col-md-8');
    comRepForm.appendChild(comRepFormRow5)
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
    comRepForm.appendChild(comRepFormRow6)
    const comRepCancel = document.createElement('button')
    comRepCancel.setAttribute('class', 'btn btn-secondary');
    comRepCancel.innerText = 'Cancel';
    comRepCancel.addEventListener('click', () => {
        comRepCancel.parentElement.parentElement.parentElement.parentElement.removeChild(document.getElementById('comRepReasonDiv'))
        // oneCommentDiv.removeChild(comRepReason);
    })
    comRepFormRow6.appendChild(comRepCancel)
}