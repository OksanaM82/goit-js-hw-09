import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import convertMs from './dateConvert';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const imputDatePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let timeDifference = 0;
let timerId = null;
let formatDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentDifferenceDate(selectedDates[0]);
  },
};

btnStart.setAttribute('disabled', true);

flatpickr(imputDatePicker, options);

btnStart.addEventListener('click', onBtnStart);

window.addEventListener('keydown', e => {
  if (e.code === 'Escape' && timerId) {
    clearInterval(timerId);

    imputDatePicker.removeAttribute('disabled');
    btnStart.setAttribute('disabled', true);

    seconds.textContent = '00';
    minutes.textContent = '00';
    hours.textContent = '00';
    days.textContent = '00';
  }
});

function onBtnStart() {
  timerId = setInterval(startTimer, 1000);
}

//date checking and rendering of date difference
function currentDifferenceDate(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    btnStart.setAttribute('disabled', true);
    return Notify.failure('Please choose a date in the future');
  }

  timeDifference = selectedDates.getTime() - currentDate;
  formatDate = convertMs(timeDifference);

  renderDate(formatDate);
  btnStart.removeAttribute('disabled');
}

//Timer
function startTimer() {
  btnStart.setAttribute('disabled', true);
  imputDatePicker.setAttribute('disabled', true);

  timeDifference -= 1000;

  if (seconds.textContent <= 0 && minutes.textContent <= 0) {
    Notify.success('Time end');
    clearInterval(timerId);
  } else {
    formatDate = convertMs(timeDifference);
    renderDate(formatDate);
  }
}

// Rendering date
function renderDate(formatDate) {
  seconds.textContent = formatDate.seconds;
  minutes.textContent = formatDate.minutes;
  hours.textContent = formatDate.hours;
  days.textContent = formatDate.days;
}
