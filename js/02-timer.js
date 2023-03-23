import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateTimePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("#start-btn");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    // Check if selected date is in the future
    if (selectedDate < new Date()) {
      window.alert("Please choose a date in the future");
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
});

let countdownInterval;

startBtn.addEventListener("click", () => {
  const targetDate = new Date(dateTimePicker.value);
  countdownInterval = setInterval(() => {
    const timeLeft = targetDate - new Date();
    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      updateTimer(0, 0, 0, 0);
      startBtn.disabled = true;
      return;
    }
    const timeLeftObj = convertMs(timeLeft);
    updateTimer(
      timeLeftObj.days,
      timeLeftObj.hours,
      timeLeftObj.minutes,
      timeLeftObj.seconds
    );
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

function updateTimer(days, hours, minutes, seconds) {
daysEl.textContent = addLeadingZero(days);
hoursEl.textContent = addLeadingZero(hours);
minutesEl.textContent = addLeadingZero(minutes);
secondsEl.textContent = addLeadingZero(seconds);
}

dateTimePicker.addEventListener("change", () => {
clearInterval(countdownInterval);
startBtn.disabled = true;
updateTimer(0, 0, 0, 0);
});
