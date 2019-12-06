//LOGIN
$("button[name='confirm']").click(function (event) {

    if (document.getElementById("formErrors").value === "verified") {
        //check if the validation js verified the entry before running ajax request

        // Create a credential object from the form fields
        let credentials = {
            username: $("input[name='usrSignUp']").val(),
            password: $("input[name='pwdSignUp']").val()
        };

        // POST a request with the user credentials to the Server API
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/api/signin",
            data: credentials
        }).done(function (data) {
            if (data.token == "Password-Error") {
                let password = document.getElementById("defaultForm-password");
                password.style.backgroundColor = "Orange";
                let ul = document.getElementById("formErrors");
                let errMsg1 = document.createElement("li");
                errMsg1.appendChild(document.createTextNode("Password is incorrect."));
                ul.appendChild(errMsg1);
            }
            else if(data.token == "Username-Error"){
                let username = document.getElementById("defaultForm-username");
                username.style.backgroundColor = "Orange";
                let ul = document.getElementById("formErrors");
                let errMsg1 = document.createElement("li");
                errMsg1.appendChild(document.createTextNode("Username is incorrect."));
                ul.appendChild(errMsg1);
            }
            else {
                //Store the jwt token for later use
                sessionStorage.setItem('token', data.token);
                //redirect to the Fridge
                window.location.href = "http://localhost:3000/html/myFridge.html";
            }
        }).fail(function (jqXHR) {
            $("#error").html("Login Error");
        });
    }

});

