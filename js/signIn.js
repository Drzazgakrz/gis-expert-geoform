define(["/gis-expert-geoform/js/tokenUtil.js","/gis-expert-geoform/js/main.js", "/gis-expert-geoform/js/resetPassword.js", '/gis-expert-geoform/js/vendor/jquery.min.js'], function (tokenUtil, main, resetPasswordController) {
    var signInController = {
        isSign: false,
        createForm:function(){
            var body = $("body");
            body.empty();
            $('head').append('<link rel="stylesheet" type="text/css" href="css/signIn.css">');
            body.load("/gis-expert-geoform/js/signIn.html",function(){
                $("#loginButton").on('click',function () {
                    signInController.logowanie();
                });
                $("#returnButton").on('click',function () {
                    location.href = "/gis-expert-geoform/index.html";
                });
                $("#forgotPasswordLink").on('click',function () {
                    resetPasswordController.createForm();
                    console.log(main);
                    console.log(main);
                })
            });
        },
        logowanie: function () {
            var login = $("#login").val();
            var password = $("#password").val();
            if (login === '') {
                $("#errorLoginIsEmpty").attr("style", "display:inline");
            } else $("#errorLoginIsEmpty").attr("style", "display:none");
            if (password === '') {
                $("#errorPasswordIsEmpty").attr("style", "display:inline");
            } else $("#errorPasswordIsEmpty").attr("style", "display:none");

            if (login != '' && password != '') {

                $.ajax({//zmiana na localhosta

                    url: "http://localhost:8080/ankieta-web/rest/auth/getToken",
                    dataType: "json",
                    type: "POST",
                    contentType: 'application/json',
                    data: JSON.stringify({
                        username: login,
                        password: password
                    }),
                    success: (function (data) {
                        $("#errorLoginIsWrong").attr("style", "display:none");
                        $("#errorPasswordIsWrong").attr("style", "display:none");

                        signInController.isSign=true;

                        //console.log(this.isSignNow());
                        /* signIn.loggedIn = true;
                         signIn.currentProvider = "gisExpert";
                         signIn.user = {
                             name: data.firstname + " " + data.lastname,
                             id: data.token,
                             org: "gisExpert",
                             canSubmit: true
                         };
                         // Update the calling app
                         tokenUtil.setCookie("token", data.token, 4);
                         signIn.statusCallback(signIn.notificationSignIn);*/
                    }),
                    error: (function (data) {
                        //console.log(data);
                        if (data.responseJSON.message === "Konto o podanym adresie E-Mail nie istnieje") {
                            $("#errorLoginIsWrong").attr("style", "display:inline");
                        } else $("#errorLoginIsWrong").attr("style", "display:none");

                        if (data.responseJSON.message === "Autoryzacja nie powiodła się") {
                            $("#errorPasswordIsWrong").attr("style", "display:inline");
                        }
                    })
                });
            }
        },
      ignNow: function () {
           return signInController.isSign;
        }
    };
    return signInController;
});