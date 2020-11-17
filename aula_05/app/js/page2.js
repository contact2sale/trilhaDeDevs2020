function getUsers() {
  $.ajax({
    url: 'https://5fb3fdf5e473ab0016a16041.mockapi.io/api/v1/users',
    success: renderUsers,
    type: "GET",
    error: function() {
      alert('Api não localizada')
    }
  });
}

function renderUsers(response) {
  response.reverse().forEach(function(item){
    $("table tbody").append(`
        <tr>
        <th scope="row">${item.id}</th>
        <td>${item.name}</td>
        <td>${item.jobTitle}</td>
        <td>${item.email}</td>
        <td><img src="${item.avatar}"></td>
      </tr>
    `);
  })
}

getUsers();