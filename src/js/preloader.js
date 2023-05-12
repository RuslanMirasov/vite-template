const preloaderWrapper = document.querySelector('.preloader');
const preloaderProcent = document.querySelector('[data-preloader]');
const preloaderSvg = document.querySelector('.preloader__svg');
const mediaFiles = document.querySelectorAll('img, svg, video, audio');

window.addEventListener('load', preloaderHide);

//PRELOADER
let i = 0;

mediaFiles.forEach(file => {
  file.onload = () => {
    i++;
    preloaderProcent.innerHTML = ((i * 100) / mediaFiles.length).toFixed() + '%';
    preloaderSvg.style.width = ((i * 100) / mediaFiles.length).toFixed(1) + '%';
  };
});

function preloaderHide() {
  preloaderProcent.innerHTML = '100%';
  preloaderSvg.style.width = '100%';
  setTimeout(function () {
    preloaderWrapper.classList.add('is--hidden');
  }, 300);
}
