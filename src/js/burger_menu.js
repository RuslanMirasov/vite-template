const openMenuBtn = document.querySelectorAll('[data-menu-open]');
const menu = document.querySelector('.menu-backdrop');
const burger = document.querySelector('.burger');
const body = document.querySelector('.body');

// MOBIL MENU OPEN / CLOSE
openMenuBtn.forEach(openBtn => {
  openBtn.addEventListener('click', menuToggle);
});

function menuToggle() {
  menu.classList.toggle('is-open');
  burger.classList.toggle('is-open');
  body.classList.toggle('lock');
}
