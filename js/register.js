define(['/gis-expert-geoform/js/vendor/jquery.min.js','https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'],function(){
    var registerController = {
        createForm: function () {
            var container = $("body");
            container.empty();
            container.load("/gis-expert-geoform/js/registration.html", function () {
                $("#registerButton").on('click', function () {
                    registerController.registerUser();
                });
                $("#back").on('click', function () {
                    location.href = "/gis-expert-geoform/";
                });
            });
        },
        registerUser: function () {
            this.resetErrors();
            var errors = this.validateData();
            if (Object.keys(errors).length !== 0) {
                this.showErrors(errors);
                return;
            }
            var validatedData = {
                firstname: document.getElementById("name").value,
                lastname: document.getElementById("lastName").value,
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                confirmPassword: document.getElementById("confirmpassword").value,
                address: {
                    street: document.getElementById("street").value,
                    phone: document.getElementById("phone").value,
                    buildingNumber: document.getElementById("buildingNumber").value,
                    flatNumber: document.getElementById("flatNumber").value,
                    zipCode: document.getElementById("zipCode").value,
                    city: document.getElementById("city").value
                }
            };
            this.register(validatedData);
        },

        showErrors: function (errors) {
            if (document.getElementById("password").value !== document.getElementById("confirmpassword").value) {
                errors.confirmpassword = "Hasła się nie zgadzają";
            }
            Object.keys(errors).map(function (key, index) {
                console.log(key);
                document.getElementById(key + 'Error').innerHTML = errors[key];
            });
        },

        resetErrors: function () {
            document.getElementById("nameError").innerHTML = "";
            document.getElementById("lastNameError").innerHTML = "";
            document.getElementById("usernameError").innerHTML = "";
            document.getElementById("phoneError").innerHTML = "";
            document.getElementById("cityError").innerHTML = "";
            document.getElementById("streetError").innerHTML = "";
            document.getElementById("buildingNumberError").innerHTML = "";
            document.getElementById("passwordError").innerHTML = "";
            document.getElementById("confirmpasswordError").innerHTML = "";
            document.getElementById("zipCodeError").innerHTML = "";
            document.getElementById("flatNumberError").innerHTML = "";
        },

        data: {
            name: "Niepoprawne imię. Imię powinno zaczynać się z dużej litery, pozostałe małe",
            lastName: "Niepoprawne nazwisko. Nazwisko powinno zaczynać się z dużej litery, pozostałe małe",
            username: "Niepoprawny mail. mail powinien kończyć się @nazwa_domeny np @gmail.com",
            password: "Niepoprawne hasło. Powinien mieć co najmniej 6 znaków",
            phone: "Niepoprawny numer. Numer powinien mieć 9-11 cyfr",
            street: "Niepoprawna nazwa ulicy. Nazwa powinna się zaczynać z duzej litery a reszta mała",
            buildingNumber: "Niepoprawny numer budynku. Numer powinien być nieujemny",
            flatNumber: "Niepoprawy numer mieszkania",
            zipCode: "Niepoprawny kod pocztowy. Numer powinien być nieujemny",
            city: "Niepoprawna nazwa miasta. Nazwa powinna się zaczynać z duzej litery a reszta mała"
        },
        validateData: function () {
            var errors = {};
            var keys = Object.keys(this.data);
            for (var i = 0; i < keys.length; i++) {
                var input = document.getElementById(keys[i]);
                if (!input.value.match(input.pattern)) {
                    errors[keys[i]] = this.data[keys[i]];
                }
            }
            return errors;
        },

        register: function (data) {
            $.ajax({
                url: 'http://localhost:8080/ankieta-web/rest/auth/register',
                type: 'POST',
                contentType: "application/json",
                dataType: 'json',
                success: (function (data) {
                    location.reload();
                }),
                error: (function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr);
                    if (xhr.statusText.toLocaleLowerCase() === 'bad request')
                        registerController.showErrors(JSON.parse(JSON.parse(xhr.responseText).message));

                }),
                data: JSON.stringify(data)
            });
        }
    };
    return registerController;
});