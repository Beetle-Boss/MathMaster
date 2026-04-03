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
  if (topic === "algebra") {
    const x = Math.floor(Math.random() * 10) + 1;
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 10);
    const answer = x;
    return {
      question: `Solve for x: ${a}x + ${b} = ${a * x + b}`,
      answer,
      explanation: `Subtract ${b}, then divide by ${a}.`
    };
  }

  if (topic === "geometry") {
    const r = Math.floor(Math.random() * 10) + 1;
    return {
      question: `Find the area of a circle with radius ${r}.`,
      answer: (Math.PI * r * r).toFixed(2),
      explanation: `Use A = πr².`
    };
  }

  if (topic === "numbersense") {
    const a = Math.floor(Math.random() * 90) + 10;
    const b = Math.floor(Math.random() * 90) + 10;
    return {
      question: `Compute: ${a} × ${b}`,
      answer: a * b,
      explanation: `Multiply normally.`
    };
  }

  if (topic === "probability") {
    return {
      question: `A fair die is rolled. Probability of rolling a 4?`,
      answer: "1/6",
      explanation: `One favorable outcome out of six.`
    };
  }
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
