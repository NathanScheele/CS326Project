$(document).ready(function(){
    $.ajax({ url: "http://localhost:3000/api/signup",
            context: document.body,
            success: function(){
               alert("done");
            }});
    });