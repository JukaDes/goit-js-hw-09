import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('[data-start]');
const countdownDays = document.querySelector('[data-days]');
const countdownHours = document.querySelector('[data-hours]');
const countdownMinutes = document.querySelector('[data-minutes]');
const countdownSeconds = document.querySelector('[data-seconds]');

startButton.setAttribute('disabled', true);

let startDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const currentDate = new Date();
    startDate = selectedDates[0];

    if (startDate > currentDate) {
      startButton.removeAttribute('disabled', true);
    } else {
      window.alert('Please choose a date in the future');
      startButton.setAttribute('disabled', true);
    }
  },
};

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', onStartTimer);

function onStartTimer() {
  const timerId = setInterval(() => {
    const currentDate = Date.now();
    const timerDate = startDate - currentDate;
    const convertTimerDate = convertMs(timerDate);
    if (
      convertTimerDate.days === '00' &&
      convertTimerDate.hours === '00' &&
      convertTimerDate.minutes === '00' &&
      convertTimerDate.seconds === '00'
    ) {
      clearInterval(timerId);
    }
    updateTimerDate(convertTimerDate);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDate({ days, hours, minutes, seconds }) {
  countdownDays.textContent = days;
  countdownHours.textContent = hours;
  countdownMinutes.textContent = minutes;
  countdownSeconds.textContent = seconds;
}
