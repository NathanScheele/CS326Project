let myForm = document.querySelector("#myForm");

function validateForm(event) {

    
    let userName = myForm.defaultForm-username;
    let userName = myForm.defaultForm-username;


    if(userName.length < 1){
        console.log("userName is invalid");
        event.preventDefault();
        }

    if(userName.length < 1){
        console.log("userName is invalid");
        event.preventDefault();
        }
 
    myForm.screenName.style.backgroundColor = "LightGreen";
    myForm.zip.style.backgroundColor = "LightGreen";
    myForm.tos.style.backgroundColor = "LightGreen";
 
    // Replace false with an expression that checks whether myForm.screenName.value is empty.
    if ( userName.length < 1 ) {
       myForm.screenName.style.backgroundColor = "Orange";
    }
 
    // Replace false with an expression that checks whether the length of myForm.zip is not 5.
    if ( password.length < 1 ) {
       myForm.zip.style.backgroundColor = "Orange";
    }
 
}
 //let myForm = document.querySelector("#myForm");
 myForm.validate.addEventListener("click", validateForm);