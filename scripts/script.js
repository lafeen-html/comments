let comments = [];
let messageName = document.getElementById('message-name');
let messageComment = document.getElementById('message-comment');
let commentName = document.getElementById('comment-name');
let commentBody = document.getElementById('comment-body');
loadComments();


commentName.addEventListener('keydown', function (commentName) {
    deleteMessages(commentName.target);
});

commentBody.addEventListener('keydown', function (commentBody) {
    deleteMessages(commentBody.target);
});

document.getElementById('comment-add').onclick = function (event) {
    event.preventDefault();
    let commentDate = document.getElementById('comment-date');

    if (commentName.value == "") {
        showMessageName();
    } else if (commentName.value.length <= 2) {
        showSymbolLimit();
    } else if (commentBody.value == "") {
        showMessageComment();
    } else {
        deleteMessages();
        swal({
            title: "Спасибо!",
            text: "Ваш комментарий добавлен!",
            icon: "success",
            button: "Ок",
        });
        if (commentDate.value != '') {
            let date = new Date(commentDate.value);
            let comment = {
                name: commentName.value,
                body: commentBody.value,
                date: timeConverter(date),
            }

            commentName.value = '';
            commentBody.value = '';
            commentDate.value = '',

            comments.push(comment);
            saveComments();
            showComments();
        } else {
            let date = new Date();
            let comment = {
                name: commentName.value,
                body: commentBody.value,
                date: timeConverter(date),
            }

            commentName.value = '';
            commentBody.value = '';
            commentDate.value = '',

            comments.push(comment);
            saveComments();
            showComments();
        }
    }
}

document.getElementById('comment-field').addEventListener('click', function (e) {
    if (e.target.matches('.alert-danger')) {
        e.preventDefault();
        deleteComments(e.target);
    }
})


function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments() {
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function (item) {
        out += `
        <div class="comment">
            <p class="alert-date">${item.date}</p>
            <p class="alert-ptimary">${item.name}</p>
            <p class="alert-success">${item.body}</p>
            <a href="#" class="alert-danger" role="alert" data-time=${item.date}></a>
            <button class="button-like" onclick="likeComments(this)">.</button>
        </div>
        `;
    });
    commentField.innerHTML = out;
}

function likeComments(likeComment) {
    likeComment.classList.toggle("thumbs-up");
}

function deleteComments(deleteButton) {
    comments.splice(comments.findIndex(i => i.date == deleteButton.getAttribute('data-time')), 1);
    deleteButton.closest('div').remove();
    saveComments();
}

function timeConverter(date) {
    let now = new Date();
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (now.getDate() == date.getDate()) {
        return ('сегодня' + ', ' + now.toLocaleTimeString().slice(0, 5));
    } else if (yesterday.getDate() === date.getDate()) {
        return ('вчера' + ', ' + yesterday.toLocaleTimeString().slice(0, 5));
    } else {
        return convertDate(date);
    }
}

function convertDate(date) {
    var date = new Date(date),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    var time = new Date();
    var loctime = time.toLocaleTimeString().slice(0, 5);
    return [day, mnth, date.getFullYear()].join(".") + ' ' + loctime;
}

function showMessageName() {
    let out = `
    <p class="enter-name">Заполните имя!</p>
    `;
    messageName.innerHTML = out;
}

function showSymbolLimit() {
    let out = `
    <p class="enter-name">Введите более двух символов!</p>
    `;
    messageName.innerHTML = out;
  }

function showMessageComment() {
    let out = `
    <p class="enter-comment">Заполните комментарий!</p>
    `;
    messageComment.innerHTML = out;
}

function deleteMessages() {
    messageName.innerHTML = '';
    messageComment.innerHTML = '';
}