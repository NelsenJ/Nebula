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
