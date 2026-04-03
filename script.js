// -------------------------
// PAGE SWITCHING
// -------------------------
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// -------------------------
// PRACTICE MODE
// -------------------------
function startPractice(topic) {
  const area = document.getElementById("practiceArea");
  const p = generateProblem(topic);

  area.innerHTML = `
    <div class="problem-box">
      <p>${p.question}</p>
      <input id="answerInput">
      <button onclick="checkPracticeAnswer('${topic}', ${p.answer}, '${p.explanation}')">Check</button>
    </div>
  `;
}

function checkPracticeAnswer(topic, correct, explanation) {
  const input = Number(document.getElementById("answerInput").value);
  const area = document.getElementById("practiceArea");
  const isCorrect = input === correct;

  area.innerHTML = `
    <div class="problem-box">
      <p class="${isCorrect ? "correct" : "incorrect"}">
        ${isCorrect ? "Correct!" : "Incorrect. Answer: ${correct}"}
      </p>
      <p>${explanation}</p>
      <button onclick="startPractice('${topic}')">Next Problem</button>
    </div>
  `;
}
// TEST‑STYLE QUESTIONS MODE
function startTestStyle() {
  const area = document.getElementById("testStyleArea");

  // List of all test‑style generators
  const bank = [
    ts_linearSolve,
    ts_fractionSimplify,
    ts_sequence,
    ts_exponent,
    ts_logarithm,
    ts_geometry,
    ts_rate,
    ts_percent,
    ts_systems,
    ts_rational,
    ts_quadraticRoots,
    ts_factor
  ];

  // Pick a random generator
  const p = bank[Math.floor(Math.random() * bank.length)]();

  area.innerHTML = `
    <div class="problem-box">
      <p>${p.question}</p>
      <input id="tsInput">
      <button onclick="checkTSAnswer(${JSON.stringify(p.answer)}, '${p.explanation}')">Check</button>
    </div>
  `;
}

function checkTSAnswer(correct, explanation) {
  const input = document.getElementById("tsInput").value;
  const area = document.getElementById("testStyleArea");

  const isCorrect = (Number(input) == Number(correct));

  area.innerHTML = `
    <div class="problem-box">
      <p class="${isCorrect ? "correct" : "incorrect"}">
        ${isCorrect ? "Correct!" : "Incorrect. Answer: " + correct}
      </p>
      <p>${explanation}</p>
      <button onclick="startTestStyle()">Next Test‑Style Question</button>
    </div>
  `;
}

// -------------------------
// PROBLEM GENERATORS
// -------------------------

