function registerUser() {
    resetErrors();
    var errors = validateData();
    if (Object.keys(errors).length!== 0) {
        showErrors(errors);
        return;
    }
    var validatedData = {
        firstname: document.getElementById("name").value,
        lastname: document.getElementById("lastName").value,
        username: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmpassword").value,
        address: {
            street: document.getElementById("street").value,
            phone: document.getElementById("phone").value,
            buildingNumber: document.getElementById("buildNr").value,
            flatNumber: document.getElementById("aptNr").value,
            zipCode: document.getElementById("zipCode").value,
            city: document.getElementById("city").value
        }
    };
    register(validatedData);
}
function showErrors(errors){
    console.log(errors);
    Object.keys(errors).map(function(key, index) {
        console.log(key);
        document.getElementById(key + 'Error').innerHTML = errors[key];
    });
}
function resetErrors() {
    document.getElementById("nameError").innerHTML = "";
    document.getElementById("lastNameError").innerHTML = "";
    document.getElementById("usernameError").innerHTML = "";
    document.getElementById("phoneError").innerHTML = "";
    document.getElementById("cityError").innerHTML = "";
    document.getElementById("streetError").innerHTML = "";
    document.getElementById("buildingNumberError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("confirmationError").innerHTML = "";
    document.getElementById("zipCodeError").innerHTML = "";
}
    function validateData() {
        var errors = {};
        var name = document.getElementById("name");
        if (!name.value.match(name.pattern)) {
            errors.name = "Niepoprawne imię. Imię powinno zaczynać się z dużej litery, pozostałe małe";
        }
        var lastName = document.getElementById("lastName");
        if (!lastName.value.match(lastName.pattern)) {
            errors.lastName = "Niepoprawne nazwisko. Nazwisko powinno zaczynać się z dużej litery, pozostałe małe";
        }
        var email = document.getElementById("email");
        if (!email.value.match(email.pattern)) {
            errors.username = "Niepoprawny mail. mail powinien kończyć się @nazwa_domeny np @gmail.com";
        }
        var password = document.getElementById("password");
        var confirmpassword = document.getElementById("confirmpassword");
        if (password.value.length<6) {
            errors.password = "Niepoprawne hasło. Powinien mieć co najmniej 6 znaków";
        }
        if( password.value !== confirmpassword.value){
            errors.confirmation = "Hasła się nie zgadzają";
        }
        var phone = document.getElementById("phone").value;
        if (!phone.match("(^[0-9]{9,11}$)")){
            errors.phone = "Niepoprawny numer. Numer powinien mieć 9-11 cyfr";
        }
        var street = document.getElementById("street").value;
        if (!street.match("(^[A-Z ÀÁÂÃÄÅ ĄŻŹ ÒÓÔÕÖØ Ł Ć ĘŚ Ń ÈÉÊË Ç ÌÍÎÏ ÙÚÛÜ Ñ]{1})([a-zàáâãäåąźżòóÓłćęśńôõöøèéêëçìíîïùúûüÿñ]{2,29}$)")){
            errors.street = "Niepoprawna nazwa ulicy. Nazwa powinna się zaczynać z duzej litery a reszta mała";
        }
        var buildingNumber = document.getElementById("buildNr").value;
        if (!buildingNumber.match("(^[0-9]{1,5}$)")){
            errors.buildingNumber = "Niepoprawny numer budynku. Numer powinien być nieujemny";
        }
        var flatNumber = document.getElementById("aptNr").value;
        if (!flatNumber.match("(^[0-9]{0,5}$)")&& flatNumber!==""){
            errors.flatNumber = "Niepoprawy numer budynku";
        }
        var zipCode = document.getElementById("zipCode").value;
        if(!zipCode.match("(^[0-9]{2}-?[0-9]{3}$)")){
            errors.zipCode = "Niepoprawny kod pocztowy. Numer powinien być nieujemny";
        }
        var city = document.getElementById("city").value;
        if(!city.match("(^[A-Z ÀÁÂÃÄÅ ĄŻŹ ÒÓÔÕÖØ Ł Ć ĘŚ Ń ÈÉÊË Ç ÌÍÎÏ ÙÚÛÜ Ñ ]{1})([a-zàáâãäåąźżòóÓłćęśńôõöøèéêëçìíîïùúûüÿñ]{2,29}$)")){
            errors.city = "Niepoprawna nazwa miasta. Nazwa powinna się zaczynać z duzej litery a reszta mała";
        }
        return errors;
}
function register(data) {
    $.ajax({
        url: 'http://localhost:8080/ankieta-web/rest/auth/register',
        type: 'POST',
        contentType: "application/json",
        dataType: 'json',
        success: (function (data) {
            console.log(data);
            //$.publish('register-success');
        }),
        error: (function (xhr, ajaxOptions, thrownError) {
            console.log(xhr);
            try {
                if (xhr.statusText.toLocaleLowerCase() === 'bad request')
                    showErrors(JSON.parse(JSON.parse(xhr.responseText).message));
                else {
                    if (xhr.responseText === undefined)
                        register_controller.showServerError("Błąd połączenia z serwerem");
                    else
                        register_controller.showServerError(JSON.parse(xhr.responseText).message);
                }
            }
            catch (e) {
                register_controller.showServerError("Nastąpił niezidentyfikowany błąd. Prosimy o kontakt z administracją");
            }
        }),
        data: JSON.stringify(data)
    });
}