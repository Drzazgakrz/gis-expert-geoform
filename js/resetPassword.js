
function resetPassword() {
    var email= $("#email").val();
    if (email === '') {
        $("#errorEmailIsEmpty").attr("style", "display:inline");
        $("#errorEmailIsWrong").attr("style", "display:none");
    } else {$("#errorEmailIsEmpty").attr("style", "display:none");}

    if (email != '' ) {

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
}
