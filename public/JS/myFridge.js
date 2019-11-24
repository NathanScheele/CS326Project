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
        //console.log(data);
        // edit html
        //console.log(typeof(data));
        //console.log(data[0]) //data[0] is the stuff we want
        /*Object.entries(data).forEach(
            //([key, value]) => console.log(key, value)
            //([key, value]) => console.log(value("expDate"))
            JSON.parse*/
        //);


        for(let i = 0; i < Object.entries(data).length; i++){
            let currentObject = Object.entries(data[i]);
            //data[i] refers to an object in the fridge
            //currentObject is a key/value pair.
            //$("#toCurrency").append( $('<option>'+allCurrencies[key]+" ("+key+')</option>').val(key));
            //console.log(currentObject[0]);
            //console.log(currentObject[1]);
            //console.log(currentObject[2]);
            
            let var1 = currentObject[0][1]; //this is just the id
            let var2 = currentObject[1][1];
            
            let var3 = currentObject[2][1];

            let date1 = new Date(var3);
            let dateString1 = date1.getDate() + "/" + date1.getMonth() + "/" + date1.getFullYear();
            //credit: https://stackoverflow.com/questions/20841466/how-to-convert-json-date-format-to-normal-date-format-ex-date1388412591038

            let var4 = currentObject[3][1];
            
            let date2 = new Date(var4);
            let dateString2 = date2.getDate() + "/" + date2.getMonth() + "/" + date2.getFullYear();

            let var5 = currentObject[4][1];
            $("#fridgeTableBody").append("<tr></tr>");
            $("#fridgeTableBody").append("<td>" + var2 + "</td>");
            $("#fridgeTableBody").append("<td>" + dateString1 + "</td>");
            $("#fridgeTableBody").append("<td>" + dateString2 + "</td>");
            $("#fridgeTableBody").append("<td>" + var5 + "</td>");
           
        }

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