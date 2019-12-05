//import { doesNotThrow } from "assert";

propSort = function (array, prop, prop2, desc) {
    array.sort(function (a, b) {
        if (a[prop] == null && b[prop] != null)
            return -1;
        if (a[prop] != null && b[prop] == null)
            return 1;
        if (a[prop] == null && b[prop] == null) {

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


/*this function adjusts for time zones */
function ConvertUTCTimeToLocalTime(UTCDateString) {
    var convertdLocalTime = new Date(UTCDateString);

    var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;

    convertdLocalTime.setHours(convertdLocalTime.getHours() + hourOffset);

    return convertdLocalTime;
}

// https://stackoverflow.com/questions/6525538/convert-utc-date-time-to-local-date-time


//get all of the data for the fridge when you open the page
$(document).ready(function () {


    //get jwt token from sessionStorage
    let token = sessionStorage.getItem('token');

    // POST a request with the token to the Server API
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/getItems",
        data: {"token": token, "location": 'fridge'}
    }).done(function(data) {
        let itemArray = Object.entries(data);


        for (let i = 0; i < itemArray.length; i++) {
            //let currentObject = Object.entries(data[i]);
            let currentObject = itemArray[i][1];
            console.log(currentObject);

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

            let var4 = currentObject.purchaseDate;


            let date2 = new Date(var4);
            date2 = ConvertUTCTimeToLocalTime(date2);
            let correctMonth2 = date2.getMonth() + 1
            let dateString2 = correctMonth2  + "/" + date2.getDate() + "/" + date2.getFullYear();


            let var5 = currentObject.quantity;
            var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
            usaTime = new Date(usaTime);
            let dd = usaTime.getDate();
            let mm = usaTime.getMonth() + 1;
            let yyyy = usaTime.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            console.log("today: " + today);
            if(var3 != null){
                if(yyyy - date1.getFullYear() < 0){
                    //ok - expires later year
                    console.log("expires next year");
                    $("#fridgeTableBody").append("<tr id=" + var1 + ">" + "<td>" + var2 + "</td><td>" + dateString1 + "</td><td>" + dateString2 + "</td><td>" + var5 + "</td><td id='okCell'>" + "OK" + "</td>" +
                        "<td><button type='button' class='prepareData btn btn-primary' data-toggle='modal' data-target='#Editor'>" +
                        "Edit" +
                        "</button>" + " <button type='button' class='btn btn-danger itemDelete' >&times; </button></td>" +
                    "</tr>");
                }
                else if (yyyy - date1.getFullYear() == 0 && mm - (date1.getMonth() + 1) < 0) {
                    //ok - expires later month
                    console.log("expires in a later month");
                    $("#fridgeTableBody").append("<tr id=" + var1 + ">" + "<td>" + var2 + "</td><td>" + dateString1 + "</td><td>" + dateString2 + "</td><td>" + var5 + "</td><td id='okCell'>" + "OK" + "</td>" +
                        "<td><button type='button' class='prepareData btn btn-primary' data-toggle='modal' data-target='#Editor'>" +
                        "Edit" +
                        "</button>" + " <button type='button' class='btn btn-danger itemDelete' >&times; </button></td>" +
                    "</tr>");
                }
                else if (yyyy - date1.getFullYear() == 0 && mm - (date1.getMonth() + 1) == 0 && dd - date1.getDate() < -2) {
                    //ok - expires later this month
                    console.log("expires later this month")
                    $("#fridgeTableBody").append("<tr id=" + var1 + ">" + "<td>" + var2 + "</td><td>" + dateString1 + "</td><td>" + dateString2 + "</td><td>" + var5 + "</td><td id='okCell'>" + "OK" + "</td>" + 
                        "<td><button type='button' class='prepareData btn btn-primary' data-toggle='modal' data-target='#Editor'>" +
                        "Edit" +
                        "</button>" + " <button type='button' class='btn btn-danger itemDelete' >&times; </button></td>" +
                    "</tr>");
                }
                else if (yyyy - date1.getFullYear() == 0 && mm - (date1.getMonth() + 1) == 0 && dd - date1.getDate() <= 0) {
                    console.log("expires soon");
                    $("#fridgeTableBody").append("<tr id=" + var1 + ">" + "<td>" + var2 + "</td><td>" + dateString1 + "</td><td>" +
                        dateString2 + "</td><td>" + var5 + "</td><td id='almostExp'>" + "EXPIRES SOON" + "</td>" +
                        "<td><button type='button' class='prepareData btn btn-primary' data-toggle='modal' data-target='#Editor'>" +
                        "Edit" +
                        "</button>" + " <button type='button' class='btn btn-danger itemDelete' >&times; </button></td>" +
                    "</tr>");
                }
                else {
                    //expired
                    console.log(date1);
                    console.log("expiration date passed already.");
                    $("#fridgeTableBody").append("<tr id=" + var1 + ">" + "<td>" + var2 + "</td><td>" + dateString1 + 
                        "</td><td>" + dateString2 + "</td><td>" + var5 + "</td><td id='expCell'>" + "EXPIRED" + "</td>" + 
                        "<td><button type='button' class='prepareData btn btn-primary' data-toggle='modal' data-target='#Editor'>" +
                        "Edit" +
                        "</button>" + " <button type='button' class='btn btn-danger itemDelete' >&times; </button></td>" +
                    "</tr>");
                }
            }
            else{
                $("#fridgeTableBody").append("<tr id=" + var1 + ">" + "<td>" + var2 + "</td><td>" + dateString1 + 
                    "</td><td>" + dateString2 + "</td><td>" + var5 + "</td><td id='almostExp'>" + "CAREFUL" + "</td>" + 
                    "<td><button type='button' class='prepareData btn btn-primary' data-toggle='modal' data-target='#Editor'>" +
                    "Edit" + "</button>" + " <button type='button' class='btn btn-danger itemDelete' >&times; </button>" +
                    "<div class='form-check'> <input type='checkbox' class='form-check-input' id='exampleCheck1'>" +
                    "<label class='form-check-label' for='exampleCheck1'>Use in recipes</label> </div></td>" +
                    "</tr>");
            }

            
            //******************************************* *
            //Use this to add a form inside the td. - might want to edit the Edit button above to open a form instead
            //********************************************* */
        
        }

    }).fail(function (jqXHR) {
        $("#error").html("The fridge items could not be accessed from the database.");
    });
});

oldItemData = [];
ingredients = [];

$(document).on("click", ".prepareData", function (event) {
    event.stopPropagation();
    event.stopImmediatePropagation();

    var $row = $(this).closest("tr"),       // Finds the closest row <tr> 
        $tds = $row.find("td");             // Finds all children <td> elements

    $.each($tds, function () {               // Visits every single <td> element
        oldItemData.push($(this).text());
    });
});

$("#itemConfirm").click(function () {

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
        data: { token: token, item: item, location: 'fridge' }
    }).done(function (data) {
        // Reset the form after saving the song
        $("form").trigger("reset");
    }).fail(function (jqXHR) {
        $("#error").html("The item could not be added.");
    });
});



