import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr("#datetime-picker", options);

const currentDate = new Date();
const selectedDate = selectedDates[0];
if (selectedDate < currentDate) {
  window.alert("Please choose a date in the future");
} else {
   button.disabled = false;
  // start countdown
}

const button = document.getElementById("button");
button.disabled = true;

let countdownTimer;
const button = document.getElementById("button");
startButton.addEventListener("click", () => {
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
