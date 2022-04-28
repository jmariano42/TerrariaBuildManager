const currentUser = {
  _id: null,
  first_name: null,
  last_name: null,
  email: null,
  username: null,
  password: null,
  builds: null,
};

const currentBuild = {
  helmet: null,
  chestplate: null,
  leggings: null,
  accessory1: null,
  accessory2: null,
  accessory3: null,
  accessory4: null,
  accessory5: null,
  accessory6: null,
  accessory7: null,
};

//function checks inputted user credentials
function authenicateUser(users, username, password) {
  console.log(currentUser);
  //find user with given username
  let foundUser = users.find((user) => user.username === username);
  console.log(foundUser);
  //check to see if a user was found
  if (!foundUser || foundUser == undefined) {
    //if no user is found then send user back to login
    let page = "Login";
    switchPage(page);
  } else {
    //check if password given matches user password
    if (foundUser.password === password) {
      //user is authenticated
      console.log("User Authenticated");
      currentUser._id = foundUser._id;
      currentUser.first_name = foundUser.first_name;
      currentUser.last_name = foundUser.last_name;
      currentUser.email = foundUser.email;
      currentUser.username = foundUser.username;
      currentUser.password = foundUser.password;
      currentUser.builds = foundUser.builds;
      console.log(currentUser);
    } else {
      //if password does not match then send user back to login
      let page = "Login";
      switchPage(page);
    }
  }
}

//login page listeners
function initLoginListeners() {
  $(".login-back-button").click(function () {
    let page = "Landing Menu";
    switchPage(page);
  });
  $(".login-submit-button").click(function (value) {
    //retrieve user input
    let username = $("#username").val();
    let password = $("#password").val();
    if (!username || !password) {
      let page = "Login";
      switchPage(page);
    } else {
      //fetch users
      fetch("http://localhost:3000/users")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          return response.json();
        })
        .then((json) => authenicateUser(json, username, password))
        .catch((err) => console.error(`Fetch problem: ${err.message}`));
      //set page and switch page
      let page = "Main Menu";
      switchPage(page);
    }
  });
}

