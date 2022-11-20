const animation = bodymovin.loadAnimation({
  container: document.getElementById("lottie"),
  path: "./images/GNsign_loading.json",
  renderer: "svg",
  loop: true,
  autoplay: true,
  name: "loading",
});

$(document).ready(function () {
  $(".sign__content,.pdf__content,.downloadOk").hide();
  $(".loading,.plant").fadeOut(2000);
  $(".sign__content,.pdf__content").delay(1500).fadeIn(700);
});
