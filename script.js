// ===== ELEMENT REFERENCES =====
const unit = document.getElementById("unit");

const cmBox = document.getElementById("cmBox");
const ftBox = document.getElementById("ftBox");

const heightCm = document.getElementById("heightCm");
const heightFt = document.getElementById("heightFt");
const heightIn = document.getElementById("heightIn");
const weight = document.getElementById("weight");

const bmiEl = document.getElementById("bmi");
const statusEl = document.getElementById("status");

// ===== UNIT TOGGLE =====
unit.addEventListener("change", () => {
  cmBox.classList.toggle("hidden", unit.value !== "cm");
  ftBox.classList.toggle("hidden", unit.value !== "ft");
  calculateBMI();
});

// ===== BMI CALCULATION =====
function calculateBMI() {
  let heightMeters = 0;

  if (unit.value === "cm") {
    const cm = parseFloat(heightCm.value);
    if (!cm || cm <= 0) return reset();
    heightMeters = cm / 100;
  } else {
    const ft = parseFloat(heightFt.value) || 0;
    const inch = parseFloat(heightIn.value) || 0;
    const totalInches = ft * 12 + inch;
    if (totalInches <= 0) return reset();
    heightMeters = totalInches * 0.0254;
  }

  const w = parseFloat(weight.value);
  if (!w || w <= 0) return reset();

  const bmi = w / (heightMeters ** 2);
  bmiEl.textContent = bmi.toFixed(1);
  statusEl.textContent = getStatus(bmi);
}

// ===== BMI STATUS =====
function getStatus(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

// ===== RESET =====
function reset() {
  bmiEl.textContent = "--";
  statusEl.textContent = "";
}

// ===== LIVE UPDATE =====
document
  .querySelectorAll("input, select")
  .forEach(el => el.addEventListener("input", calculateBMI));
