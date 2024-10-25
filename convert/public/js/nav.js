window.onload = function () {
  const menu_btn = document.querySelector(".hamburger");
  const mobile_menu = document.querySelector(".mobile-nav");
  menu_btn.addEventListener("click", function () {
    menu_btn.classList.toggle("is-active");
    mobile_menu.classList.toggle("is-active");
  });

};

window.addEventListener('DOMContentLoaded', () => {
  const storedName = localStorage.getItem('name');
  if (storedName) document.getElementById('name').innerHTML = storedName;

  const avatar = document.getElementById('avatar');
  const storedAvatar = localStorage.getItem('avatar');

  const setDefaultAvatar = (gender) => {
    if (gender === 'male') {
        avatar.style.backgroundImage = 'url(/images/profile/boy.png)';
    } else {
        avatar.style.backgroundImage = 'url(/images/profile/female.png)';
    }
  };

  if (storedAvatar) {
    avatar.style.backgroundImage = `url(${storedAvatar})`;
  } else if (storedGender) {
      setDefaultAvatar(storedGender);
  }
});




