// PAGE SWITCHING
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// PRACTICE MODE
function startPractice(topic) {
  const area = document.getElementById("practiceArea");
  const p = generateProblem(topic);

  area.innerHTML = `
    <div class="problem-box">
      <p>${p.question}</p>
      <input id="answerInput">
      <button onclick="checkPracticeAnswer(${p.answer}, '${p.explanation}')">Check</button>
    </div>
  `;
}

function checkPracticeAnswer(correct, explanation) {
  const input = Number(document.getElementById("answerInput").value);
  const area = document.getElementById("practiceArea");

  const isCorrect = input === correct;

  area.innerHTML = `
    <div class="problem-box">
      <p class="${isCorrect ? "correct" : "incorrect"}">
        ${isCorrect ? "Correct!" : "Incorrect. Answer: " + correct}
      </p>
      <p>${explanation}</p>
      <button onclick="startPractice('algebra')">Next Problem</button>
    </div>
  `;
}

// PROBLEM GENERATORS
function generateProblem(topic) {

  // ALGEBRA (already existed)
  if (topic === "algebra") {
    const x = Math.floor(Math.random() * 10) + 1;
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 10);

    return {
      question: `Solve: ${a}x + ${b} = ${a * x + b}`,
      answer: x,
      explanation: `Subtract ${b}, then divide by ${a}.`
    };
  }

  // GEOMETRY
  if (topic === "geometry") {
    const r = Math.floor(Math.random() * 10) + 1;
    return {
      question: `Find the area of a circle with radius ${r}. (Use π = 3.14)`,
      answer: Number((3.14 * r * r).toFixed(2)),
      explanation: `Area = πr² = 3.14 × ${r}²`
    };
  }

  // NUMBER THEORY
  if (topic === "numberTheory") {
    const a = Math.floor(Math.random() * 20) + 5;
    const b = Math.floor(Math.random() * 20) + 5;
    return {
      question: `Find gcd(${a}, ${b}).`,
      answer: gcd(a, b),
      explanation: `Use Euclid’s Algorithm.`
    };
  }

  // PROBABILITY
  if (topic === "probability") {
    const total = 20;
    const red = Math.floor(Math.random() * 10) + 1;
    return {
      question: `A bag has ${red} red balls and ${total - red} blue balls. Probability of red?`,
      answer: Number((red / total).toFixed(2)),
      explanation: `Probability = red / total = ${red}/${total}`
    };
  }

  // SEQUENCES
  if (topic === "sequences") {
    const a1 = Math.floor(Math.random() * 10) + 1;
    const d = Math.floor(Math.random() * 6) + 1;
    return {
      question: `Arithmetic sequence: a₁ = ${a1}, d = ${d}. Find a₅.`,
      answer: a1 + 4 * d,
      explanation: `a₅ = a₁ + 4d`
    };
  }

  // EXPONENTS & LOGS
  if (topic === "exponents") {
    const a = Math.floor(Math.random() * 5) + 2;
    const b = Math.floor(Math.random() * 3) + 2;
    return {
      question: `Simplify: ${a}^${b}`,
      answer: a ** b,
      explanation: `${a}^${b} = ${a ** b}`
    };
  }

  // QUADRATICS
  if (topic === "quadratics") {
    const r1 = Math.floor(Math.random() * 10) + 1;
    const r2 = Math.floor(Math.random() * 10) + 1;
    return {
      question: `A quadratic has roots ${r1} and ${r2}. What is the sum of the roots?`,
      answer: r1 + r2,
      explanation: `Sum of roots = r₁ + r₂`
    };
  }

  // SYSTEMS
  if (topic === "systems") {
    const x = Math.floor(Math.random() * 10) + 1;
    const y = Math.floor(Math.random() * 10) + 1;
    return {
      question: `Solve the system: x + y = ${x + y}, x - y = ${x - y}. What is x?`,
      answer: x,
      explanation: `Add equations to eliminate y.`
    };
  }

  // MATRICES
  if (topic === "matrices") {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const c = Math.floor(Math.random() * 5) + 1;
    const d = Math.floor(Math.random() * 5) + 1;
    return {
      question: `Find det([[${a}, ${b}], [${c}, ${d}]]).`,
      answer: a * d - b * c,
      explanation: `det = ad - bc`
    };
  }

  // WORD PROBLEMS
  if (topic === "word") {
    const rate = Math.floor(Math.random() * 5) + 5;
    const hours = Math.floor(Math.random() * 5) + 2;
    return {
      question: `A machine produces ${rate} items per hour. How many in ${hours} hours?`,
      answer: rate * hours,
      explanation: `Multiply rate × time`
    };
  }
}

// Helper for gcd
function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

// TIMED TEST
let timeLeft = 0;
let timerInterval = null;

function startTimedTest() {
  timeLeft = 30 * 60;
  document.getElementById("timedArea").innerHTML = "";
  updateTimer();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById("timedArea").innerHTML = "<p>Time's up!</p>";
    }
  }, 1000);
}

function updateTimer() {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  document.getElementById("timer").innerText = `${m}:${s.toString().padStart(2, "0")}`;
}

// PAST TESTS
const pastTests = {
  2024: ["District Test", "Regional Test", "State Test"],
  2023: ["District Test", "Regional Test"]
};

const yearList = document.getElementById("yearList");
yearList.innerHTML = Object.keys(pastTests)
  .map(y => `<button onclick="showTests(${y})">${y}</button>`)
  .join("");

function showTests(year) {
  document.getElementById("testList").innerHTML =
    pastTests[year].map(t => `<p>${t}</p>`).join("");
}
