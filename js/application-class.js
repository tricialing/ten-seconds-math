// It give you an error when you don't declare the scope variables (local, global)
'use strict';

// Global variables
var QUIZ_AVAILABLE_SECONDS = 9;
var secondsLeft = QUIZ_AVAILABLE_SECONDS;
var timer; // reference to timer
var currentQuestion; // store current question
var NUMBER_LIMIT = 50; // initial number limit
var totalScore = 0;

$(document).ready(function(){
  // show number in number range
  $('#number-limit').text(NUMBER_LIMIT);

  // Function to generate random numbers
  var rand = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var generateQuestion = function(){
    var formula;

    function generateQuestionText(a, b, operator){
      return rand(a, b) + operator + rand(a, b)
    };

    function generateQuestionEval(a, b, operator){
      return rand(a, b) + operator + rand(a, b)
    };

    formula = function additionQuestion(a, b) {
      var question = generateQuestionText(a, b, ' + ');
      return {
        'information': question,
        'eval': question
      };
    };

    return formula(1,NUMBER_LIMIT)
  };

  // create new question
  function makeNewQuestion(){
    var question = generateQuestion();
    $('#question').text(question.information);
    return question;
  }; 

  // Initialize with a question
  currentQuestion = makeNewQuestion();

  // Resetting the timer with new time every 1 second
  var resetTimer = function(){
    timer = setInterval(function(){ 
      // Decrement every second
      secondsLeft = Number(secondsLeft) - 1;

      $('#clock').text(secondsLeft);

      // Check if game is over
      if (secondsLeft == 0){
        clearInterval(timer);
        $('#answer').parent().html('<h1 id="#answer">Game Over! You got ' + totalScore + ' correct!</h1>');
      }
    }, 1000)
  };

  var getNewTime = function(){
    var oldTime = secondsLeft;
    var newTime = Math.ceil(oldTime) + 1;
    secondsLeft = newTime;
  };

  // Listen to answers
  $('#answer').keyup(function(){
    // check if answer is correct
    if ($('#answer').val() == eval(currentQuestion.eval)){
      // Stop timer
      window.clearInterval(timer);

      // Compute new time
      getNewTime();

      // Update clock on UI
      $('#clock').text(secondsLeft);

      // Create new question
      currentQuestion = makeNewQuestion();
      $('#answer').val('');

      // Increment total score
      totalScore++;

      // Restart timer
      resetTimer();
    }else{
      console.log('answer is wrong');
    }
  })
});