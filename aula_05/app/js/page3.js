$(document).ready(function () {
  $("#myform").submit(function (e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.
  
    var form = $(this);
  
    $.ajax({
      type: "POST",
      url: "https://5fb3fdf5e473ab0016a16041.mockapi.io/api/v1/users",
      data: form.serialize(), // serializes the form's elements.
      success: function (data) {
        if(data.id) {
          alert('Criado com sucesso');
          location.reload();
        }
        console.log(data); // show response from the php script.
      },
    });
  });
});
