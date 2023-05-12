const mainContent = document.querySelector('.main');
const header = document.querySelector('.header');
let headerHeight = 0;

window.addEventListener('load', mainPaddingTop);
window.addEventListener('resize', mainPaddingTop);

// MAIN PADDING-TOP OPTIONS
function mainPaddingTop() {
  headerHeight = header.getBoundingClientRect().height;
  mainContent.style.paddingTop = headerHeight + 'px';
}
