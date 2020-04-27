const postSeacrhApi = 'http://127.0.0.1:3000/api/posts';

const searchInput = document.getElementById('searchInput');
searchInput.value = ''
let searchInputVal;
let delayTimer;
searchInput.addEventListener('input', ($event) => {
    $event.preventDefault();
    searchInputVal = searchInput.value.trim();
});
searchInput.addEventListener('keyup', () => {
    clearTimeout(delayTimer);
    if (searchInputVal !== '' || null || undefined) {
        delayTimer = setTimeout(() => { searchDB({ searchInputVal }) }, 1000);
    }
    if(document.getElementById('searchInputDiv').children.length>2){
        document.getElementById('searchInputDiv').children[2].remove();
    }
});
searchInput.addEventListener('keydown', () => {
    clearTimeout(delayTimer);
})
let resultResponse;
function makeSearchRequest(searchInputVal) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open('POST', postSeacrhApi + '/search');
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 400) {
                    resolve(request.response);
                    resultResponse = request.response;
                    resultResponse = JSON.parse(resultResponse)
                    searchResult();
                } else {
                    reject(request.response);
                }
            }
        };
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(searchInputVal));
    });
}

async function searchDB(searchInputVal) {
    try {
        const requestPromise = makeSearchRequest(searchInputVal);
        const response = await requestPromise;
        responseId = (JSON.parse(response));
        //location.reload()
    }
    catch (errorResponse) {
        alert(errorResponse);
    };
}

function searchResult() {
    let searchList = document.getElementById('searchInputDiv');

    searchListGroup = document.createElement('ul');
    searchListGroup.setAttribute('class', 'list-group');
    searchList.appendChild(searchListGroup);
    if (resultResponse.foundTitle.length !== 0) {
        for (let i = 0; i < resultResponse.foundTitle.length; i++) {
            let listItem = document.createElement('li');
            listItem.setAttribute('class', 'list-group-item');
            searchListGroup.appendChild(listItem);
            let listLink = document.createElement('a');
            listLink.setAttribute('href', '/frontend/post.html?' + resultResponse.foundTitle[i].postId);
            listLink.innerText = resultResponse.foundTitle[i].postTitle;
            listItem.appendChild(listLink)
        }
    }else{
        let listItem = document.createElement('li');
            listItem.setAttribute('class', 'list-group-item');
            searchListGroup.appendChild(listItem);
            listItem.innerText = 'Post not found'
    }
}

