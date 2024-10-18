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
