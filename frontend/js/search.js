const postSeacrhApi = 'http://127.0.0.1:3000/api/posts';

const searchInput = document.getElementById('searchInput');
const searchArea = document.getElementById('searchOption');

searchInput.value = ''
let searchInputVal;
let delayTimer;

searchInput.addEventListener('input', ($event) => {
    $event.preventDefault();
    searchInputVal = searchInput.value.trim();
    searchAreaOption = searchArea.options[searchArea.selectedIndex].value
});

searchInput.addEventListener('keyup', () => {
    clearTimeout(delayTimer);
    if (searchInputVal !== '' || searchInputVal !== null || searchInputVal !== undefined) {
        delayTimer = setTimeout(
            () => {
                submitMMFormData(
                    ({ searchInputVal, searchAreaOption }),
                    ('POST'),
                    (postSeacrhApi + '/search')
                ).then(
                    resp =>
                        searchResult(resp)
                )
            }, 1000
        );
    }
    if (document.getElementById('searchInputDiv').children.length > 2) {
        document.getElementById('searchInputDiv').children[2].remove();
    }
});

searchInput.addEventListener('keydown', () => {
    clearTimeout(delayTimer);
});

$(function () {
    $("body").click(function (e) {
        if (e.target.id == "searchInputDiv" || $(e.target).parents("#searchInputDiv").length) {
        } else {
            searchInput.value = '';
            for (let i = 2; i < document.getElementById('searchInputDiv').children.length; i++) {
                document.getElementById('searchInputDiv').removeChild(document.getElementById('searchInputDiv').lastChild)
            }
        }
    });
});

function searchResult(resultResponse) {
    let searchList = document.getElementById('searchInputDiv');

    searchListGroup = document.createElement('ul');
    searchListGroup.setAttribute('class', 'list-group');
    searchList.appendChild(searchListGroup);
    if (resultResponse.foundTitle !== null) {
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
        } else {
            let listItem = document.createElement('li');
            listItem.setAttribute('class', 'list-group-item');
            searchListGroup.appendChild(listItem);
            listItem.innerText = 'Post not found'
        }
    } else if (resultResponse.foundUser !== null) {
        if (resultResponse.foundUser.length !== 0) {
            for (let i = 0; i < resultResponse.foundUser.length; i++) {
                let listItem = document.createElement('li');
                listItem.setAttribute('class', 'list-group-item');
                searchListGroup.appendChild(listItem);
                let listLink = document.createElement('a');
                listLink.setAttribute('href', '/frontend/profile.html?' + resultResponse.foundUser[i].userId);
                listLink.innerText = resultResponse.foundUser[i].username;
                listItem.appendChild(listLink)
            }
        } else {
            let listItem = document.createElement('li');
            listItem.setAttribute('class', 'list-group-item');
            searchListGroup.appendChild(listItem);
            listItem.innerText = 'User not found'
        }
    }
}