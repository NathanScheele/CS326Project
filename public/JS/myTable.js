//get all of the data for the user when you open the page
$(document).ready(function(){
    $.ajax({ url: "http://localhost:3000/api/signup",
            context: document.body,
            success: function(){
               alert("done");
            }});
    });