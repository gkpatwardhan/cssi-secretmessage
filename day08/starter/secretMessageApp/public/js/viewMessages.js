var trial = 0;

const getMessages = () => {
    const messageRef = firebase.database().ref();
    messageRef.on('value', (snapshot) => {
        document.querySelector("#hide").classList.remove('hidden');
        console.log(document.querySelector("#hide"));
        const data = snapshot.val();
        var passcode = document.querySelector("#passcode").value;

        var foundMessage = false;
        for (const key in data) {
            if (data[key]["password"] === passcode) {
                foundMessage = true;
                trial = 0;
                renderMessageAsHtml(data[key]["message"]);
            }
        }
        
        if (! foundMessage) {
            trial += 1;
            if (trial < 3) {
                renderMessageAsHtml("ERROR: No message with this password. Try again.");
            } else {
                document.querySelector("#viewMsg").disabled = true;
                renderMessageAsHtml("ERROR: You have maxed out the number of tries. Wait 30 seconds before trying again");
                setTimeout(e => {
                    document.querySelector("#viewMsg").disabled = false;                    
                }, 30*1000);
            }
        }

    });
}

const renderMessageAsHtml = (message) => {
    document.querySelector("#message").innerHTML = message;
}