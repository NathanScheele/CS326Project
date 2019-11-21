//LOGIN
$("#login").click(function() {   
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
    }).done(function(data) {
        //Store the jwt token for later use
        sessionStorage.setItem('token', data.token);
        //redirect to the Fridge
        window.location.href= "http://localhost:3000/html/myFridge.html";
    }).fail(function(jqXHR) {
        $("#error").html("The user could not be registered.");
    });
});