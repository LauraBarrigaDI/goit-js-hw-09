import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const flatpickr = require("flatpickr");

const datePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minutesValue = document.querySelector("[data-minutes]");
const secondsValue = document.querySelector("[data-seconds]");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      window.alert("Please choose a date in the future.");
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(datePicker, options);

let countdownInterval;

startBtn.addEventListener("click", () => {
  const countdownDate = new Date(datePicker.value).getTime();

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      daysValue.innerText = "00";
      hoursValue.innerText = "00";
      minutesValue.innerText = "00";
      secondsValue.innerText = "00";
      startBtn.disabled = true;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(distance);
    daysValue.innerText = days < 10 ? "0" + days : days;
    hoursValue.innerText = hours < 10 ? "0" + hours : hours;
    minutesValue.innerText = minutes < 10 ? "0" + minutes : minutes;
    secondsValue.innerText = seconds < 10 ? "0" + seconds : seconds;
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}