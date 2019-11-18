$(function(){
  function buildHTML(message){
    var addImage = (message.image !== null) ? `<img class = "lower-message__image", src = "${message.image}">` : '';

    var html =`
    <div class="message" data-message-id="${message.id}">
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
  };

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
      $('.messages').animate({'scrollTop':$('.messages')[0].scrollHeight}, 'fast');
      $('#new_message')[0].reset();
    })

    .fail(function(){
      alert('えらー！');
    })

    .always(function(){
      $('input').removeAttr("disabled");
    })
  });


    var reloadMessages = function(){
      if (window.location.href.match(/\/groups\/\d+\/messages/)){

        var last_message_id = $('.message:last').data("message-id");

      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id},
      })

      .done(function(messages){
        if (messages.length > 0 ){
        
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      }
      })
      .fail(function(){
        alert('えらーaa');
      });
    }
  };
    setInterval(reloadMessages, 7000);
});