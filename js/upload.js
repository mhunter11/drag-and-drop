$(document).ready(function () {
    $('.uploadBtn').click(function() {
      for (var i = 0; i < theFile.length; i++) {
        var btn = document.getElementsByClassName('imageA');
        getSlug(theFile[i], function(file) {
              //console.groupCollapsed('getSlug callback');
              //console.log(file);
          if (file.slug) {
            uploadFile(file, function(data) {
              //console.groupCollapsed('uploadFile callback: '+data.file.slug, data.file.name);
              //console.lo g(data);
              $(btn).removeClass('btn-danger');
              $(btn).addClass('btn-success');
              $(btn).addClass('noPointEvent');
              $(btn).html('<i class="fa fa-check" aria-hidden="true"></i>');
              return;
            })
          }
          else {
            $(btn).removeClass('btn-danger');
            $(btn).addClass('btn-fail');
          }
        });
      }
    });
  function getSlug(file, callback) {
    var seriesID = file.name.split('_')[0];
    $.ajax({
      type:'POST',
      url: "https://graphiti-dev-live.smithsonianearthtv.com/graph",
      data: '{getSeries(seriesId: "' + seriesID + '") { slug }}',
      cache: false,
      contentType: false,
      processData: false,
      success:
        function(data){
          //check to see if we got a slug and error if not
          file.slug = data.data.getSeries.slug;
          callback(file);
        },
      error:
        function(data){
          callback(data);
        }
    });
  }
  function uploadFile(file, callback) {
    //slug is file.slug
    var fd = new FormData();
        fd.append('file', file);
        $.ajax({
            type:'POST',
            url: "https://kanvas-dev.smithsonianearthtv.com/test/" + file.slug,
            data: fd,
            cache:false,
            contentType: false,
            processData: false,
            success:
              function(data){
                data.file = file;
                callback(data);
              },
            error:
              function(){
                callback(false);
              }
        });
  }
});
