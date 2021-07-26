function signIn() {
    console.log("Initiating signin");
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
        console.log("Result is ");
        console.log(result);
        const credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        window.location = 'welcome.html';
    }).catch(error => {
        // Something bad happened
        console.log("ERROR: ");
        console.log(error);
    })
}

function signInEmail() {
    const email = prompt("Enter email", "xyz@gmail.com");
    const password = prompt("Enter password", "***********");
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    window.location = 'welcome.html';
  })
  .catch((error) => {
        // Something bad happened
        console.log("ERROR: ");
        console.log(error);
  });
}

function createAccountEmail() {
    const email = prompt("Enter email", "xyz@gmail.com");
    const password = prompt("Enter password", "***********");
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    window.location = 'welcome.html';
  })
  .catch((error) => {
        // Something bad happened
        console.log("ERROR: ");
        console.log(error);
  });
}