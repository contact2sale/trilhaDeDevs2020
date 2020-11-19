$(document).ready(function() {
 $('form').submit(function (evt) {
    evt.preventDefault();
    var $searchField = $('#search');
    var $submitButton = $('#submit');
   
   $searchField.prop("disable", true);
   $submitButton.prop("disable", true).val("searching...");

    // the AJAX part
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var search = $searchField.val();
    var flickrOptions = {
      tags: search,
      format: "json"
    };

    $.getJSON(flickerAPI, flickrOptions, displayPhotos);

  }); // end click

  function displayPhotos(data) {
    var photoHTML = '<ul>';
    $.each(data.items,function(i,photo) {
      photoHTML += '<li class="grid-25 tablet-grid-50">';
      photoHTML += '<a href="' + photo.link + '" class="image">';
      photoHTML += '<img src="' + photo.media.m + '"></a></li>';
    }); // end each
    photoHTML += '</ul>';
    $('#photos').html(photoHTML);
    $searchField.prop("disabled", false);
     $submitButton.prop("disabled", false).val("Search");
  }
}); // end ready