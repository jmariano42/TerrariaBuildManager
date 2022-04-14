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
    initListeners();
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
  }
}

function initListeners() {
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

function initSite() {
  $.get("../views/main-menu.html", function (main_menu) {
    $(".wrapper").html(main_menu);
    initListeners();
  });
}

$(document).ready(function () {
  initSite();
});
