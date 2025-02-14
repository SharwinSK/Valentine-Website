let pin = "";
const correctPin = "5555"; // Set your secret PIN

function enterPin(number) {
  if (pin.length < 4) {
    pin += number;
    document.getElementById(`dot${pin.length}`).style.background = "white";
  }
}

function clearPin() {
  document.getElementById(`dot${pin.length}`).style.background =
    "rgba(255, 255, 255, 0.5)";
  pin = pin.slice(0, -1);
}

function checkPin() {
  if (pin === correctPin) {
    // Redirect to main page after successful PIN entry
    window.location.href = "MainPage.html";
  } else {
    alert("Oops! Wrong PIN. Try again! ❤️");
    resetPin();
  }
}

function resetPin() {
  pin = "";
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`dot${i}`).style.background =
      "rgba(255, 255, 255, 0.5)";
  }
}
// Ensure the lightbox is hidden when the page loads
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("lightbox").style.display = "none";
});

// Array of romantic poems (one for each photo)
const poems = [
  "Eppothum  Ennudan  Nee  Vendum… Anbu  Kanavanaka  Mattumalla  Aasai  Kathalanakavum  Kooda... ❤️",
  "Ovvoru Pookalukkum Ovvoru Azhagu Erukirathu Uyire Un Oru Sirippil Ella Azhagum Kuvinthu Irukirathu. 🌅🎶",
  "Every moment with you is a page in our forever love story. 📖💞",
  "In your arms, I found my home, a place where love forever. 🌟💕",
  "Love is not about time, it's about the moments we cherish together. ⏳💖",
  "Like the stars in the sky, my love for you shines endlessly. ✨❤️",
  "Oru Idhayathai Unmaiyaga Nesithu Par Aayieram Idhayangal Un Arugil Irundhalum Un Kangal Ne Nesikum Idhayathai Mattume Thedum 🎵💘",
  "Unakkaka  Ethaiyum  Izhanthu  Viduven..Etharkakavum  Unnai  Izhakka  Matten… 🌙💖",
];

// Open Lightbox and Display Image + Poem
function openLightbox(image, index) {
  let lightbox = document.getElementById("lightbox");
  let lightboxImg = document.getElementById("lightbox-img");
  let lightboxPoem = document.getElementById("lightbox-poem");

  lightbox.style.display = "flex"; // Show the lightbox
  lightboxImg.src = image.src; // Set the clicked image in the lightbox
  lightboxPoem.innerText = poems[index]; // Set the corresponding poem
}

// Close Lightbox
function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}
// Quiz Questions (10 total)
let quizQuestions = [
  {
    question: "Where did we first meet? 💕",
    answers: ["School", "MIC", "College", "Online"],
    correct: 2,
  },
  {
    question: "What is my favorite thing about you? ❤️",
    answers: ["Your smile", "Your Eyes", "Your kindness", "Everything"],
    correct: 3,
  },
  {
    question: "When is the date we talked to each other? 📅",
    answers: ["29 Jan 2021", "27 Jan 2021", "23 Jan 2021", "25 Jan 2039"],
    correct: 0,
  },
  {
    question: "What is my favorite nickname for you? 🥰",
    answers: ["Ammu", "Gundhati", "Bubu", "Eruma Maddu"],
    correct: 1,
  },
  {
    question: "What is my dream car? 🚗",
    answers: ["Audi", "BMW", "Honda", "Volkswagen"],
    correct: 1,
  },
  {
    question: "Which type of car do I like? 🚘",
    answers: ["BMW M5", "BMW M3", "Honda FK8", "Volkswagen GTI MK8"],
    correct: 0,
  },
  {
    question: "What color do I love seeing you wear? 🎨",
    answers: ["Red", "Blue", "Black", "White"],
    correct: 3,
  },
  {
    question: "How many years have we been together? 🗓️",
    answers: ["4", "6", "10", "3"],
    correct: 0,
  },
  {
    question: "If we could travel anywhere, where would I take you? ✈️",
    answers: ["Paris", "Bali", "Tokyo", "Maldives"],
    correct: 0,
  },
  {
    question: "What do I love most about our relationship? 💖",
    answers: [
      "Our deep talks",
      "Our romance",
      "Our Fighting",
      "All of the above",
    ],
    correct: 3,
  },
];

// Variables
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// Shuffle Questions Function
function shuffleQuestions() {
  shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);
}

