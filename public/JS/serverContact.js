$("#signup").click(function() {   
    // var genre = [];
    // if ($("#genre").val()) {
    //     // Create an array from the comma-separated values
    //     genre = $("#genre").val().split(",");
    // }

    // Create a credential object from the form fields
    var credentials = {
       username: $("input[name='usrSignUp']").val(),
       password: $("input[name='pwdSignUp']").val()
    };

    // POST a request with the JSON-encoded song to the Server API
    $.ajax({
        type: "POST",
        url: "/api/signup",
        data: JSON.stringify(credentials),
        contentType: "application/json"
    }).done(function(data) {
        // Reset the form after saving the song
        $("form").trigger("reset");
    }).fail(function(jqXHR) {
        $("#error").html("The user could not be registered.");
    });
});

//LOGIN
$("#confirm").click(function() {   
    // var genre = [];
    // if ($("#genre").val()) {
    //     // Create an array from the comma-separated values
    //     genre = $("#genre").val().split(",");
    // }

    // Create a credential object from the form fields
    var credentials = {
        username: $("input[name='usrSignUp']").val(),
        password: $("input[name='pwdSignUp']").val()
    };

    // POST a request with the JSON-encoded credentials to the Server API
    $.ajax({
        type: "GET",
        url: "/api/signin",
        data: JSON.stringify(credentials),
        contentType: "application/json"
    }).done(function(data) {
        // Reset the form after saving the song
        $("form").trigger("reset");
    }).fail(function(jqXHR) {
        $("#error").html("The user could not be registered.");
    });
});

$("#itemConfirm").click(function() {   
    // var genre = [];
    // if ($("#genre").val()) {
    //     // Create an array from the comma-separated values
    //     genre = $("#genre").val().split(",");
    // }

    // Create a credential object from the form fields
    var item = {
       name: $('input[name = "itemName"]').val(),
       date: $('input[name = "expDate"]').val()
    };

    // POST a request with the JSON-encoded song to the Server API
    $.ajax({
        type: "PUT",
        url: "/api/signup",
        data: JSON.stringify(item),
        contentType: "application/json"
    }).done(function(data) {
        // Reset the form after saving the song
        $("form").trigger("reset");
    }).fail(function(jqXHR) {
        $("#error").html("The user could not be registered.");
    });
});