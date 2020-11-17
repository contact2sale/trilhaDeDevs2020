$(document).ready(function () {
  $("#myform").submit(function (e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    console.log(form.serialize());

    $.ajax({
      type: "POST",
      url: "https://5fb3fdf5e473ab0016a16041.mockapi.io/api/v1/users",
      success: function(response) {
        console.log(response);

      },
      error: function() {
        alert('Deu errado')
      },
      data: form.serialize(),
    })
  });
});
