const questions = [
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style Sheets", correct: false },
      { text: "Concise Style Sheets", correct: false },
    ],
  },
  {
    question: "Which HTML element is used for headings?",
    answers: [
      { text: "p", correct: false },
      { text: "h1", correct: true },
      { text: "span", correct: false },
      { text: "div", correct: false },
    ],
  },
  {
    question: "What is the purpose of JavaScript in web development?",
    answers: [
      { text: "To style web pages", correct: false },
      { text: "To create database queries", correct: false },
      { text: "To add interactivity to web pages", correct: true },
      { text: "To manage server-side logic", correct: false },
    ],
  },
  {
    question: "What is the difference between null and undefined in JavaScript?",
    answers: [
      { text: "Null is an object, undefined is a variable", correct: false },
      { text: "Null is a value, undefined is the absence of a value", correct: true },
      { text: "Null is a string, undefined is a number", correct: false },
      { text: "Null is a boolean, undefined is an object", correct: false },
    ],
  },
  {
    question: "What does API stand for?",
    answers: [
      { text: "Application Programming Interface", correct: true },
      { text: "Advanced Programming Interface", correct: false },
      { text: "Automated Programming Interface", correct: false },
      { text: "Abstract Programming Interface", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click",selectAnswer);
});
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
        button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
  }
  function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out od ${questions.length}!`;
    nextButton.style.display = "block";
}


    function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});


startQuiz(); 