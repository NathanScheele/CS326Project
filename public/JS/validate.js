let login = document.querySelector("button[name='confirm']");

function validateLoginForm(event) {

    
    let userName = document.getElementById("defaultForm-username");
    let password = document.getElementById("defaultForm-password");
    let ul = document.getElementById("formErrors");
    let shouldIStop = 0;
    ul.innerHTML = "";
    

    if(userName.value.length < 1){
            console.log("userName is invalid");
            var errMsg1 = document.createElement("li");
            userName.style.backgroundColor = "Orange";
            errMsg1.appendChild(document.createTextNode("Username is empty."));
            ul.appendChild(errMsg1);
            shouldIStop = 1;
            if (password.value.length < 1){
                console.log("password is invalid");
                var errMsg4 = document.createElement("li");
                password.style.backgroundColor = "Orange";
                errMsg4.appendChild(document.createTextNode("Password is empty"))
                ul.appendChild(errMsg4);
                shouldIStop = 1;
            }else if (password.value.length < 6){
                console.log("password is invalid");
                var errMsg3 = document.createElement("li");
                password.style.backgroundColor = "Orange";
                errMsg3.appendChild(document.createTextNode("Password is too short. Must be at least 6 characters long."))
                ul.appendChild(errMsg3);
                shouldIStop = 1;
            }
            
    }else if(userName.value.length < 6){
            console.log("userName is invalid");
            var errMsg2 = document.createElement("li");
            userName.style.backgroundColor = "Orange";
            errMsg2.appendChild(document.createTextNode("Username is too short. Must be at least 6 characters long"));
            ul.appendChild(errMsg2);
            shouldIStop = 1;
            if (password.value.length < 1){
                console.log("password is invalid");
                var errMsg5 = document.createElement("li");
                password.style.backgroundColor = "Orange";
                errMsg5.appendChild(document.createTextNode("Password is empty"))
                ul.appendChild(errMsg5);
                shouldIStop = 1;
            }else if (password.value.length < 6){
                console.log("password is invalid");
                var errMsg3 = document.createElement("li");
                password.style.backgroundColor = "Orange";
                errMsg3.appendChild(document.createTextNode("Password is too short. Must be at least 6 characters long."))
                ul.appendChild(errMsg3);
                shouldIStop = 1;
            }
        }
        if (shouldIStop === 1){
            document.getElementById("formErrors").value = "unverified"
            event.preventDefault();
        }
        else{
        
            document.getElementById("formErrors").value = "verified"
            //login.screenName.
            userName.style.backgroundColor = "LightGreen";
            //login.zip.
            password.style.backgroundColor = "LightGreen";
            //login.tos.style.backgroundColor = "LightGreen";
            }
 
    // Replace false with an expression that checks whether myForm.screenName.value is empty.

 
    // Replace false with an expression that checks whether the length of myForm.zip is not 5.
  
}

function validateAddItem(event){
    
}

 //let myForm = document.querySelector("#myForm");
 
    //clear form errors

 login.addEventListener("click", validateLoginForm);
 