// --- Test‑Style Question Bank ---
const testStyleGenerators = {
  linear: () => {
    const a = rand(2, 9);
    const b = rand(1, 10);
    const c = rand(5, 25);
    return {
      question: `Solve: ${a}x + ${b} = ${c}`,
      answer: (c - b) / a,
      explanation: `Subtract ${b}, then divide by ${a}.`
    };
  },

  fraction: () => {
    const a = rand(2, 9);
    const b = rand(2, 9);
    const num = a * b;
    const den = a * rand(2, 6);
    return {
      question: `Simplify: ${num}/${den}`,
      answer: num / den,
      explanation: `Divide numerator and denominator by ${a}.`
    };
  },

  sequence: () => {
    const a = rand(2, 12);
    const d = rand(1, 8);
    const n = rand(5, 15);
    return {
      question: `Find term ${n} of the sequence: a₁=${a}, d=${d}`,
      answer: a + (n - 1) * d,
      explanation: `Use aₙ = a₁ + (n−1)d.`
    };
  },

  exponent: () => {
    const a = rand(2, 6);
    const b = rand(2, 6);
    return {
      question: `Compute: ${a}^${b}`,
      answer: a ** b,
      explanation: `${a} multiplied by itself ${b} times.`
    };
  },

  log: () => {
    const exp = rand(2, 7);
    return {
      question: `Evaluate: log₂(${2 ** exp})`,
      answer: exp,
      explanation: `log₂(2^n) = n.`
    };
  },

  geometry: () => {
    const r = rand(2, 12);
    return {
      question: `Find the area of a circle with radius ${r}. (Use π=3.14)`,
      answer: +(3.14 * r * r).toFixed(2),
      explanation: `A = πr²`
    };
  },

  rate: () => {
    const d = rand(50, 250);
    const t = rand(1, 5);
    return {
      question: `A car travels ${d} miles in ${t} hours. What is its speed?`,
      answer: d / t,
      explanation: `Speed = distance/time.`
    };
  },

  percent: () => {
    const base = rand(50, 250);
    const p = rand(10, 50);
    return {
      question: `What is ${p}% of ${base}?`,
      answer: +(base * p / 100).toFixed(2),
      explanation: `${p}% = ${p}/100`
    };
  },

  systems: () => {
    const x = rand(1, 10);
    const y = rand(1, 10);
    const a1 = rand(1, 5);
    const b1 = rand(1, 5);
    const c1 = a1 * x + b1 * y;
    return {
      question: `Solve the system: ${a1}x + ${b1}y = ${c1}, y = ${y}`,
      answer: x,
      explanation: `Substitute y=${y} into the first equation.`
    };
  },

  rational: () => {
    const a = rand(2, 6);
    const b = rand(2, 6);
    const x = a + b;
    return {
      question: `Evaluate: (x² - ${a*b}x + ${a*b*b}) / (x - ${b}) at x=${x}`,
      answer: ((x ** 2) - a*b*x + a*b*b) / (x - b),
      explanation: `Plug in x=${x}.`
    };
  },

  quadraticRoots: () => {
    const r1 = rand(1, 10);
    const r2 = rand(1, 10);
    return {
      question: `Find a root of x² - ${r1+r2}x + ${r1*r2} = 0`,
      answer: r1,
      explanation: `Roots are ${r1} and ${r2}.`
    };
  },

  factor: () => {
    const a = rand(1, 10);
    const b = rand(1, 10);
    return {
      question: `Factor: x² + ${a+b}x + ${a*b}`,
      answer: `(x+${a})(x+${b})`,
      explanation: `Numbers that multiply to ${a*b} and add to ${a+b}.`
    };
  }
};

// -------------------------
// MAIN PROBLEM DISPATCHER
// -------------------------
function generateProblem(topic) {
  const topicMap = {
    algebra: () => testStyleGenerators.linear(),
    geometry: () => testStyleGenerators.geometry(),
    numberTheory: () => {
      const a = rand(5, 25);
      const b = rand(5, 25);
      return {
        question: `Find gcd(${a}, ${b}).`,
        answer: gcd(a, b),
        explanation: `Use Euclid’s Algorithm.`
      };
    },
    probability: () => {
      const red = rand(1, 10);
      const total = 20;
      return {
        question: `A bag has ${red} red balls and ${total - red} blue balls. Probability of red?`,
        answer: Number((red / total).toFixed(2)),
        explanation: `Probability = red / total`
      };
    },
    sequences: () => testStyleGenerators.sequence(),
    exponents: () => testStyleGenerators.exponent(),
    quadratics: () => testStyleGenerators.quadraticRoots(),
    systems: () => testStyleGenerators.systems(),
    matrices: () => {
      const a = rand(1, 5), b = rand(1, 5), c = rand(1, 5), d = rand(1, 5);
      return {
        question: `Find det([[${a}, ${b}], [${c}, ${d}]]).`,
        answer: a*d - b*c,
        explanation: `det = ad - bc`
      };
    },
    word: () => {
      const rate = rand(5, 10);
      const hours = rand(2, 6);
      return {
        question: `A machine produces ${rate} items per hour. How many in ${hours} hours?`,
        answer: rate * hours,
        explanation: `Multiply rate × time`
      };
    },

    // Test‑style mega bank (100+ possible)
    testStyle: () => {
      const keys = Object.keys(testStyleGenerators);
      const pick = keys[rand(0, keys.length - 1)];
      return testStyleGenerators[pick]();
    }
  };

  return topicMap[topic]();
}

// -------------------------
// HELPERS
// -------------------------
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gcd(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

// -------------------------
// TIMED TEST
// -------------------------
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

// -------------------------
// PAST TESTS
// -------------------------
const pastTests = {
  2024: ["District Test", "Regional Test", "State Test"],
  2023: ["District Test", "Regional Test"]
};

document.getElementById("yearList").innerHTML =
  Object.keys(pastTests)
    .map(y => `<button onclick="showTests(${y})">${y}</button>`)
    .join("");

function showTests(year) {
  document.getElementById("testList").innerHTML =
    pastTests[year].map(t => `<p>${t}</p>`).join("");
}