// Load Question
function loadQuestion() {
  let questionText = document.getElementById("question-text");
  let answerButtons = document.getElementById("answer-buttons");

  let question = shuffledQuestions[currentQuestionIndex];

  questionText.innerText = question.question;
  answerButtons.innerHTML = ""; // Clear previous answers

  question.answers.forEach((answer, index) => {
    let button = document.createElement("button");
    button.innerText = answer;
    button.onclick = () => checkAnswer(index);
    answerButtons.appendChild(button);
  });
}

function checkAnswer(button, correctAnswer) {
  const selectedAnswer = button.textContent;

  if (selectedAnswer === correctAnswer) {
    button.classList.add("btn-success"); // Green for correct answer
    setTimeout(nextQuestion, 1000); // Move to next question after 1 second
  } else {
    button.classList.add("btn-danger"); // Red for wrong answer

    // Highlight the correct answer in green
    Array.from(answerButtons.children).forEach((btn) => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("btn-success");
      }
    });

    setTimeout(nextQuestion, 1500); // Move to next question after 1.5 seconds
  }
}

// Show Result
function showResult() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("quiz-result").style.display = "block";

  let resultMessage = document.getElementById("result-message");

  if (score === shuffledQuestions.length) {
    resultMessage.innerText = "Wow! You got them all right! 🥰💖";
  } else if (score >= shuffledQuestions.length / 2) {
    resultMessage.innerText = "Not bad! You know me quite well! 😊";
  } else {
    resultMessage.innerText = "Haha! We need to spend more time together! 😆💕";
  }

  document.getElementById("restart-btn").style.display = "block"; // Show Restart button
}

// Restart Quiz - Shuffle Questions & Reset Score
function restartQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  shuffleQuestions(); // Shuffle questions again
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("quiz-result").style.display = "none";
  document.getElementById("restart-btn").style.display = "none";
  loadQuestion();
}

// Load first question when page loads
document.addEventListener("DOMContentLoaded", function () {
  shuffleQuestions();
  loadQuestion();
});

// Secret Code (Set Your Own)
const secretCode = "5555"; // Change this to your special date or code

// Open Code Input Box
function openCodeBox() {
  document.getElementById("code-box").style.display = "block";
}

// Check the Secret Code
function checkLoveCode() {
  let enteredCode = document.getElementById("love-code").value;

  if (enteredCode === secretCode) {
    document.getElementById("code-box").style.display = "none"; // Hide input box
    document.getElementById("secret-message").style.display = "block"; // Show love message
    document.querySelector(".lock-icon").style.display = "none"; // Hide the heart button
  } else {
    alert("Oops! Wrong code, try again! ❤️");
  }
}

// Close Secret Message (Show Heart Again)
function closeSecretMessage() {
  document.getElementById("secret-message").style.display = "none";
  document.querySelector(".lock-icon").style.display = "block"; // Show the heart button again
}
// Love Confession Message (Typewriter Effect)
const loveMessage =
  "With every step, I see you near,\
With every breath, I hold you dear.\
Our love’s an endless, magical ride,\
Forever together, side by side. 💖";

// Function to Start the Love Confession
function startLoveConfession() {
  let messageContainer = document.getElementById("love-message");
  let loveText = document.getElementById("love-text");
  let confessBtn = document.querySelector(".confess-btn");

  // Hide the button after clicking
  confessBtn.style.display = "none";

  // Show the love message container
  messageContainer.style.display = "block";

  // Typewriter Effect
  loveText.innerText = "";
  let index = 0;
  let interval = setInterval(() => {
    if (index < loveMessage.length) {
      loveText.innerText += loveMessage.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 50); // Speed of typing effect
}

// Function to Close the Love Message
function closeLoveMessage() {
  document.getElementById("love-message").style.display = "none";
  document.querySelector(".confess-btn").style.display = "block"; // Show the button again
}

function logout() {
  // Redirect to the index page (PIN screen)
  window.location.href = "index.html";
}
// Highlight Active Section in Navbar
document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section"); // Get all sections
  const navLinks = document.querySelectorAll("nav ul li a"); // Get all navbar links

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute("id"); // Get current section ID
    }
  });

  // Remove active class from all links and add to the current one
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});
// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Logout Function
function logout() {
  window.location.href = "index.html"; // Redirect to the login page
}
