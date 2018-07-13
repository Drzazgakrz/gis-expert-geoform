define(["/gis-expert-geoform/js/tokenUtil.js","application/main", "/gis-expert-geoform/js/resetPassword.js", '/gis-expert-geoform/js/vendor/jquery.min.js'], function (tokenUtil, main, resetPasswordController) {
    var signInController = {
        isSign: false,
        createForm:function(){
            var body = $("body");
            body.empty();
            body.load("/gis-expert-geoform/js/signIn.html",function(){
                $("#loginButton").on('click',function () {
                    signInController.logowanie();
                });
                $("#returnButton").on('click',function () {
                    location.href = "/gis-expert-geoform/";
                });
                $("#forgotPasswordLink").on('click',function () {
                     resetPasswordController.createForm(signInController);
                });
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
                        console.log(signInController.isSignNow());
                        console.log("svrythrw6");
                        location.href="/gis-expert-geoform/";
                        tokenUtil.setCookie("token", data.token, 4);
                       /* signInController.user = {
                             name: data.firstname + " " + data.lastname,
                             id: data.token,
                             org: "gisExpert",
                             canSubmit: true
                         };

                         tokenUtil.setCookie("token", data.token, 4);*/

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
        isSignNow: function () {
           return signInController.isSign;
        },
        signOut: function () {
            signInController.isSign=false;
            //var token = tokenUtil.getCookie('token');
            tokenUtil.eraseCookie("token");
          /*  $.ajax({
                url: "http://localhost:8080/ankieta-web/rest/auth/signOut/token="+token,
                type: "GET",
                contentType: 'application/json',
                /!*beforeSend: function(xhr) {
                    xhr.setRequestHeader("token", token);
                },*!/
                success: (function (data) {
                    location.reload();
                }),
                error: (function (xhr, ajaxOptions, thrownError) {
                    location.reload();
                })
            });*/
            location.href="/gis-expert-geoform/";
        }
    };
    return signInController;
});