function createNewUser(fName, lName, email, username, password, builds) {
  let user = {
    first_name: fName,
    last_name: lName,
    email: email,
    username: username,
    password: password,
    builds: builds,
  };

  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function initCreateAccountListeners() {
  $(".create-account-back-button").click(function () {
    let page = "Landing Menu";
    switchPage(page);
  });
  $(".create-account-submit-button").click(function (value) {
    let fName = $("#first_name").val();
    let lName = $("#last_name").val();
    let email = $("#email").val();
    let username = $("#username").val();
    let password = $("#password").val();
    let builds = [];
    console.log(fName, lName, email, username, password, builds);
    createNewUser(fName, lName, email, username, password, builds);
    let page = "Main Menu";
    switchPage(page);
  });
}

function initMainMenuListeners() {
  $("#about-btn").click(function (value) {
    let page = value.currentTarget.innerHTML;
    switchPage(page);
  });
  $("#profile-btn").click(function (value) {
    let page = value.currentTarget.innerHTML;
    switchPage(page);
  });
  $("#contact-btn").click(function (value) {
    let page = value.currentTarget.innerHTML;
    switchPage(page);
  });
  $("#logout-btn").click(function (value) {
    currentUser._id = null;
    currentUser.first_name = null;
    currentUser.last_name = null;
    currentUser.email = null;
    currentUser.username = null;
    currentUser.password = null;
    currentUser.builds = null;
    let page = "Landing Menu";
    switchPage(page);
  });
}

function initAboutListeners() {
  $(".about-back-button").click(function (value) {
    let page = "Main Menu";
    switchPage(page);
  });
}

function initNewBuildListeners() {
  $("#equipped-head").click(function () {
    console.log("display helmets");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/helmets")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("helmet");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $("#equipped-chest").click(function () {
    console.log("display chestplates");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/chestplates")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("shirt");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $("#equipped-legs").click(function () {
    console.log("display leggings");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/leggings")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("pants");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $("#equipped-accessory1").click(function () {
    console.log("display accessories");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("accessory1");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $("#equipped-accessory2").click(function () {
    console.log("display accessories");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("accessory2");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $("#equipped-accessory3").click(function () {
    console.log("display accessories");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("accessory3");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $("#equipped-accessory4").click(function () {
    console.log("display accessories");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("accessory4");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $("#equipped-accessory5").click(function () {
    console.log("display accessories");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("accessory5");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $("#equipped-accessory6").click(function () {
    console.log("display accessories");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("accessory6");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $("#equipped-accessory7").click(function () {
    console.log("display accessories");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("accessory7");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $(".build-back-button").click(function () {
    let page = "Profile";
    switchPage(page);
  });
  $(".build-save-button").click(function () {
    let buildName = $("#build_name").val();
    let buildDescription = $("#build_description").val();
    let buildCheckpoint = $("#build_checkpoint").val();
    console.log(currentBuild);
    let newBuild = {
      name: buildName,
      description: buildDescription,
      game_checkpoint: buildCheckpoint,
      items: currentBuild,
    };
    currentUser.builds.push(newBuild);
    console.log(currentUser);

    fetch(`http://localhost:3000/users/${currentUser._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        let page = "Profile";
        switchPage(page);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}

function addNewBuildData() {
  fetch("http://localhost:3000/helmets")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
      let html = "";
      json.forEach(
        (option) =>
          (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
      );
      $(".build-slot-options").append(html);
      initAddToBuildListeners("helmet");
    })
    .catch((err) => console.error(`Fetch problem: ${err.message}`));
}

function initAddToBuildListeners(slot) {
  $(".build-slot-option").click(function () {
    let selectedItemId = `${this.id}`;
    let selectedItemName = this.getAttribute("data-option-name");
    let selectedItemDefense = this.getAttribute("data-option-defense");
    selectedItemDefense = parseInt(selectedItemDefense);
    let selectedItemImage = `${this.title}`;
    let selectedItem = {
      id: selectedItemId,
      name: selectedItemName,
      defense: selectedItemDefense,
      image: selectedItemImage,
    };
    if (slot == "helmet") {
      currentBuild.helmet = selectedItem.id;
      let html = `<img src=${selectedItem.image} />`;
      $("#equipped-head").empty();
      $("#equipped-head").append(html);
      html = `<p>Name: ${selectedItem.name}</p><p>Defense: ${selectedItem.defense}</p>`;
      $("#build-info-helmet").empty();
      $("#build-info-helmet").append(html);
    } else if (slot == "shirt") {
      currentBuild.chestplate = selectedItem.id;
      let html = `<img src=${selectedItem.image} />`;
      $("#equipped-chest").empty();
      $("#equipped-chest").append(html);
      html = `<p>Name: ${selectedItem.name}</p><p>Defense: ${selectedItem.defense}</p>`;
      $("#build-info-chestplate").empty();
      $("#build-info-chestplate").append(html);
    } else if (slot == "pants") {
      currentBuild.leggings = selectedItem.id;
      let html = `<img src=${selectedItem.image} />`;
      $("#equipped-legs").empty();
      $("#equipped-legs").append(html);
      html = `<p>Name: ${selectedItem.name}</p><p>Defense: ${selectedItem.defense}</p>`;
      $("#build-info-leggings").empty();
      $("#build-info-leggings").append(html);
    } else if (slot == "accessory1") {
      console.log("acc1");
      currentBuild.accessory1 = selectedItem.id;
      let html = `<img src=${selectedItem.image} />`;
      $("#equipped-accessory1").empty();
      $("#equipped-accessory1").append(html);
      html = `<p>Name: ${selectedItem.name}</p><p>Defense: ${selectedItem.defense}</p>`;
      $("#build-info-accessory1").empty();
      $("#build-info-accessory1").append(html);
    } else if (slot == "accessory2") {
      currentBuild.accessory2 = selectedItem.id;
      let html = `<img src=${selectedItem.image} />`;
      $("#equipped-accessory2").empty();
      $("#equipped-accessory2").append(html);
      html = `<p>Name: ${selectedItem.name}</p><p>Defense: ${selectedItem.defense}</p>`;
      $("#build-info-accessory2").empty();
      $("#build-info-accessory2").append(html);
    } else if (slot == "accessory3") {
      currentBuild.accessory3 = selectedItem.id;
      let html = `<img src=${selectedItem.image} />`;
      $("#equipped-accessory3").empty();
      $("#equipped-accessory3").append(html);
      html = `<p>Name: ${selectedItem.name}</p><p>Defense: ${selectedItem.defense}</p>`;
      $("#build-info-accessory3").empty();
      $("#build-info-accessory3").append(html);
    } else if (slot == "accessory4") {
      currentBuild.accessory4 = selectedItem.id;
      let html = `<img src=${selectedItem.image} />`;
      $("#equipped-accessory4").empty();
      $("#equipped-accessory4").append(html);
      html = `<p>Name: ${selectedItem.name}</p><p>Defense: ${selectedItem.defense}</p>`;
      $("#build-info-accessory4").empty();
      $("#build-info-accessory4").append(html);
    } else if (slot == "accessory5") {
      currentBuild.accessory5 = selectedItem.id;
      let html = `<img src=${selectedItem.image} />`;
      $("#equipped-accessory5").empty();
      $("#equipped-accessory5").append(html);
      html = `<p>Name: ${selectedItem.name}</p><p>Defense: ${selectedItem.defense}</p>`;
      $("#build-info-accessory5").empty();
      $("#build-info-accessory5").append(html);
    } else if (slot == "accessory6") {
      currentBuild.accessory6 = selectedItem.id;
      let html = `<img src=${selectedItem.image} />`;
      $("#equipped-accessory6").empty();
      $("#equipped-accessory6").append(html);
      html = `<p>Name: ${selectedItem.name}</p><p>Defense: ${selectedItem.defense}</p>`;
      $("#build-info-accessory6").empty();
      $("#build-info-accessory6").append(html);
    } else if (slot == "accessory7") {
      currentBuild.accessory7 = selectedItem.id;
      let html = `<img src=${selectedItem.image} />`;
      $("#equipped-accessory7").empty();
      $("#equipped-accessory7").append(html);
      html = `<p>Name: ${selectedItem.name}</p><p>Defense: ${selectedItem.defense}</p>`;
      $("#build-info-accessory7").empty();
      $("#build-info-accessory7").append(html);
    }
    console.log(currentBuild);
  });
}

function initEditBuildListeners() {
  $("#equipped-head").click(function () {
    console.log("display helmets");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/helmets")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("helmet");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $("#equipped-chest").click(function () {
    console.log("display chestplates");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/chestplates")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("shirt");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $("#equipped-legs").click(function () {
    console.log("display leggings");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/leggings")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("pants");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $("#equipped-accessory1").click(function () {
    console.log("display accessories");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("accessory1");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $("#equipped-accessory2").click(function () {
    console.log("display accessories");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("accessory2");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $("#equipped-accessory3").click(function () {
    console.log("display accessories");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("accessory3");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $("#equipped-accessory4").click(function () {
    console.log("display accessories");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("accessory4");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $("#equipped-accessory5").click(function () {
    console.log("display accessories");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("accessory5");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $("#equipped-accessory6").click(function () {
    console.log("display accessories");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("accessory6");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $("#equipped-accessory7").click(function () {
    console.log("display accessories");
    $(".build-slot-options").empty();
    fetch("http://localhost:3000/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        let html = "";
        json.forEach(
          (option) =>
            (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
        );
        $(".build-slot-options").append(html);
        initAddToBuildListeners("accessory7");
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  });
  $(".build-back-button").click(function () {
    let page = "Profile";
    switchPage(page);
  });
  $(".build-save-button").click(function () {
    let buildName = currentBuild.name;
    if ($("#build_name").val() == "") {
    } else {
      buildName = $("#build_name").val();
    }
    let buildDescription = currentBuild.description;
    if ($("#build_description").val() !== "") {
    } else {
      buildDescription = $("#build_description").val();
    }
    let buildCheckpoint = currentBuild.game_checkpoint;
    if ($("#build_checkpoint").val() !== "") {
    } else {
      buildCheckpoint = $("#build_checkpoint");
    }
    console.log(currentBuild);
    let newBuild = {
      name: buildName,
      description: buildDescription,
      game_checkpoint: buildCheckpoint,
      items: currentBuild,
    };
    console.log(newBuild);
    let buildIndex = currentUser.builds.findIndex(
      (build) => (build.name = newBuild.name)
    );
    let builds = currentUser.builds;
    builds[buildIndex] = newBuild;
    console.log(currentUser);

    /*
    fetch(`http://localhost:3000/users/${currentUser._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        let page = "Profile";
        switchPage(page);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      */
  });
}

function addUserBuildData() {
  fetch("http://localhost:3000/helmets")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
      let html = "";
      json.forEach(
        (option) =>
          (html += `<div id=${option._id} data-option-name="${option.name}" data-option-defense=${option.defense} title=${option.image} class="build-slot-option"><img src="${option.image}" /></div>`)
      );
      $(".build-slot-options").append(html);
      initAddToBuildListeners("helmet");
      if (currentBuild.helmet != null) {
        $("#equipped-head").append(`<img src=${currentBuild.helmet.image} />`);
        $("#build-info-helmet").append(
          (html = `<p>Name: ${currentBuild.helmet.name}</p><p>Defense: ${currentBuild.helmet.defense}</p>`)
        );
      }
      if (currentBuild.chestplate != null) {
        $("#equipped-chest").append(
          `<img src=${currentBuild.chestplate.image} />`
        );
        $("#build-info-chestplate").append(
          (html = `<p>Name: ${currentBuild.chestplate.name}</p><p>Defense: ${currentBuild.chestplate.defense}</p>`)
        );
      }
      if (currentBuild.leggings != null) {
        $("#equipped-legs").append(
          `<img src=${currentBuild.leggings.image} />`
        );
        $("#build-info-leggings").append(
          (html = `<p>Name: ${currentBuild.leggings.name}</p><p>Defense: ${currentBuild.leggings.defense}</p>`)
        );
      }
      if (currentBuild.accessory1 != null) {
        $("#equipped-accessory1").append(
          `<img src=${currentBuild.accessory1.image} />`
        );
        $("#build-info-accessory1").append(
          (html = `<p>Name: ${currentBuild.accessory1.name}</p><p>Defense: ${currentBuild.accessory1.defense}</p>`)
        );
      }
      if (currentBuild.accessory2 != null) {
        $("#equipped-accessory2").append(
          `<img src=${currentBuild.accessory2.image} />`
        );
        $("#build-info-accessory2").append(
          (html = `<p>Name: ${currentBuild.accessory2.name}</p><p>Defense: ${currentBuild.accessory2.defense}</p>`)
        );
      }
      if (currentBuild.accessory3 != null) {
        $("#equipped-accessory3").append(
          `<img src=${currentBuild.accessory3.image} />`
        );
        $("#build-info-accessory3").append(
          (html = `<p>Name: ${currentBuild.accessory3.name}</p><p>Defense: ${currentBuild.accessory3.defense}</p>`)
        );
      }
      if (currentBuild.accessory4 != null) {
        $("#equipped-accessory4").append(
          `<img src=${currentBuild.accessory4.image} />`
        );
        $("#build-info-accessory4").append(
          (html = `<p>Name: ${currentBuild.accessory4.name}</p><p>Defense: ${currentBuild.accessory4.defense}</p>`)
        );
      }
      if (currentBuild.accessory5 != null) {
        $("#equipped-accessory5").append(
          `<img src=${currentBuild.accessory5.image} />`
        );
        $("#build-info-accessory5").append(
          (html = `<p>Name: ${currentBuild.accessory5.name}</p><p>Defense: ${currentBuild.accessory5.defense}</p>`)
        );
      }
      if (currentBuild.accessory6 != null) {
        $("#equipped-accessory6").append(
          `<img src=${currentBuild.accessory6.image} />`
        );
        $("#build-info-accessory6").append(
          (html = `<p>Name: ${currentBuild.accessory6.name}</p><p>Defense: ${currentBuild.accessory6.defense}</p>`)
        );
      }
      if (currentBuild.accessory7 != null) {
        $("#equipped-accessory7").append(
          `<img src=${currentBuild.accessory7.image} />`
        );
        $("#build-info-accessory7").append(
          (html = `<p>Name: ${currentBuild.accessory7.name}</p><p>Defense: ${currentBuild.accessory7.defense}</p>`)
        );
      }
    })
    .catch((err) => console.error(`Fetch problem: ${err.message}`));
}

function initProfileBuildListeners() {
  $(".profile-build").click(function (value) {
    buildName = this.getAttribute("data-build-name");
    let build = currentUser.builds.find((build) => build.name == buildName);
    console.log(build);
    fetch("http://localhost:3000/helmets")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        currentBuild.helmet = json.find(
          (helmet) => helmet._id === build.items.helmet
        );
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
    fetch("http://localhost:3000/chestplates")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        currentBuild.chestplate = json.find(
          (chestplate) => chestplate._id === build.items.chestplate
        );
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
    fetch("http://localhost:3000/leggings")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        currentBuild.leggings = json.find(
          (legging) => legging._id === build.items.leggings
        );
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
    fetch("http://localhost:3000/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        currentBuild.accessory1 = json.find(
          (accessory) => accessory._id === build.items.accessory1
        );
        currentBuild.accessory2 = json.find(
          (accessory) => accessory._id === build.items.accessory2
        );
        currentBuild.accessory3 = json.find(
          (accessory) => accessory._id === build.items.accessory3
        );
        currentBuild.accessory4 = json.find(
          (accessory) => accessory._id === build.items.accessory4
        );
        currentBuild.accessory5 = json.find(
          (accessory) => accessory._id === build.items.accessory5
        );
        currentBuild.accessory6 = json.find(
          (accessory) => accessory._id === build.items.accessory6
        );
        currentBuild.accessory7 = json.find(
          (accessory) => accessory._id === build.items.accessory7
        );
      })
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
    console.log(currentBuild);
    let page = "Edit Build";
    switchPage(page);
  });
}

function initProfileListeners() {
  $(".profile-back-button").click(function () {
    let page = "Main Menu";
    switchPage(page);
  });
  $(".profile-new-button").click(function () {
    let page = "New Build";
    switchPage(page);
  });
}

function addUserProfileData() {
  let name = currentUser.first_name + " " + currentUser.last_name;
  let email = currentUser.email;
  let username = currentUser.username;
  let builds = currentUser.builds;
  console.log(name, email, username, builds);
  $("#profile-name").append(name);
  $("#profile-email").append(email);
  $("#profile-username").append(username);

  builds.forEach((build) => {
    $(".profile-builds-wrapper").append(`
    <div class="profile-build" data-build-name="${build.name}">
      <div class="profile-build-image"></div>
      <div class="profile-build-name">
        <p>${build.name}</p>
      </div>
      <div class="profile-build-description">
        <p>${build.description}</p>
      </div>
      <div class="profile-build-checkpoint">
        <p>${build.game_checkpoint}</p>
      </div>
    </div>
    `);
  });

  currentBuild.helmet = null;
  currentBuild.chestplate = null;
  currentBuild.leggings = null;
  currentBuild.accessory1 = null;
  currentBuild.accessory2 = null;
  currentBuild.accessory3 = null;
  currentBuild.accessory4 = null;
  currentBuild.accessory5 = null;
  currentBuild.accessory6 = null;
  currentBuild.accessory7 = null;
}

function sendEmail(name, subject, message) {
  window.open(
    `mailto:jcapp42@gmail.com?subject=From ${name} about ${subject}&body=${message}`
  );
}

function initContactListeners() {
  $(".contact-back-button").click(function () {
    let page = "Main Menu";
    switchPage(page);
  });
  $(".contact-send-button").click(function () {
    console.log("send email");
    let fName = $("#first_name").val();
    let lName = $("#last_name").val();
    let name = fName + " " + lName;
    let subject = $("#subject").val();
    let message = $("#message").val();
    sendEmail(name, subject, message);
  });
}

function loadAbout() {
  $.get("../views/about.html", function (about) {
    $(".wrapper").html(about);
    initAboutListeners();
  });
}

function loadProfile() {
  $.get("../views/profile.html", function (profile) {
    $(".wrapper").html(profile);
    addUserProfileData();
    initProfileBuildListeners();
    initProfileListeners();
  });
}

function loadNewBuild() {
  $.get("../views/new-build.html", function (new_build) {
    $(".wrapper").html(new_build);
    addNewBuildData();
    initNewBuildListeners();
  });
}

function loadEditBuild() {
  $.get("../views/edit-build.html", function (edit_build) {
    $(".wrapper").html(edit_build);
    initEditBuildListeners();
    addUserBuildData();
  });
}

function loadContact() {
  $.get("../views/contact.html", function (contact) {
    $(".wrapper").html(contact);
    initContactListeners();
  });
}

function loadMainMenu() {
  $.get("../views/main-menu.html", function (main_menu) {
    $(".wrapper").html(main_menu);
    initMainMenuListeners();
  });
}

function loadLogin() {
  $.get("../views/login.html", function (login) {
    $(".wrapper").html(login);
    initLoginListeners();
  });
}

function loadCreateAccount() {
  $.get("../views/create-account.html", function (create_account) {
    $(".wrapper").html(create_account);
    initCreateAccountListeners();
  });
}

function loadLandingMenu() {
  $.get("../views/landing-menu.html", function (landing_menu) {
    $(".wrapper").html(landing_menu);
    initLandingMenuListeners();
  });
}

function switchPage(page) {
  console.log(page);
  if (page == "About") {
    $(".wrapper").empty();
    loadAbout();
  } else if (page == "Profile") {
    $(".wrapper").empty();
    loadProfile();
  } else if (page == "New Build") {
    $(".wrapper").empty();
    loadNewBuild();
  } else if (page == "Edit Build") {
    $(".wrapper").empty();
    loadEditBuild();
  } else if (page == "Contact") {
    $(".wrapper").empty();
    loadContact();
  } else if (page == "Main Menu") {
    $(".wrapper").empty();
    loadMainMenu();
  } else if (page == "Login") {
    $(".wrapper").empty();
    loadLogin();
  } else if (page == "Create Account") {
    $(".wrapper").empty();
    loadCreateAccount();
  } else if (page == "Landing Menu") {
    $(".wrapper").empty();
    loadLandingMenu();
  }
}

//sets up click listeners for landing menu buttons
function initLandingMenuListeners() {
  $("#login-btn").click(function (value) {
    //sets page to login
    let page = value.currentTarget.innerHTML;
    //switches view to login page
    switchPage(page);
  });
  $("#create-account-btn").click(function (value) {
    //sets page to create account
    let page = value.currentTarget.innerHTML;
    //switches view to create account
    switchPage(page);
  });
}

//gets landing menu view
//inits landing menu listeners
function initSite() {
  $.get("../views/landing-menu.html", function (landing_menu) {
    $(".wrapper").html(landing_menu);
    initLandingMenuListeners();
  });
}

//run initSite on document ready
$(document).ready(function () {
  initSite();
});
