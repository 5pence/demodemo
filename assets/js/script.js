// getters
const question = document.getElementById('question');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');
const score = document.getElementById('score');
const playAgain = document.getElementById('playAgain');
const wrapper = document.getElementById('wrapper');

let questionNumber = 0;  
let scoreAmount = 0;

const questions = [
  {
    "question": "What day new years eve?",
    "answers": [
      "December 30th", "December 31st", "January 1", "Decmber 25th"
    ],
    "correct": 1
  },
  {
    "question": "What is the best drink on new years eve?",
    "answers": [
      "Rum", "Vodka", "Tequila", "Gin"
    ],
    "correct": 0
  },
  {
    "question": "who the greatsest at Eurovision?",
    "answers": [
      "France", "Spain", "Mexico", "Sweden"
    ],
    "correct": 3
  }
]

const quizLength = questions.length;

function loadQuestion(questionNumber) {
  question.innerText = questions[questionNumber].question;
}

/**
 * This function loads answers into the choice buttons
 * @param {int} questionNumber 
 */
function loadAnswers(questionNumber) {
  answer1.innerText = questions[questionNumber].answers[0];
  answer2.innerText = questions[questionNumber].answers[1];
  answer3.innerText = questions[questionNumber].answers[2];
  answer4.innerText = questions[questionNumber].answers[3];
}

/**
 * This function checks the answer button that has been pressed.
 * If correct it increments the score and question number.
 * It also checks if it is the end of the quiz
 * @param {int} answerNumber 
 */
function checkAnswer(answerNumber) {
  console.log('answer number chosen: ', answerNumber);
  // we check what the correct answer is for this question
  let correctAnswer = questions[questionNumber].correct
  if (answerNumber === correctAnswer) {
     // if correct we increment the score by 1
    scoreAmount++;
    score.innerText = scoreAmount;
  }
  // after we increment the questionNumber
  questionNumber ++;
  // we check if it is the end of the quiz ( have we run out of questions)
  if (questionNumber === quizLength) {
    endgame();
  } else {
    // if not we load the next question
    loadQuestion(questionNumber);
    loadAnswers(questionNumber);
  }
}

function endgame() {
  playAgain.style.visibility = "visible";
}

// this function ends game
function endgameOption(chosen) {
  if (chosen === 0) {
    window.location.reload()
  } else {
    wrapper.innerHTML = "<h1>Thanks for playing...</h1>"
  }
}

/**
 * this function starts teh quiz
 */
function startQuiz() {
  playAgain.style.visibility = "hidden";
  loadQuestion(questionNumber);
  loadAnswers(questionNumber);
}

startQuiz();

























