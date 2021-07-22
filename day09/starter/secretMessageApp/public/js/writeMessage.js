console.log("In write message");

const MAX_CHARS = 255;
const exp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
var MD5 = new Hashes.MD5;

const validatePassword = (password) => {
    if(exp.test(password)) {
        return true;
    } else { 
        alert('Password must contain a lower case and upper case character as well as a number.')
        return false;
    }
}

const submitMessage = () => {
    const passwordHTML = document.querySelector("#passcode");
    const messageHTML = document.querySelector("#message");
    var passwordVal = passwordHTML.value;
    const messageVal = messageHTML.value;

    if (messageVal.length > MAX_CHARS) {
        alert( `Messages can't be longer than ${MAX_CHARS} in length`);
        console.log("Reached max char count");
        return;
    }
    
    if(!validatePassword(passwordVal)) {
        console.log("Password didn't clear the requirements");
        return;
    }
    passwordVal = MD5.hex(passwordVal);
    firebase.database().ref().push({message: messageVal, password: passwordVal});
    
    messageHTML.value = "";
    passwordHTML.value = "";
}