import { startTimer, stopTimer, formatNumber } from "./timer.js";

window.addEventListener("keydown", playSound);

const timerDashElement = document.querySelector("#timer-dash");
const recordHourElement = document.querySelector("#record-hour");
const recordMinuteElement = document.querySelector("#record-minute");
const recordSecondElement = document.querySelector("#record-second");
const recordMillisecondElement = document.querySelector("#record-millisecond");
const recordTimerArray = [
  timerDashElement,
  recordHourElement,
  recordMinuteElement,
  recordSecondElement,
  recordMillisecondElement,
];

let timeNow;
let isRecording = false;
let recorded = [];
let recordedTimeoutIds = [];
let timerTimeoutId;

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  if (!audio) return;

  audio.currentTime = 0;
  audio.play();

  key.classList.add("playing");
  setTimeout(() => {
    key.classList.remove("playing");
  }, 100);

  if (isRecording) {
    recorded.push({
      key: e.keyCode,
      time: Date.now() - timeNow,
    });
  }
}

const recordButton = document.querySelector("#start-recording");
const playRecordingButton = document.querySelector("#play-recording");

recordButton.addEventListener("click", () => {
  recordButton.classList.toggle("active");
  isRecording = !isRecording;

  if (isRecording) {
    recordTimerArray.forEach((element) => {
      element.classList.add("hidden");
    });
    recorded = [];
    timeNow = Date.now();
    startTimer();
  } else {
    stopTimer();
  }
});

playRecordingButton.addEventListener("click", () => {
  recordedTimeoutIds.forEach((id) => clearTimeout(id));
  clearTimeout(timerTimeoutId);
  recordedTimeoutIds = [];

  recorded.forEach((record) => {
    let timeoutId = setTimeout(() => {
      const audio = document.querySelector(`audio[data-key="${record.key}"]`);
      audio.currentTime = 0;
      audio.play();
    }, record.time);
    recordedTimeoutIds.push(timeoutId);
  });

  if (recorded.length > 0) {
    const duration = recorded[recorded.length - 1].time + 1000;

    const { hours, minutes, seconds, ms } = formatTime(duration);

    const durationArrat = [hours, minutes, seconds, ms];

    recordTimerArray.forEach((element, index) => {
      element.classList.remove("hidden");
      if (index != 0) {
        element.textContent = `${formatNumber(durationArrat[index - 1])}:`;
      }
    });

    if (hours == 0) {
      recordHourElement.classList.add("hidden");
    }

    recordMillisecondElement.textContent =
      recordMillisecondElement.textContent.slice(0, -1);

    startTimer();
    timerTimeoutId = setTimeout(stopTimer, duration);
  }
});

function formatTime(milliseconds) {
  var hours = Math.floor(milliseconds / (1000 * 60 * 60));
  var minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  var ms = milliseconds % 1000;

  return { hours, minutes, seconds, ms };
}
