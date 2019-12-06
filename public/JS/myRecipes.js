
$(document).ready(function () {
    //get jwt token from sessionStorage
    let token = sessionStorage.getItem('token');
    console.log('here');
    // POST a request with the token to the Server API
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/getSavedRecipes",
        data: { "token": token}
    }).done(function (data) {
        let itemArray = Object.entries(data);

        for (let i = 0; i < itemArray.length; i++) {
            //let currentObject = Object.entries(data[i]);
            let currentObject = itemArray[i][1];
            console.log(currentObject);
            $("#savedRecipeTableBody").append("<tr id=" + currentObject + " class='recipe'>" + "<td class= 'recipeList'>" + currentObject + "</td>" +
            "<td class='recipeList'><button type='button' class='btn btn-danger recipeDelete recipeList' >&times; </button></td>" + "</tr>");
        }
    }).fail(function (jqXHR) {
        $("#error").html("The fridge items could not be accessed from the database.");
    });
});


//handle deleting items
//$('.itemDelete').click(function(){
    $(document).on("click", ".recipeDelete", function (event) {
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
    