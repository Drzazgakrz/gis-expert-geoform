define(['application/main','/gis-expert-geoform/js/vendor/jquery.min.js'], function (main) {
    var resetPasswordController = {
        createForm: function (signInController) {
            var body = $("body");
            body.empty();
            body.load("/gis-expert-geoform/js/resetPassword.html", function () {
                $("#resetButton").on('click', function () {
                    resetPasswordController.resetPassword();
                });
                $("#returnButton").on('click', function () {
                    console.log(signInController);
                    signInController.createForm();
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
                });
            }
        }

    };
    return resetPasswordController;
});