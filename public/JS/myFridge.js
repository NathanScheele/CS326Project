propSort = function(array,prop, prop2, desc) {
    array.sort(function(a, b) {
        if (a[prop] == null && b[prop] != null)
            return -1;
        if (a[prop] != null && b[prop] == null)
            return 1;
        if (a[prop] == null && b[prop] == null){

            if (a[prop2] < b[prop2])
                return desc ? 1 : -1;
            if (a[prop2] > b[prop2])
                return desc ? -1 : 1;
        }
           
        if (a[prop] < b[prop])
            return desc ? 1 : -1;
        if (a[prop] > b[prop])
            return desc ? -1 : 1;
        return 0;
    });
}
//https://www.codeproject.com/Questions/1075115/How-Do-I-Sort-My-Json-Data-Based-On-Date-Column


function ConvertUTCTimeToLocalTime(UTCDateString)
    {
        var convertdLocalTime = new Date(UTCDateString);

        var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;

        convertdLocalTime.setHours( convertdLocalTime.getHours() + hourOffset ); 

        return convertdLocalTime;
    }

    // https://stackoverflow.com/questions/6525538/convert-utc-date-time-to-local-date-time


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
        let itemArray = Object.entries(data);
        // console.log(itemArray);
        // //sortBy(arr, (s) => -new Date(s));
        // console.log(itemArray);
        // propSort(itemArray, 'expDate', 'purchaseDate', true);
        // console.log(itemArray);



        for(let i = 0; i < itemArray.length; i++){
            //let currentObject = Object.entries(data[i]);
            let currentObject = itemArray[i][1];
            console.log(currentObject);
            //data[i] refers to an object in the fridge
            //currentObject is a key/value pair.
            //$("#toCurrency").append( $('<option>'+allCurrencies[key]+" ("+key+')</option>').val(key));
            //console.log(currentObject[0]);
            //console.log(currentObject[1]);
            //console.log(currentObject[2]);
            
            // let var1 = currentObject[0][1]; //this is just the id
            // let var2 = currentObject[1][1];
            
            // let var3 = currentObject[2][1];

            let var1 = currentObject.id; //this is just the id
            let var2 = currentObject.name;
            
            let var3 = currentObject.expDate;
            console.log("var3" + var3);

            let date1 = new Date(var3);
            console.log(date1);
            date1 = ConvertUTCTimeToLocalTime(date1);
            console.log(date1);

            let correctMonth1 = date1.getMonth() + 1
            let dateString1 = correctMonth1 + "/" + date1.getDate() + "/" + date1.getFullYear();
            //credit: https://stackoverflow.com/questions/20841466/how-to-convert-json-date-format-to-normal-date-format-ex-date1388412591038

            // console.log("var3: " + var3);
            // console.log("date1: " + date1);
            // console.log("dateString1: " + dateString1);
            //let var4 = currentObject[3][1];
            let var4 = currentObject.purchaseDate;
            
            
            let date2 = new Date(var4);
            date2 = ConvertUTCTimeToLocalTime(date2);
            let correctMonth2 = date2.getMonth() + 1
            let dateString2 = correctMonth2  + "/" + date2.getDate() + "/" + date2.getFullYear();
            // console.log("var4: " + var4);
            // console.log("date2: " + date2);
            // console.log("dateString2: " + dateString2);

            //let var5 = currentObject[4][1];
            let var5 = currentObject.quantity;
            // $("#fridgeTableBody").append("<tr id=" + var1 + ">");
            // $("#fridgeTableBody").append("<td>" + var2 + "</td>");
            // $("#fridgeTableBody").append("<td>" + dateString1 + "</td>");
            // $("#fridgeTableBody").append("<td>" + dateString2 + "</td>");
            // $("#fridgeTableBody").append("<td>" + var5 + "</td></tr>");

            // $("#fridgeTableBody").append("<tr id=" + var1 + ">" + "<td>" + var2 + "</td><td>" + dateString1 + "</td><td>" + dateString2 + "</td><td>" + var5 + "</td></tr>");

            //let today = new Date();
            var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
            usaTime = new Date(usaTime);
            //console.log('USA time: '+usaTime.toLocaleString())
            // let dd = String(today.getDate()).padStart(2, '0');
            // let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            // let yyyy = today.getFullYear();
            let dd = usaTime.getDate();
            let mm = usaTime.getMonth()+1;
            let yyyy = usaTime.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            console.log("today: " + today);
            if(var3 != null){
                //console.log("hello?");
                if(yyyy - date1.getFullYear() < 0){
                    //ok - expires later year
                    console.log("expires next year");
                    $("#fridgeTableBody").append("<tr id=" + var1 + ">" + "<td>" + var2 + "</td><td>" + dateString1 + "</td><td>" + dateString2 + "</td><td>" + var5 + "</td><td id='okCell'>" + "OK" + "</td>" +
                        "<td><button type='button' class='prepareData btn btn-primary' data-toggle='modal' data-target='#Editor'>" +
                        "Edit" +
                        //"</button></td></tr>");
                        "</button>" + " <button type='button' class='btn btn-danger itemDelete' >&times; </button></td>" +
                    "</tr>");
                    // $("#fridgeTableBody").append("<td id='okCell'>" + "OK" + "</td>");
                }
                else if (yyyy - date1.getFullYear() == 0 && mm - (date1.getMonth()+1) < 0) {
                    //ok - expires later month
                    console.log("expires in a later month");
                    //$("#fridgeTableBody").append("<td id='okCell'>" + "OK" + "</td>");
                    $("#fridgeTableBody").append("<tr id=" + var1 + ">" + "<td>" + var2 + "</td><td>" + dateString1 + "</td><td>" + dateString2 + "</td><td>" + var5 + "</td><td id='okCell'>" + "OK" + "</td>" +
                        "<td><button type='button' class='prepareData btn btn-primary' data-toggle='modal' data-target='#Editor'>" +
                        "Edit" +
                        //"</button></td></tr>");
                        "</button>" + " <button type='button' class='btn btn-danger itemDelete' >&times; </button></td>" +
                    "</tr>");
                }
                else if (yyyy - date1.getFullYear() == 0 && mm - (date1.getMonth()+1) == 0 && dd - date1.getDate() < -2){
                    //ok - expires later this month
                    console.log("expires later this month")
                    //$("#fridgeTableBody").append("<td id='okCell'>" + "OK" + "</td>");
                    $("#fridgeTableBody").append("<tr id=" + var1 + ">" + "<td>" + var2 + "</td><td>" + dateString1 + "</td><td>" + dateString2 + "</td><td>" + var5 + "</td><td id='okCell'>" + "OK" + "</td>" + 
                        "<td><button type='button' class='prepareData btn btn-primary' data-toggle='modal' data-target='#Editor'>" +
                        "Edit" +
                        //"</button></td></tr>");
                        "</button>" + " <button type='button' class='btn btn-danger itemDelete' >&times; </button></td>" +
                    "</tr>");
                }
                else if (yyyy - date1.getFullYear() == 0 && mm - (date1.getMonth()+1) == 0 && dd - date1.getDate() <= 0){
                    console.log("expires soon");
                    $("#fridgeTableBody").append("<tr id=" + var1 + ">" + "<td>" + var2 + "</td><td>" + dateString1 + "</td><td>" + 
                        dateString2 + "</td><td>" + var5 + "</td><td id='almostExp'>" + "EXPIRES SOON" + "</td>" +
                        "<td><button type='button' class='prepareData btn btn-primary' data-toggle='modal' data-target='#Editor'>" +
                        "Edit" +
                        //"</button></td></tr>");
                        "</button>" + " <button type='button' class='btn btn-danger itemDelete' >&times; </button></td>" +
                    "</tr>");
                   // $("#fridgeTableBody").append("<td id='almostExp'>EXPIRES SOON!</td>");
                    // $("#fridgeTableBody").append("<div class='container'>" +
                    //     "<div class='row'>" +
                    //         "<div class='col'>" +
                    //             "<div class='alert alert-primary alert-dismissable fade show' role='alert'>" +
                    //                 "<button type='button' class='close' data-dismiss='alert'><span aria-hidden='true'>&times;</span></button>" +
                    //                 "<h2 class='alert-heading'>Expires Soon!</h2> " +
                    //             "</div>" +
                    //         "</div>" +
                    //     "</div>" +
                    // "</div>" );
                }
                else{
                    //expired
                    console.log(date1);
                    console.log("expiration date passed already.");
                    //$("#fridgeTableBody").append("<td id='expCell'>" + "EXPIRED" + "</td>");
                    $("#fridgeTableBody").append("<tr id=" + var1 + ">" + "<td>" + var2 + "</td><td>" + dateString1 + 
                        "</td><td>" + dateString2 + "</td><td>" + var5 + "</td><td id='expCell'>" + "EXPIRED" + "</td>" + 
                        "<td><button type='button' class='prepareData btn btn-primary' data-toggle='modal' data-target='#Editor'>" +
                        "Edit" +
                        // "</button></td></tr>");
                        "</button>" + " <button type='button' class='btn btn-danger itemDelete' >&times; </button></td>" +
                    "</tr>");
                }
            }
            else{
                //$("#fridgeTableBody").append("<td id='almostExp'>" + "CAREFUL" + "</td>");
                $("#fridgeTableBody").append("<tr id=" + var1 + ">" + "<td>" + var2 + "</td><td>" + dateString1 + 
                    "</td><td>" + dateString2 + "</td><td>" + var5 + "</td><td id='almostExp'>" + "CAREFUL" + "</td>" + 
                    "<td><button type='button' class='prepareData btn btn-primary' data-toggle='modal' data-target='#Editor'>" +
                    "Edit" + "</button>" + " <button type='button' class='btn btn-danger itemDelete' >&times; </button></td>" +
                    "</tr>");
            }

            /*button to edit the items - should trigger a modal*/
            // $("#fridgeTableBody").append("<button type='button' class='updateBtn' data-toggle='modal' data-target='#Editor'>" +
            //                    "Edit" +
            //                 "</button>");

            /*button to remove items - should just call ajax to remove an item, so change the*/
            // $("#fridgeTableBody").append("<button type='button' class='btn btn-danger' style='height:100%'>" +
            //                " &times;" +
            //              "</button>");
            
            //******************************************* *
            //Use this to add a form inside the td. - might want to edit the Edit button above to open a form instead
            //********************************************* */
            // $("#fridgeTableBody").append("<td>" +
            // "<form>" + 
            //     "<input type='hidden' id='removeForm'>" + 
            //     "<div>" +
            //         "<label for='quantity'>Eat how many: </label>" +
            //         "<input type='text' id='quantity'>" +
            //     "</div>" +
            
            //     "<input type='button' id='updateBtn' value='Update'>" +

            //     "<div id='error'></div>" +
            // "</form> </td>");
        }

    }).fail(function(jqXHR) {
        $("#error").html("The fridge items could not be accessed from the database.");
    });
});

