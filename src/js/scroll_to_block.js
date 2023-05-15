const scrollLinks = document.querySelectorAll('[data-scrollto]');
const header = document.querySelector('.header');
const body = document.querySelector('.body');
const menu = document.querySelector('.menu-backdrop');
const burger = document.querySelector('.burger');

// SCROLL TO BLOCK
scrollLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    let distance = document.querySelector('.' + this.dataset.scrollto).offsetTop - header.getBoundingClientRect().height;
    window.scrollTo({ top: distance, left: 0, behavior: 'smooth' });
    if (body.classList.contains('lock')) {
      menu.classList.toggle('is-open');
      burger.classList.toggle('is-open');
      body.classList.toggle('lock');
    }
  });
});
