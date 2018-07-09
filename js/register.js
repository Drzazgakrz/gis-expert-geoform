function registerUser() {
    var errors = validateData();
    if(Object.keys(errors).length!==0){
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

    function validateData() {
        var errors = {};
        var name = document.getElementById("name");
        if (!name.value.match(name.pattern)) {
            errors.firstname = name.value;
        }
        var lastName = document.getElementById("lastName");
        if (!lastName.value.match(lastName.pattern)) {
            errors.lastname = lastName.value;
        }
        var email = document.getElementById("email");
        if (!email.value.match(email.pattern)) {
            errors.username = email.value;
        }
        var password = document.getElementById("password");
        var confirmpassword = document.getElementById("confirmpassword").value;
        if (password.value.length < 6 || password.value !== confirmpassword) {
            errors.password = password.value;
            errors.confirmPassword = password.value;
        }
        var phone = document.getElementById("phone").value;
        if (!phone.match("(^[0-9]{9,11}$)")){
            errors.phone = phone;
        }
        var street = document.getElementById("street").value;
        if (!street.match("(^[A-Z ÀÁÂÃÄÅ ĄŻŹ ÒÓÔÕÖØ Ł Ć ĘŚ Ń ÈÉÊË Ç ÌÍÎÏ ÙÚÛÜ Ñ]{1})([a-zàáâãäåąźżòóÓłćęśńôõöøèéêëçìíîïùúûüÿñ]{2,29}$)")){
            errors.street = street;
        }
        var buildingNumber = document.getElementById("buildNr").value;
        if (!buildingNumber.match("(^[0-9]{1,5}$)")){
            errors.buildingNumber = buildingNumber;
        }
        var flatNumber = document.getElementById("aptNr").value;
        if (!flatNumber.match("(^[0-9]{0,5}$)")&& !flatNumber!==""){
            errors.flatNumber = flatNumber;
        }
        var zipCode = document.getElementById("zipCode").value;
        if(!zipCode.match("(^[0-9]{2}-?[0-9]{3}$)")){
            errors.zipCode = zipCode;
        }
        var city = document.getElementById("city").value;
        if(!city.match("(^[A-Z ÀÁÂÃÄÅ ĄŻŹ ÒÓÔÕÖØ Ł Ć ĘŚ Ń ÈÉÊË Ç ÌÍÎÏ ÙÚÛÜ Ñ ]{1})([a-zàáâãäåąźżòóÓłćęśńôõöøèéêëçìíîïùúûüÿñ]{2,29}$)")){
            errors.city = city;
        }
        return errors;
    }


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
                    register_controller.showValidationErrors(JSON.parse(JSON.parse(xhr.responseText).message));
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