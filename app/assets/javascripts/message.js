$(function(){
  function buildHTML(message){
    var addImage = (message.image !== null) ? `<img class = "lower-message__image", src = "${message.image}">` : ''

    var html = `
    <div class="message">
    <div class="message__upper-info">
    <p class = "message__upper-info__talker">
      ${message.user_name}
    </p>
    <p class="message__upper-info__date">
      ${message.created_at}
    </p>
    </div>
    <div class="message__lower-info">
    <p class="message__text">
      ${message.content}
    </p>
    <p class="lower-message__image">
      ${addImage}
    </p>
    </div> 
    </div>`

    return html;
  }

  $('#new_message').on('submit', function(e){
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
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({'scrollTop':$('.messages')[0].scrollHeight});
      $('#new_message')[0].reset();
    })

    .fail(function(){
      alert('えらー。。。！！');
    })

    .always(function(){
      $('input').removeAttr("disabled");
    })
  })
});