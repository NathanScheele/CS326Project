//get all of the data for the fridge when you open the page
$(document).ready(function(){
    //get jwt token from sessionStorage
    let token = sessionStorage.getItem('token');

    // POST a request with the token to the Server API
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/getItems",
        data: {"token": token, "location": 'fridge'}
    }).done(function(data) {
        console.log(data);
        // edit html
        Object.entries(data).forEach(
            //([key, value]) => console.log(key, value)
            ([key, value]) => console.log(value("expDate"))
        );

    }).fail(function(jqXHR) {
        $("#error").html("The fridge items could not be accessed from the database.");
    });
});

$("#itemConfirm").click(function() {   

    //get jwt token from sessionStorage
    let token = sessionStorage.getItem('token');

    // Create a credential object from the form fields
    var item = {
       name: $('input[name = "itemName"]').val(),
       expDate: $('input[name = "expDate"]').val(),
       purchaseDate: $('input[name = "purchaseDate"]').val(),
       quantity: $('input[name = "quantity"]').val()
    };

    // POST a request with the JSON-encoded song to the Server API
    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/api/addItem",
        data: {token: token, item: item, location: 'fridge'}
    }).done(function(data) {
        // Reset the form after saving the song
        $("form").trigger("reset");
    }).fail(function(jqXHR) {
        $("#error").html("The item could not be added.");
    });
});