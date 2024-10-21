<<<<<<< HEAD
// hamburger = document.querySelector(".hamburger");
// hamburger.onclick = function () {
//   navBar = document.querySelector(".nav-bar");
//   navBar.classList.toggle("active");
// };
window.onload = function () {
  const menu_btn = document.querySelector(".hamburger");
  const mobile_menu = document.querySelector(".mobile-nav");
  menu_btn.addEventListener("click", function () {
    menu_btn.classList.toggle("is-active");
    mobile_menu.classList.toggle("is-active");
  });
};

let darkmode = localStorage.getItem('darkmodeNebula')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkmode = () => {
  document.body.classList.add('darkmode')
  localStorage.setItem('darkmodeNebula', 'active')
}

const disableDarkmode = () => {
  document.body.classList.remove('darkmode')
  localStorage.setItem('darkmodeNebula', null)
}

if(darkmode === "active") enableDarkmode()

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmodeNebula')
  darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})
=======
document.addEventListener("DOMContentLoaded", function () {
  // Select the hamburger button
  const menu_btn = document.querySelector(".hamburger");
  // Select the mobile navigation menu
  const mobile_menu = document.querySelector(".mobile-nav");

  // Check if the elements exist in the DOM before adding event listeners
  if (menu_btn && mobile_menu) {
    // Add an event listener to toggle the 'is-active' class when the hamburger button is clicked
    menu_btn.addEventListener("click", function () {
      menu_btn.classList.toggle("is-active");
      mobile_menu.classList.toggle("is-active");
    });
  } else {
    console.error("Menu button or mobile navigation not found");
  }
});
>>>>>>> c6ab4867c1ced834d40b06a18ed4db5951a9a358
