let googleUser;

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

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

function getTimestamp(){
    var epochTime = Math.floor(new Date().getTime()/1000.0);
    var humanTime = new Date(epochTime*1000);
    return humanTime.toLocaleString();
}

const handleNoteSubmit = () => {
  // 1. Capture the form data
  const noteTitle = document.querySelector('#noteTitle');
  const noteText = document.querySelector('#noteText');
  // 2. Format the data and write it to our database
  firebase.database().ref(`users/${googleUser.uid}`).push({
    title: noteTitle.value,
    text: noteText.value,
    timestamp: getTimestamp(),
    labels: labels
  })
  // 3. Clear the form so that we can write a new note
  .then(() => {
    noteTitle.value = "";
    noteText.value = "";
  });
}