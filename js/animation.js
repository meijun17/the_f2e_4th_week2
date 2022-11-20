const animation = bodymovin.loadAnimation({
  container: document.getElementById("lottie"),
  path: "./images/GNsign_loading.json",
  renderer: "svg",
  loop: true,
  autoplay: true,
  name: "loading",
});

var animation_downloadOK = bodymovin.loadAnimation({
  container: document.getElementById("downloadOk"), // Required
  path: "./images/ok.json", // Required
  renderer: "svg", // Required
  loop: true, // Optional
  autoplay: true, // Optional
  name: "downloadOk", // Name for future reference. Optional.
});

$(document).ready(function () {
  $(".sign__content,.pdf__content,.downloadOk").hide();
  $(".loading,.plant").fadeOut(2000);
  $(".sign__content,.pdf__content").delay(1500).fadeIn(700);
});
