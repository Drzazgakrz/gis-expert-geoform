define(["/gis-expert-geoform/js/main.js","/gis-expert-geoform/js/signIn.js",'/gis-expert-geoform/js/vendor/jquery.min.js'], function (main,signInController) {
    var resetPasswordController = {
        createForm: function () {
            var body = $("body");
            body.empty();
            $('head').append('<link rel="stylesheet" type="text/css" href="css/resetPassword.css">');
            body.load("/gis-expert-geoform/js/resetPassword.html", function () {
                $("#resetButton").on('click', function () {
                    console.log("huerh");
                    resetPasswordController.resetPassword();
                });
                $("#returnButton").on('click', function () {
                    resetPasswordController.createSignInForm();
                });
            });
        },


        resetPassword: function() {
            var email = $("#email").val();
            if (email === '') {
                $("#errorEmailIsEmpty").attr("style", "display:inline");
                $("#errorEmailIsWrong").attr("style", "display:none");
            } else {
                $("#errorEmailIsEmpty").attr("style", "display:none");
            }

            if (email != '') {

                $.ajax({//zmiana na localhosta

                    url: "http://localhost:8080/ankieta-web/rest/auth/resetPassword",
                    dataType: "json",
                    type: "POST",
                    contentType: 'application/json',
                    data: JSON.stringify({
                        username: email
                    }),
                    success: (function (data) {
                        $("#errorEmailIsWrong").attr("style", "display:none");
                    }),
                    error: (function (data) {
                        $("#errorEmailIsWrong").attr("style", "display:inline");
                    })
                })
            }
        },
        createSignInForm:function(){
            signInController.createForm();
        },
    };
    return resetPasswordController;
});