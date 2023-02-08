import getRandomHexColor from './randomHexColor';
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;
startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    let hexColor = getRandomHexColor();
    document.body.style.backgroundColor = hexColor;
  }, 1000);
  startBtn.toggleAttribute('disabled');
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
});
