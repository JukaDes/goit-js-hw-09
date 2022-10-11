let interval = null;
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const buttonConteiner = document.querySelector('.button-conteiner')
const body = document.querySelector('body');

buttonConteiner.setAttribute('style', 'text-align: center;')
startButton.setAttribute(
  'style',
  'width: 20%; min-width: 60px; height: 50px; font-size: 20px; border: none; cursor: pointer;'
);
stopButton.setAttribute(
  'style',
  'width: 20%; min-width: 60px; height: 50px; font-size: 20px; border: none; cursor: pointer;'
);
stopButton.setAttribute('disabled', true);

startButton.addEventListener('click', onChangeColor);
stopButton.addEventListener('click', onStopChangeColor);

function onChangeColor() {
  interval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.setAttribute('disabled', true);
  stopButton.removeAttribute('disabled', true);
}

function onStopChangeColor() {
  clearInterval(interval);
  startButton.removeAttribute('disabled', true);
  stopButton.setAttribute('disabled', true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}