//function checks inputted user credentials
function authenicateUser(users, username, password) {
  //find user with given username
  let foundUser = users.find((user) => user.username === username);
  //check to see if a user was found
  if (!foundUser) {
    //if no user is found then send user back to login
    let page = "Login";
    switchPage(page);
  } else {
    //check if password given matches user password
    if (foundUser.password === password) {
      //user is authenticated
      console.log("User Authenticated");
    } else {
      //if password does not match then send user back to login
      let page = "Login";
      switchPage(page);
    }
  }
}

//login page listeners
function initLoginListeners() {
  $("#login-submit-btn").click(function (value) {
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
  $(".login-submit-btn").click(function (value) {
    let username = $("#username").val();
    let password = $("#password").val();
    console.log(value);
    let page = "Main Menu";
    switchPage(page);
  });
}

function initCreateAccountListeners() {
  $("#create-account-submit-btn").click(function (value) {
    let fName = $("#first_name").val();
    let lName = $("#last_name").val();
    let email = $("#email").val();
    let username = $("#username").val();
    let password = $("#password").val();
    console.log(fName, lName, email, username, password);
    let page = "Main Menu";
    switchPage(page);
  });
  $(".create-account-submit-btn").click(function (value) {
    let fName = $("#first_name").val();
    let lName = $("#last_name").val();
    let email = $("#email").val();
    let username = $("#username").val();
    let password = $("#password").val();
    console.log(fName, lName, email, username, password);
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
}

function initAboutListeners() {
  $("#about-back-btn").click(function (value) {
    let page = "Main Menu";
    switchPage(page);
  });
  $(".about-back-btn").click(function (value) {
    let page = "Main Menu";
    switchPage(page);
  });
}

function initNewBuildListeners() {}

function initProfileLIsteners() {
  $("#profile-back-btn").click(function () {
    let page = "Main Menu";
    switchPage(page);
  });
  $(".profile-back-button").click(function () {
    let page = "Main Menu";
    switchPage(page);
  });
  $("#profile-new-btn").click(function () {
    $.get("../views/new-build.html", function (new_build) {
      $(".wrapper").html(new_build);
      initNewBuildListeners();
    });
  });
  $(".profile-new-button").click(function () {
    $.get("../views/new-build.html", function (new_build) {
      $(".wrapper").html(new_build);
      initNewBuildListeners();
    });
  });
}

function initContactListeners() {
  $("#contact-back-btn").click(function () {
    let page = "Main Menu";
    switchPage(page);
  });
  $(".contact-back-button").click(function () {
    let page = "Main Menu";
    switchPage(page);
  });
  $("#contact-send-btn").click(function () {
    console.log("send email");
  });
  $(".contact-send-button").click(function () {
    console.log("send email");
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
    initProfileLIsteners();
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

function switchPage(page) {
  if (page == "About") {
    $(".wrapper").empty();
    loadAbout();
  } else if (page == "Profile") {
    $(".wrapper").empty();
    loadProfile();
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
  }
}

function initLandingMenuListeners() {
  $("#login-btn").click(function (value) {
    let page = value.currentTarget.innerHTML;
    switchPage(page);
  });
  $("#create-account-btn").click(function (value) {
    let page = value.currentTarget.innerHTML;
    switchPage(page);
  });
}

function initSite() {
  $.get("../views/landing-menu.html", function (landing_menu) {
    $(".wrapper").html(landing_menu);
    initLandingMenuListeners();
  });
}

$(document).ready(function () {
  initSite();
});
