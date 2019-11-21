$("#signup").click(function() {   

    // Create a credential object from the form fields
    let credentials = {
       username: $("input[name='usrSignUp']").val(),
       password: $("input[name='pwdSignUp']").val()
    };
    // POST a request with the user credentials to the Server API
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/api/signup",
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

$("#itemConfirm").click(function() {   

    //get jwt token from sessionStorage
    let token = sessionStorage.getItem('token');

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
        url: "http://localhost:3000/api/addItem",
        data: {"token": token, "item": item, "location": 'fridge'}
    }).done(function(data) {
        // Reset the form after saving the song
        $("form").trigger("reset");
    }).fail(function(jqXHR) {
        $("#error").html("The user could not be registered.");
    });
});

let dataset = null;
//get all of the data for the user when you open the page
$(document).ready(function(){
    // $.ajax({type="GET",
    //         url: "http://localhost:3000/api/signup",
    //         context: document.body,
    //         success: function(data){
    //            alert("done");
    //            dataset = data;
    //         }});
});