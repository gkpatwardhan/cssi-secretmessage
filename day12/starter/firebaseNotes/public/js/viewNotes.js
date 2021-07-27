let googleUser;
let searchBar;
var searching = false;

window.onload = event => {
    // Use this to retain user state between html pages.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Logged in as: ' + user.displayName);
            googleUser = user;
            let userId = user.uid;
            getNotes(userId);

            searchBar = document.querySelector("#search");
            searchBar.addEventListener('change', e => {
                console.log("Searching");
                searching = true;
                const notesRef = firebase.database().ref(`users/${userId}`);
                notesRef.on('value', (snapshot) => {
                    const data = snapshot.val();
                    const section = document.querySelector("#app");
                    section.innerHTML = "";
                    for (notes in data) {
                        if (data[notes]["labels"].find(value => value === searchBar.value) == undefined) {
                            console.log("Skipping: ");
                            console.log(data[notes]);
                            continue;
                        }
                        section.innerHTML += createCardWithLabels(data[notes]);
                    }
                });
            });
            console.log(searchBar);

        } else {
            window.location = 'index.html'; // If not logged in, navigate back to login page.
        }
    });
}

const getNotes = (userId) => {
    console.log("Getting notes");
    const notesRef = firebase.database().ref(`users/${userId}`);
    notesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        renderDataAsHtml(data);
    });
}

const renderDataAsHtml = data => {
    const section = document.querySelector("#app");
    section.innertHTML = "";
    for (notes in data) {
        if (data[notes]["labels"].length == 0) {
            section.innerHTML += createCard(data[notes]);
        } else {
            section.innerHTML += createCardWithLabels(data[notes]);
        }
    }
};

const colors = ['powderblue', 'yellow', 'ghostwhite', 'aqua', 'floralwhite']

const createCard = note => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    console.log(color);
    const card = `<div class="column is-third"><div class="card ml-3 mb-3" style="background-color: ${color};">
  <div class="card-content">
    <table class="table is-fullwidth" style="background-color: ${color};">
    <tr>
      <th>
            <p class="title">
            “${note["title"]}”
            </p>
        </th>
        <th>
            <p>
            ${googleUser.displayName}
            </p>
        </th>
        </tr>
    </table>
    <p class="content">
      “${note["text"]}”
    </p>
    <p class="subtitle">
      Created ${note["timestamp"]}
    </p>
  </div>
  <footer class="card-footer">
    <p class="card-footer-item">
      <span>
        <a href="#">Edit</a>
      </span>
    </p>
    <p class="card-footer-item">
      <span>
        <a href="#">Delete</a>
      </span>
    </p>
  </footer>
</div></div>`;
    return card;
}

const createCardWithLabels = note => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    console.log(color);

    var labelsStr = "";
    for (var i = 0; i < note["labels"].length; ++i) {
        labelsStr += note["labels"][i];
        if (i != 0 && i % 5 == 0) {
            labelsStr += "<br>";
        } else if ((i+1) != note["labels"].length) {
            labelsStr += ",     ";
        }
    }

    const card = `<div class="column is-one-third"><div class="card ml-3 mb-3" style="background-color: ${color};">
  <div class="card-header">
    <table class="table is-fullwidth has-text-centered" style="background-color: ${color};">
    <tr>
      <th>
            <p class="title">
            ${note["title"]}
            </p>
        </th>
        <th>
            <p>
            ${googleUser.displayName}
            </p>
        </th>
        </tr>
    </table>
    </div>
    <div class="card-content">
    <p class="content">
      ${note["text"]}
      <br>
      <br>
      <b>Labels: </b> ${labelsStr}
    </p>
    <p>
      <b>Created: </b> ${note["timestamp"]}
    </p>
  </div>
  <footer class="card-footer"  style="background-color: ${color};">
    <p class="card-footer-item">
      <span>
        <a href="#">Edit</a>
      </span>
    </p>
    <p class="card-footer-item">
      <span>
        <a href="#">Delete</a>
      </span>
    </p>
  </footer>
</div></div>`;
    return card;
}
