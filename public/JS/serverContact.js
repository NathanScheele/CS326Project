$("#signup").click(function() {   

    // Create a credential object from the form fields
    var credentials = {
       "username": $("input[name='usrSignUp']").val(),
       "password": $("input[name='pwdSignUp']").val()
    };

    // POST a request with the JSON-encoded song to the Server API
    $.ajax({
        type: "POST",
        url: "/api/signup",
        data: credentials
    }).done(function(data) {
        localStorage.setItem('token', data.token);

        $("form").trigger("reset");
    }).fail(function(jqXHR) {
        $("#error").html("The user could not be registered.");
    });
});

//LOGIN
$("#confirm").click(function() {   

    // Create a credential object from the form fields
    var credentials = {
        username: $("input[name='usrSignUp']").val(),
        password: $("input[name='pwdSignUp']").val()
    };

    // POST a request with the JSON-encoded credentials to the Server API
    $.ajax({
        type: "GET",
        url: "/api/signin",
        data: credentials
    }).done(function(data) {
        localStorage.setItem('token', data.token);
        $("form").trigger("reset");
    }).fail(function(jqXHR) {
        $("#error").html("The user could not be registered.");
    });
});

$("#itemConfirm").click(function() {   

    //get jwt token from localStorage
    let token = localStorage.getItem('token');

    // Create a credential object from the form fields
    var item = {
       "name": $('input[name = "itemName"]').val(),
       "expDate": $('input[name = "expDate"]').val(),
       "purchaseDate": $('input[name = "purchaseDate"]').val(),
       "quantity": $('input[name = "quantity"]').val()
    };

    // POST a request with the JSON-encoded song to the Server API
    $.ajax({
        type: "PUT",
        url: "api/addItem",
        data: {"token": token, "item": item, "location": 'fridge'}
    }).done(function(data) {
        // Reset the form after saving the song
        $("form").trigger("reset");
    }).fail(function(jqXHR) {
        $("#error").html("The user could not be registered.");
    });
});

//get all of the data for the user when you open the page
$(document).ready(function(){
    // $.ajax({ url: "http://localhost:3000/api/signup",
    //         context: document.body,
    //         success: function(){
    //            alert("done");
    //         }});
});