$("#getRecipes").click(function () {

    // event.stopPropagation();
    // event.stopImmediatePropagation();
    ingredients = [];

    let $table = $("#fridgeTableBody"),       // Finds the closest row <tr> 
        $rows = $table.children();             // Finds all children <td> elements

    console.log("rows: " + $rows);

    $.each($rows, function () {               // Visits every single <td> element
           console.log(this);
           let cells = $(this).children();
           console.log(cells);
           let nameCell = cells[0];
           let itemName = nameCell.innerHTML;
           console.log(itemName);


           let checkCell = cells[5];
           let $jCheckCell = $(checkCell);
        console.log($jCheckCell);
           let $elements = $($jCheckCell.children());
           let $checkBox = $($elements[2]);
           console.log($checkBox);
           let $checkInput = $($checkBox.children()[0]);

        if ($checkInput.is(':checked')) {
            console.log("checked");
            ingredients.push(itemName);
        }
        else{
            console.log("not checked");
        }
    });

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/getRecipes",
        data: { ingredients: ingredients }
    }).done(function (data) {
        
        console.log(data);
        recipes = data.recipes;

        for (let i = 0; i < recipes.length; i++) {
            console.log(recipes[i]);
            $("#recipeTableBody").append("<tr><td>" + recipes[i] + "</td>" +
                        "</tr>");
        }

    });
});

//handle updating items
$(document).on("click", ".updateBtn", function (event) {
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
        data: { token: token, oldItem: oldItem, newItem: newItem, location: 'fridge' }
    }).done(function (data) {
        //something
    }).fail(function (jqXHR) {
        $("#error").html("The item could not be added.");
    });
});

//handle deleting items
$(document).on("click", ".itemDelete", function(event){
    event.stopPropagation();
    event.stopImmediatePropagation();

    let $row = $(this).closest("tr"),       // Finds the closest row <tr> 
        $tds = $row.find("td");             // Finds all children <td> elements

    $.each($tds, function () {               // Visits every single <td> element
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
        data: { token: token, item: item, location: 'fridge' }
    }).done(function (data) {
        // Reset the form after saving the song
        $("form").trigger("reset");
        //or, refresh the page. 
        location = location;
    }).fail(function (jqXHR) {
        $("#error").html("The item could not be added.");
    });
});