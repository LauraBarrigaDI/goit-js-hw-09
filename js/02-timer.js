import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    // Disable start button if selected date is in the past
    if (selectedDate < new Date()) {
      window.alert("Please choose a date in the future");
      document.getElementById("start-btn").disabled = true;
    } else {
      document.getElementById("start-btn").disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

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

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

let countdownInterval;

document.getElementById("start-btn").addEventListener("click", () => {
  const selectedDate = new Date(document.getElementById("datetime-picker").value);

  countdownInterval = setInterval(() => {
    const timeLeft = selectedDate.getTime() - Date.now();

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("timer").textContent = "00:00:00:00";
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    const timerText = `${addLeadingZero(days)}:${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
    document.getElementById("timer").textContent = timerText;
  }, 1000);
});
