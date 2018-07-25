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
                        console.log(data);
                        $("#errorLoginIsWrong").attr("style", "display:none");
                        $("#errorPasswordIsWrong").attr("style", "display:none");
                        signInController.isSign=true;
                        console.log(signInController.isSignNow());
                        tokenUtil.setCookie("token", data.token, 4);
                        tokenUtil.setCookie("username",data.username,4);
                        tokenUtil.setCookie("zglaszajacy",data.firstname + " "+ data.lastname,4);
                        location.href="/gis-expert-geoform/";
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
            $.ajax({
                url: "http://localhost:8080/ankieta-web/rest/auth/signOut",
                type: "GET",
                contentType: 'application/json',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("token", tokenUtil.getCookie("token"));

                },
                success: (function (data) {
                    tokenUtil.eraseCookie("token");
                    tokenUtil.eraseCookie("username");
                    tokenUtil.eraseCookie("zglaszajacy");

                    location.reload();
                }),
                error: (function (xhr, ajaxOptions, thrownError) {
                    location.reload();
                })
            });
            tokenUtil.eraseCookie("token");
            tokenUtil.eraseCookie("username");
            tokenUtil.eraseCookie("zglaszajacy");
            location.href="/gis-expert-geoform/";
        },
        getMap: function(){
            $.ajax({
                contentType: "application/json",
                method: "POST",
                url: 'http://localhost/gis-expert-geoform/viewer.html?webmap=516d939901dc40fa8f116efa9b59dfbf',
                json: true,
                form: {
                    f: 'json',
                    token: token,
                },
                success: function (result, status, xhr) {
                    location.href = "http://damian-galan.maps.arcgis.com/apps/GeoForm/index.html?appid=0aee2b084e334f738175231019c3f82d"
                },
                error: function (error, response, body) {
                    console.log(body);
                }
            });
        }
    };
    return signInController;
});