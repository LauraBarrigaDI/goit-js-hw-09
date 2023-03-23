import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    const selectedDate = selectedDates[0];
    if (selectedDate < currentDate) {
      window.alert("Please choose a date in the future");
    } else {
      button.disabled = false;
      // start countdown
      const button = document.getElementById("start-button");
      button.addEventListener("click",() => {
  const selectedDate = selectedDates[0];
  countdownTimer = setInterval(() => {
    const timeRemaining = selectedDate.getTime() - new Date().getTime();
    if (timeRemaining <= 0) {
      clearInterval(countdownTimer);
      // countdown finished
    } else {
      // update UI with time remaining
    }
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
};

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
};

flatpickr("#datetime-picker", options);
