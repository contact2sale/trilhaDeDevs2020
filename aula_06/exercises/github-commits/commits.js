function loadCommits() {
  let username = $("#username").val();
  let repo = $("#repo").val();

  $("#commits").empty();

  const url = `https://api.github.com/repos/${username}/${repo}/commits`;

  $.get(url)
    .then((commits) => {
      let $ul = $("#commits");

      commits.forEach((x) => {
        let $li = $("<li>");
        $li.text(`${x.commit.author.name}: ${x.commit.message}`);
        $ul.append($li);
      });
    })
    .catch((error) => {
      let $ul = $("#commits");
      let $li = $("<li>");
      $li.text(`Error: ${error.status} (${error.statusText})`);
      $ul.append($li);
    });
}
