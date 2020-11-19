function loadRepos() {
    let username = $('#username').val();
    const url = `https://api.github.com/users/${username}/repos`;

    $.ajax({
        method: 'GET',
        url: url,
        success: onSuccess,
        error: onError
    });
}

function onSuccess(data) {
    $('#repos').empty();

    data.forEach(repo => {
        let $li = $('<li>');
        let $a = $('<a>').text(repo.full_name).attr('href', repo.html_url);
        $li.append($a);
        $('#repos').append($li);
    });
}

function onError() {
    $('#repos').append(`<li>Error</li>`);
}