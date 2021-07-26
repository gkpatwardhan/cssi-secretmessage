let googleUser, userId;

let labels = [];

function addItem(label) {
    console.log("Adding item " + label);
    labels.push(label);
    toggleDropDown();
}

function toggleDropDown() {
    console.log("Togge drop down");
    document.querySelector("#dropdown").classList.toggle("is-active");
}

window.onload = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Logged in as: ' + user.displayName);
            googleUser = user;
            userId = googleUser.uid;
        } else {
            window.location = 'index.html'; // If not logged in, navigate back to login page.
        }
    });
}

const handleNoteSubmit = () => {
    const note = document.querySelector("#noteText");
    const noteTitle = document.querySelector("#noteTitle");
    firebase.database().ref('users/' + userId).push(
        {
            title: noteTitle.value,
            note: note.value,
            timestamp: Date.now(),
            labels: labels
        }
    );
    note.value = noteTitle.value = "";
}