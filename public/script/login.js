$(function () {
  $('.loginFormInner form').on('submit', function (evt) {
    evt.preventDefault();
    const action = $(this).attr('action');
    $.ajax({
      url: action,
      type: 'POST',
      data: $(this).serialize(),
      success: function (data) {
        if (data.success && data.state == "200") {
          alert("验证成功");
          window.location = "/";
        } else {
          alert("密码错误");
        }
      },
      error: function () {
        alert("登录失败");
      }
    })
  })
})