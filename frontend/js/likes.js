function submitPostLike(like) {
    
    submitFormData(like);

    function makeRequestLike(like) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.withCredentials = true;
            request.open('POST', api + '/:id/likes');
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
            request.send(JSON.stringify(like));
        });
    }
    async function submitFormData(like) {
        try {
            const requestPromise = makeRequestLike(like);
            const response = await requestPromise;
            responseId = (JSON.parse(response));
        }
        catch (errorResponse) {
            alert(errorResponse);
        };
    }
}