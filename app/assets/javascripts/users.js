$(function(){

function appendUser(user){
  let html = `
            <div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user.name}</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</div>
            </div>
            `;
            $("#user-search-result").append(html)
          }
          
function appendNoUser(){
  let html = `
            <div class="chat-group-user clearfix">
            <p class="chat-group-user__name">ユーザーが見つかりません</p>
            </div>
            `;
            $("#user-search-result").append(html)
          }







  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val()
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json',
    })
    .done(function(users){
      $("#user-search-field").empty();

      if (users.length !== 0) {
      users.forEach(function(user){
        appendUser(user);
    });
  } else if (input.length == 0) {
    return false;
  } else {
      appendNoUser();
    }
  })

    .fail(function(){
      alert("ユーザー検索失敗");
    });
  });
});