$(document).ready(() => {
  $(".register").on("click", function() {
    $(".registerMessage").empty();
    let data = {
      name: $(".registerName").val(),
      email: $(".registerEmail").val(),
      password: $(".registerPassword").val(),
      password2: $(".password2").val(),
    };
    $.ajax({
      type: "POST",
      url: "/register",
      data: data,
    }).then(function(response) {
      console.log(response);
      if (response.length > 0) {
        $(".registerMessage").append(
          `<div class="alert alert-danger" role="alert">
                            ${response[0].text}
                        </div`
        );
      } else {
        $(".registerMessage").append(`
                    <div class="alert alert-success" role="alert">
                        Registration successful! Please Login
                    </div`);
      }
    });
  });

  $("#fpButton").on("click", function() {
    $.ajax({
      type: "POST",
      url: "/user/forgot-password",
      data: {
        email: $("#emailFp").val(),
      },
    }).then((response) => {
      $(".forgot-message").show();
      $("#forgotPasswordForm").remove();
    });
  });

  $("#rpButton").on("click", function() {
    $.ajax({
      type: "POST",
      url: "/user/reset-password",
      data: {
        password1: $("#rpPassword1").val(),
        password2: $("#rpPassword2").val(),
        email: $("#emailRp").val(),
        token: $("#tokenRp").val(),
      },
    }).then((response) => {
      console.log(response);
      if (response.status === "ok") {
        $(".reset-message")
          .removeClass("alert-danger")
          .addClass("alert-success")
          .show()
          .text(response.message);
        $("#action").html('<a style="color: white" href="/">Log In</a>');
        $("#resetPasswordForm").remove();
      } else {
        $(".reset-message")
          .removeClass("alert-success")
          .addClass("alert-danger")
          .show()
          .text(response.message);
        $("#action").html(
          '<a style="color: white" href="/forgot-password">Reset Password</a>'
        );
      }
    });
  });
});
