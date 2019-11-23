//LOGIN
$("button[name='confirm']").click(function(event) {   

    var usrName = $("input[name='usrSignUp']");
    var password = $("input[name='pwdSignUp']");
    var ul = $("#uList").html();
    if (usrName.val().length < 5){
        //length less than 5 characters
        usrName.css("background-color", "red");
        event.preventDefault();

    }else{
       
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
    }
});

// function validateLoginForm(event){

// }