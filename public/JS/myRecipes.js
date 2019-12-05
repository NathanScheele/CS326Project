
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
            $("#RecipeTableBody").append("<tr id=" + currentObject + ">" + "<td>" + currentObject + "</td>" + "</tr>");
        }
    }).fail(function (jqXHR) {
        $("#error").html("The fridge items could not be accessed from the database.");
    });
});