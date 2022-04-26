const currentUser = {
  _id: null,
  first_name: null,
  last_name: null,
  email: null,
  username: null,
  password: null,
  builds: null,
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
  $(".create-account-submit-btn").click(function (value) {
    let fName = $("#first_name").val();
    let lName = $("#last_name").val();
    let email = $("#email").val();
    let username = $("#username").val();
    let password = $("#password").val();
    let builds = [];
    console.log(fName, lName, email, username, password, builds);
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
  });
  $("#equipped-chest").click(function () {
    console.log("display chestplates");
  });
  $("#equipped-legs").click(function () {
    console.log("display leggings");
  });
  $("#equipped-accessory1").click(function () {
    console.log("display accessories");
  });
  $("#equipped-accessory2").click(function () {
    console.log("display accessories");
  });
  $("#equipped-accessory3").click(function () {
    console.log("display accessories");
  });
  $("#equipped-accessory4").click(function () {
    console.log("display accessories");
  });
  $("#equipped-accessory5").click(function () {
    console.log("display accessories");
  });
  $("#equipped-accessory6").click(function () {
    console.log("display accessories");
  });
  $("#equipped-accessory7").click(function () {
    console.log("display accessories");
  });
  $(".build-back-button").click(function () {
    let page = "Profile";
    switchPage(page);
  });
  $(".build-save-button").click(function () {
    $.get("../views/new-build.html", function (new_build) {
      $(".wrapper").html(new_build);
      initNewBuildListeners();
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
      console.log(json);
      let html = "";
      json.forEach((option) => console.log(option));
      json.forEach(
        (option) =>
          (html += `<div id=${option._id} class="build-slot-option"><img src="${option.image}" /></div>`)
      );
      $(".build-slot-options").append(html);
    })
    .catch((err) => console.error(`Fetch problem: ${err.message}`));
}

function initEditBuildListeners() {
  $(".build-back-button").click(function () {
    let page = "Profile";
    switchPage(page);
  });
  $(".build-save-button").click(function () {
    $.get("../views/new-build.html", function (new_build) {
      $(".wrapper").html(new_build);
      initNewBuildListeners();
    });
  });
}

function addUserBuildData() {}

function initProfileListeners() {
  $(".profile-build").click(function (value) {
    console.log(value);
    let page = "Edit Build";
    switchPage(page);
  });
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
    <div class="profile-build">
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
    addUserBuildData();
    initEditBuildListeners();
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
