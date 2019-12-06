//selects sign up button in form to use for activity detection
let signup = document.querySelector("button[name='signup']");
document.getElementById('signupform').onkeypress=function(e){
    if(e.keyCode==13){
        document.getElementById('signup').click();
    }
}
function validateSignupForm(event) {
    let userName = document.getElementById("signupForm-username");
        //stores user name element into a variable
    let password = document.getElementById("signupForm-password");
        //stores password element into a variable
    let confirm = document.getElementById("signupForm-passwordc");
        //stores the confirm password element into a variable
    let email = document.getElementById("signupForm-email");
        //stores the email element into a variable
    let ul = document.getElementById("formErrors2");
        //stores the hidden form errors unordered list into a variable
    let shouldIStop = 0;
        //variable for detecting whether the form should continue to be submitted to the server or not
        //0 = no errors detected
        //1 = 1 or more errors detected during verification
    ul.innerHTML = "";

    //check if username field is empty
    if(userName.value.length < 1){
        console.log("userName is invalid");
        var errMsg1 = document.createElement("li");
        userName.style.backgroundColor = "Orange"; //highlights the username field box to indicate error
        errMsg1.appendChild(document.createTextNode("Username is empty.")); 
        ul.appendChild(errMsg1); //creates and adds the error to the hidden form errors unordered list in the html
        shouldIStop = 1; //signifies error detected
        //checks if password field is empty
        if (password.value.length < 1){
            console.log("password is invalid");
            var errMsg4 = document.createElement("li");
            password.style.backgroundColor = "Orange";
            errMsg4.appendChild(document.createTextNode("Password is empty"))
            ul.appendChild(errMsg4);
            shouldIStop = 1;
        //checks if password does not meet the minimum length required
        }else if (password.value.length < 6){
            console.log("password is invalid");
            var errMsg3 = document.createElement("li");
            password.style.backgroundColor = "Orange";
            errMsg3.appendChild(document.createTextNode("Password is too short. Must be at least 6 characters long."))
            ul.appendChild(errMsg3);
            shouldIStop = 1;
        }
        
}
//checks if password fields match
else if(password.value != confirm.value){
    console.log("passwords do not match");
    var errMsg4 = document.createElement("li");
    password.style.backgroundColor = "Orange";
    confirm.style.backgroundColor = "Orange";
    errMsg4.appendChild(document.createTextNode("Passwords do not match"));
    ul.appendChild(errMsg4);
    shouldIStop = 1;
}
//checks if username length is at least 6 characters
else if(userName.value.length < 6){
        console.log("userName is invalid");
        var errMsg2 = document.createElement("li");
        userName.style.backgroundColor = "Orange";
        errMsg2.appendChild(document.createTextNode("Username is too short. Must be at least 6 characters long"));
        ul.appendChild(errMsg2);
        shouldIStop = 1;
        //checks if password length is empty
        if (password.value.length < 1){
            console.log("password is invalid");
            var errMsg5 = document.createElement("li");
            password.style.backgroundColor = "Orange";
            errMsg5.appendChild(document.createTextNode("Password is empty"))
            ul.appendChild(errMsg5);
            shouldIStop = 1;
        //checks if password length is at least 6 characters
        }else if (password.value.length < 6){
            console.log("password is invalid");
            var errMsg3 = document.createElement("li");
            password.style.backgroundColor = "Orange";
            errMsg3.appendChild(document.createTextNode("Password is too short. Must be at least 6 characters long."))
            ul.appendChild(errMsg3);
            shouldIStop = 1;
        }
    }
    //checks if email address is in a correct format
    else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) == false){
        console.log("email is invalid");
        var errMsg6 = document.createElement("li");
        email.style.backgroundColor = "Orange";
        errMsg6.appendChild(document.createTextNode("Invalid email"));
        ul.appendChild(errMsg6);
        shouldIStop = 1;
    }

    //checks the key variable that determines whether the form should be stopped from being sent or allowed to go through
    if (shouldIStop === 1){
        //sets the value attribute of the form Errors tag to unverified so next js will detect and not send form data to server
        document.getElementById("formErrors2").value = "unverified";
        event.preventDefault();
    }
    else{
        //sets the value attribute of the form Errors tag to verified so next js will detect and send form data to server
        document.getElementById("formErrors2").value = "verified"
        userName.style.backgroundColor = "LightGreen";
        password.style.backgroundColor = "LightGreen";
        }

}
signup.addEventListener("click", validateSignupForm);