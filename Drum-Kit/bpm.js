const bpmInput = document.querySelector("#bpm-input");
const bpmSelect = document.getElementById("bpm-select");
const toggleMetronomeButton = document.querySelector("#start-metronome");

const metronome = document.getElementById("metronome");
const wildcardSelectedOption = bpmSelect.querySelector("#empty");

export let isMetronome = false;
export let bpm = 100;

function updateBPM(e) {
  bpm = e.target.value;
  wildcardSelectedOption.textContent = `${bpm} BPM`;
  wildcardSelectedOption.style.display = "block";
  bpmSelect.value = "";
}

function updateBPMSelect(e) {
  bpm = e.target.value;
  bpmInput.value = e.target.value;
  wildcardSelectedOption.style.display = "none";
}

export function playMetronme() {
  metronome.play();
}

function prepareMetronome() {
  isMetronome = !isMetronome;
  toggleMetronomeButton.classList.toggle("active");
}

bpmInput.addEventListener("input", updateBPM);
bpmSelect.addEventListener("change", updateBPMSelect);

toggleMetronomeButton.addEventListener("click", prepareMetronome);