oldItemData = [];

$(document).on("click", ".prepareData", function(event){
    event.stopPropagation();
    event.stopImmediatePropagation();

    var $row = $(this).closest("tr"),       // Finds the closest row <tr> 
    $tds = $row.find("td");             // Finds all children <td> elements

    $.each($tds, function() {               // Visits every single <td> element
        oldItemData.push($(this).text());
    });
});

$("#itemConfirm").click(function() {   

    //get jwt token from sessionStorage
    let token = sessionStorage.getItem('token');

    // Create a credential object from the form fields
    let item = {
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

// $('.modal').on('show.bs.modal', function (e) {
//     let $trigger = $(e.relatedTarget);
//     //console.log(e.relatedTarget);
//     //$(e.relatedTarget).data('button');
//     //let $row = $(this).closest("tr");
//     var $row = $(this).closest("tr"),       // Finds the closest row <tr> 
//     $tds = $row.find("td");             // Finds all children <td> elements

//     $.each($tds, function() {               // Visits every single <td> element
//         console.log($(this).text());        // Prints out the text within the <td>
//     });
// });


//handle updating items
$(document).on("click", ".updateBtn", function(event){
    event.stopPropagation();
    event.stopImmediatePropagation();

    //get jwt token from sessionStorage
    let token = sessionStorage.getItem('token');

    //recreate item from table
    let oldItem = {
        name: oldItemData[0],
        expDate: oldItemData[1],
        purchaseDate: oldItemData[2],
        quantity: oldItemData[3]
    };

    let newItem = {
        name: $('input[name="editItemName"]').val(),
        expDate: $('input[name = "editExpDate"]').val(),
        purchaseDate: $('input[name = "editPurchaseDate"]').val(),
        quantity: $('input[name = "editQuantity"]').val()
    };

    // POST a request with the JSON-encoded song to the Server API
    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/api/updateItem",
        data: {token: token, oldItem: oldItem, newItem: newItem, location: 'fridge'}
    }).done(function(data) {
        //something
    }).fail(function(jqXHR) {
        $("#error").html("The item could not be added.");
    });
});

//handle deleting items
//$('.itemDelete').click(function(){
$(document).on("click", ".itemDelete", function(event){
    event.stopPropagation();
    event.stopImmediatePropagation();

    let $row = $(this).closest("tr"),       // Finds the closest row <tr> 
    $tds = $row.find("td");             // Finds all children <td> elements

    $.each($tds, function() {               // Visits every single <td> element
        oldItemData.push($(this).text());
    });

    let token = sessionStorage.getItem('token');

    //recreate item from table
    let item = {
        name: oldItemData[0],
        expDate: oldItemData[1],
        purchaseDate: oldItemData[2],
        quantity: oldItemData[3]
    };

    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/api/removeItem",
        data: {token: token, item: item, location: 'fridge'}
    }).done(function(data) {
        // Reset the form after saving the song
        $("form").trigger("reset");
    }).fail(function(jqXHR) {
        $("#error").html("The item could not be added.");
    });
});