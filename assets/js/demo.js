/**
 * Prevent further answers upon selection
 */
function preventFurtherAnswers() {
  answerBtnsEl.forEach(button => {
      button.removeEventListener('click', userAnswersQuestion);
  })
}


/**
 * This function handles the clicked user answer
 * @param {*} clickEvent - the event that triggers this function
 */
function userAnswersQuestion(clickEvent) {
  // Decision made not to highlight correct answer in case the user wants to play again

  /* Begin with the event object; refer to the target (answer buttons); 
  access the custom data attribute; specify the suffix of said attribute;
  and convert assigned value to an integer
  */
  const selectedAnswer = parseInt(clickEvent.target.dataset.index);

  /* Compare the answer selected by the user with the 'correct' answer in the
  questionAndAnswers array
  */
  if (selectedAnswer === questionsAndAnswers[questionIndex].correct) {
      // Change the background colour of the button to green
      clickEvent.target.style.backgroundColor = 'green';
      // Increment the score count by 1
      scoreCounter++
      // Display the updated score
      scoreCounterEl.innerText = scoreCounter;
      // Prevent validation of further answers
      preventFurtherAnswers()
  } else {
      clickEvent.target.style.backgroundColor = 'red';
      // Prevent validation of further answers
      preventFurtherAnswers()
  }
}

userAnswersQuestion