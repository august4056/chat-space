$(function(){
  function buildHTML(message){
    var html = `<div class="message">
  <div class="message__upper-info">
    <p class="message__upper-info__talker">
      ${message.user.name}
    </p>
    <p class="message__upper-info__date">
      ${message.created_at.strftime("%Y/%m/%d %H:%M") }
    </p>
  </div>
  <div class="message__lower-info">
  
//   // imageがある場合？↓

//     ${if message.content.present }
//       <p class="message__text">
//         ${ message.content }
//       </p>
//       ${ end }
//       ${ image_tag message.image.url, class: 'lower-message__image' if message.image.present? }
//   </div>
// </div>


    
    `
    return html;

  }


  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(messages){
      var html = buildHTML(messages);
      $('.message').append(html);
      $('.input-box__text').val('');
      $('.submit-btn').prop('disabled',false);
    })
    .fail(function(){
      alert('error');
    })
  })
});