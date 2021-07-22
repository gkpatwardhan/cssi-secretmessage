console.log("In view message");

var MD5 = new Hashes.MD5;

const getMessages = () => {
    console.log("get messages");
    const messagesRef = firebase.database().ref();
    
    messagesRef.on('value', (snapshot) => {
        console.log("in ref");
        const data = snapshot.val();
        console.log(data);
        findMessage(data)git;
    });
}

const findMessage = (messages) => {
    var passcodeAttempt = document.querySelector('#passcode').value;
    passcodeAttempt = MD5.hex(passcodeAttempt);
    for(message in messages) {
        const messageData = messages[message];
        if(messageData.password === passcodeAttempt) {
            renderMessageAsHtml(messageData.message)
        }
    }
}

const renderMessageAsHtml = (message) => {
    // Hide Input Form
    const passcodeInput = document.querySelector('#passcodeInput');
    passcodeInput.style.display = 'none';
    // Render messageas HTML
    const messageDiv = document.querySelector('#message');
    messageDiv.innerHTML = message;   
}