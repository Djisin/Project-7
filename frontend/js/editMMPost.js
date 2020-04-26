
function editMMPostFunction(divOnTop, editButton, mmText, multimedia, embeding, editingPostId) {

    //let editMMPost = document.getElementsByClassName('editMMPost')[0];

    editButton.addEventListener('click', ($event) => {
        $event.preventDefault();

        let closeButton = document.createElement('span');
        closeButton.textContent = "x";
        closeButton.setAttribute('id', 'closeButton');

        closeButton.addEventListener('click', (e) => {
            window.location.reload();
            editMMPostForm.reset();
        });
        divOnTop.appendChild(closeButton);

        if (document.getElementById('editMMDiv') !== null) {
            divOnTop.style.display = 'none';
        } else {
            divOnTop.style.display = 'flex';
        }

        const contDiv = document.createElement('div');
        contDiv.setAttribute('class', 'div-on-top-content');
        divOnTop.appendChild(contDiv);

        const editTitle = document.createElement('h4');
        editTitle.innerText = 'Edit you post'
        contDiv.appendChild(editTitle);

        const editMMPostForm = document.createElement('form');
        editMMPostForm.setAttribute('id', 'editMMDiv');
        contDiv.appendChild(editMMPostForm);

        const createMMPostTxt = document.createElement('textarea');
        createMMPostTxt.setAttribute('id', 'mmPostTxt');
        createMMPostTxt.setAttribute('class', 'form-control')
        createMMPostTxt.placeholder = 'Write something here...'
        if (mmText !== null) {
            createMMPostTxt.innerText = mmText
        }
        editMMPostForm.appendChild(createMMPostTxt);

        const buttonGroup = document.createElement('div');
        buttonGroup.setAttribute('class', 'btn-group');
        editMMPostForm.appendChild(buttonGroup);

        const addMMContentEdited = document.createElement('input');
        addMMContentEdited.setAttribute('type', 'file');
        addMMContentEdited.setAttribute('id', 'addMMContent');

        const mmButton = document.createElement('button');
        mmButton.setAttribute('class', 'btn btn-default');
        mmButton.innerHTML = '<i class="far fa-image"></i>'
        buttonGroup.appendChild(mmButton);
        mmButton.addEventListener('click', ($event) => {
            $event.preventDefault();
            showMMLabel();
            hideLinkInput();
            addMMContentEdited.click();
            if (addMMContentEdited.value !== null || addMMContentEdited.value !== '') {
                addMMContentEdited.onchange = () => {
                    mmLabel.innerText = addMMContentEdited.files[0].name;
                    hideLinkInput();
                    mmLabel.addEventListener('click', ($event) => {
                        $event.preventDefault()
                        hideMMLabel();
                    });
                }
            }
        });

        function hideMMLabel() {
            mmLabel.style.flexGrow = '';
            mmLabel.style.padding = '0';
            mmLabel.style.border = '0';
            mmLabel.style.opacity = '0';
            mmLabel.style.width = '0';
            mmLabel.innerText = '';
            addMMContentEdited.value = null;
        }

        function showMMLabel() {
            mmLabel.style.flexGrow = '100';
            mmLabel.style.padding = ' 6px 12px 6px 12px';
            mmLabel.style.border = null;
            mmLabel.style.opacity = '1';
            linkInput.value = '';
        }

        const mmLabel = document.createElement('label');
        mmLabel.setAttribute('class', 'input-group-addon');
        /*mmLabel.setAttribute('data-toggle', 'tooltip');
        mmLabel.setAttribute('data-placement', 'top');
        mmLabel.setAttribute('title', 'Click here to remove')*/
        mmLabel.setAttribute('id', 'mmLabel');
        mmLabel.style.border = '0';
        buttonGroup.appendChild(mmLabel);

        const linkButton = document.createElement('button');
        linkButton.setAttribute('class', 'btn btn-default');
        linkButton.innerHTML = '<i class="fas fa-link"></i>'
        buttonGroup.appendChild(linkButton);
        linkButton.addEventListener('click', ($event) => {
            $event.preventDefault();
            if (linkInput.style.flexGrow == 0) {
                displayLinkInput();
                hideMMLabel();
            } else {
                hideLinkInput();
            }
        });

        function displayLinkInput() {
            linkInput.style.flexGrow = '100';
            linkInput.style.padding = ' 6px 12px 6px 12px';
            linkInput.style.border = null;
            linkInput.style.opacity = '1';
            linkInput.focus();
            addMMContentEdited.value = null;
        }
        function hideLinkInput() {
            linkInput.style.flexGrow = '';
            linkInput.style.padding = '0';
            linkInput.style.border = '0';
            linkInput.style.opacity = '0';
            linkInput.style.width = '0';
            linkInput.value = '';
        }

        const linkInput = document.createElement('input');
        linkInput.setAttribute('type', 'url');
        linkInput.setAttribute('class', 'input-group-addon form-control');
        linkInput.style.border = '0';
        buttonGroup.appendChild(linkInput)

        const createButton = document.createElement('button');
        createButton.setAttribute('class', 'btn btn-default');
        createButton.innerText = 'Confirm';
        buttonGroup.appendChild(createButton);
        createButton.addEventListener('click', ($event) => {
            $event.preventDefault();

            let submitMMData = new FormData
            submitMMData.append('embedLink', null);
            submitMMData.append('mmPost', null);

            if (addMMContentEdited.files.length !== 0) {
                if (linkInput.value.trim().length === 0) {
                    submitMMData.append('file', addMMContentEdited.files[0]);
                    submitMMData.append('embed', false)
                } else {
                    errorParagOnTop.innerText = 'You can only provide link, or upload video or picture.'
                    return
                }
            }
            if (linkInput.value.trim().length !== 0) {
                if (addMMContentEdited.files.length === 0) {
                    submitMMData.delete('embedLink');
                    if (linkInput.value.indexOf('https://www.youtube.com') >= 0) {
                        let newLink = linkInput.value.replace('/watch?v=', '/embed/');
                        submitMMData.append('embedLink', newLink);
                        submitMMData.append('embed', true);
                    } else if (linkInput.value.indexOf('https://youtu.be/') >= 0) {
                        let newLink = linkInput.value.replace('youtu.be/', 'www.youtube.com/embed/');
                        submitMMData.append('embedLink', newLink);
                        submitMMData.append('embed', true);
                    } else if (linkInput.value.indexOf('youtube') && linkInput.value.trim().length < 25) {
                        errorParagOnTop.innerText = 'Provide a valid youtube link video.'
                        return
                    } else {
                        submitMMData.append('embedLink', linkInput.value);
                        submitMMData.append('embed', true);
                    }

                } else {
                    errorParagOnTop.innerText = 'You can only provide link, or upload video or picture.'
                    return
                }
            }
            if (createMMPostTxt.value.trim().length !== 0) {
                if (createMMPostTxt.value.trim().length !== 0) {
                    dataForSubmit = createMMPostTxt.value
                    submitMMData.delete('mmPost');
                    submitMMData.append('mmPost', dataForSubmit);
                } else {
                    dataForSubmit = null;
                }
            }
            if (createMMPostTxt.value.trim().length === 0 && linkInput.value.trim().length === 0 && addMMContentEdited.files.length === 0) {
                errorParagOnTop.innerText = 'You can not create post without any content.'
                createMMPostTxt.focus();
                setTimeout(() => {
                    errorParagOnTop.innerText = '';
                }, 5000);
                return
            }
            let submitEditedMMPost = new FormData;
            submitEditedMMPost.append('embedLink', null);
            submitEditedMMPost.append('mmPost', null);

            if (addMMContentEdited.files.length !== 0) {
                if (linkInput.value.trim().length === 0) {
                    submitEditedMMPost.append('file', addMMContentEdited.files[0]);
                    submitEditedMMPost.append('embed', false)
                } else {
                    errorParagOnTop.innerText = 'You can only provide link, or upload video or picture.'
                    return
                }
            }
            if (linkInput.value.trim().length !== 0) {
                if (addMMContentEdited.files.length === 0) {
                    submitEditedMMPost.delete('embedLink');
                    if (linkInput.value.indexOf('https://www.youtube.com') >= 0) {
                        let newLink = linkInput.value.replace('/watch?v=', '/embed/');
                        submitEditedMMPost.append('embedLink', newLink);
                        submitEditedMMPost.append('embed', true);
                    } else if (linkInput.value.indexOf('https://youtu.be/') >= 0) {
                        let newLink = linkInput.value.replace('youtu.be/', 'www.youtube.com/embed/');
                        submitEditedMMPost.append('embedLink', newLink);
                        submitEditedMMPost.append('embed', true);
                    } else if (linkInput.value.indexOf('youtube') && linkInput.value.trim().length < 25) {
                        errorParagOnTop.innerText = 'Provide a valid youtube link video.'
                        return
                    } else {
                        submitEditedMMPost.append('embedLink', linkInput.value);
                        submitEditedMMPost.append('embed', true);
                    }

                } else {
                    errorParagOnTop.innerText = 'You can only provide link, or upload video or picture.'
                    return
                }
            }
            if (createMMPostTxt.value.trim().length !== 0) {
                if (createMMPostTxt.value.trim().length !== 0) {
                    dataForSubmit = createMMPostTxt.value
                    submitEditedMMPost.delete('mmPost');
                    submitEditedMMPost.append('mmPost', dataForSubmit);
                    if (linkInput.value.trim().length === 0 && addMMContentEdited.files.length === 0) {
                        submitEditedMMPost.append('onlyText', true)
                    }
                } else {
                    dataForSubmit = null;
                    submitEditedMMPost.append('onlyText', null)
                }
            }
            if (createMMPostTxt.value.trim().length === 0 && linkInput.value.trim().length === 0 && addMMContentEdited.files.length === 0) {
                errorParagOnTop.innerText = 'You can not submit post without any content.'
                createMMPostTxt.focus();
                setTimeout(() => {
                    errorParagOnTop.innerText = '';
                }, 5000);
                return
            }
            let chkBoxValue = document.getElementsByName('deleteCheckbox')[0];
            if (chkBoxValue.checked === true) {
                submitEditedMMPost.append('checkBox', true);
            } else if (chkBoxValue.checked === false) {
                submitEditedMMPost.append('checkBox', false);
            }
            submitMMpostEdited(submitEditedMMPost);

            function makeSubmitMMPostEdited(submitEditedMMPost) {
                return new Promise((resolve, reject) => {
                    let request = new XMLHttpRequest();
                    request.open('PUT', mmApi + '/' + editingPostId, true);
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
                    request.send(submitEditedMMPost);
                });
            }
            async function submitMMpostEdited(submitEditedMMPost) {
                try {
                    const requestPromise = makeSubmitMMPostEdited(submitEditedMMPost);
                    const response = await requestPromise;
                    window.location.reload()
                }
                catch (errorResponse) {
                    alert(errorResponse);
                };
            }
        });

        if (multimedia !== null) {
            if (embeding === 0) {
                showMMLabel();
                multimedia = multimedia.toLowerCase()
                firstPart = multimedia.indexOf('/images/') + 8;
                pera = multimedia.substring(multimedia.length - 4)
                secondPart = multimedia.indexOf(pera, firstPart)
                multimedia = multimedia.substring(firstPart, secondPart)
                mmLabel.innerText = multimedia;
            } else if (embeding === 1) {
                displayLinkInput();
                linkInput.value = multimedia;
            }
        }

        const checkDiv = document.createElement('div');
        checkDiv.setAttribute('class', 'md-col-12 chk-div')
        contDiv.appendChild(checkDiv);
        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.setAttribute('name', 'deleteCheckbox');
        checkDiv.appendChild(checkBox)
        const labelCB = document.createElement('label');
        labelCB.setAttribute('for', 'deleteCheckbox');
        labelCB.innerHTML = 'Check ONLY if you want to remove attached media<br> (do not check when replacing)';
        checkDiv.appendChild(labelCB);

        const errorParagOnTop = document.createElement('p');
        errorParagOnTop.setAttribute('id', 'errorParag');
        contDiv.appendChild(errorParagOnTop);
        preventJs()
    }, { once: true });

}