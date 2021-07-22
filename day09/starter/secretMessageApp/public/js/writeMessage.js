console.log("In write message");

const submitMessage = () => {
    const passwordHTML = document.querySelector("#passcode");
    const messageHTML = document.querySelector("#message");
    const passwordVal = passwordHTML.value;
    const messageVal = messageHTML.value;
    
    firebase.database().ref().push({message: messageVal, password: passwordVal});
    
    messageHTML.value = "";
    passwordHTML.value = "";
}