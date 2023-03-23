import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datePicker = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    const selectedDate = selectedDates[0];
    if (selectedDate < now) {
      window.alert("Please choose a date in the future");
      document.querySelector("button[data-start]").disabled = true;
      return;
    }
    document.querySelector("button[data-start]").disabled = false;
  },
});

document.querySelector("button[data-start]").addEventListener("click", () => {
  const targetDate = datePicker.selectedDates[0].getTime();
  let countdownInterval;
  const countdown = () => {
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;
    if (timeRemaining < 0) {
      clearInterval(countdownInterval);
      document.querySelectorAll("[data-days], [data-hours], [data-minutes], [data-seconds]").forEach((element) => {
        element.textContent = "00";
      });
      return;
    }
    const time = convertMs(timeRemaining);
    document.querySelector("[data-days]").textContent = time.days.toString().padStart(2, "0");
    document.querySelector("[data-hours]").textContent = time.hours.toString().padStart(2, "0");
    document.querySelector("[data-minutes]").textContent = time.minutes.toString().padStart(2, "0");
    document.querySelector("[data-seconds]").textContent = time.seconds.toString().padStart(2, "0");
  };
  countdown();
  countdownInterval = setInterval(countdown, 1000);
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
