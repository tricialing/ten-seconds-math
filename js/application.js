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

  // Initialize Ion sound
  ion.sound({
    sounds: [
        {
            name: "beer_can_opening"
        }
    ],
    volume: 1,
    path: "js/ion/sounds/",
    preload: true
  });

  function btcAnimation(){
    $('#btc').show().css({'left': '0px', 'top': '0px'});
    $('#btc').animate({left:'30%', top:'30%'}).fadeOut();

    ion.sound.play("beer_can_opening");
  }

  // define slider for number range
  $('#slider-number-range').slider({
    range: 'max',
    min: 1,
    max: 100,
    value: 50,
    slide: function(event, ui) {
      $('#number-limit').text(ui.value);
      NUMBER_LIMIT = ui.value;
      currentQuestion = makeNewQuestion();
    }
  });

  // show number in number range
  $('#number-limit').text($('#slider-number-range').slider('value'));
  
  // Function to generate random numbers
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // short hand for generating random numbers
  var rand = getRandomInt;

  function chooseFormula(){
    var formulaArray = [];

    // find checked options and added to array
    $('.option-box').each(function(){
      if ($(this).prop('checked')){
        var elementId = $(this).attr('id');
        formulaArray.push(elementId);
      }
    });

    // randomize index
    var index = rand(0, formulaArray.length - 1);
    // console.log(formulaArray[index]);
    return formulaArray[index];
  }

  var generateQuestion = function(){

    var formula;

    function generateQuestionText(a, b, operator){
      return rand(a, b) + operator + rand(a, b)
    };

    function generateQuestionEval(a, b, operator){
      return rand(a, b) + operator + rand(a, b)
    };

    switch(chooseFormula()){
      case 'addition':
        formula = function additionQuestion(a, b) {
          var question = generateQuestionText(a, b, ' + ');
          return {'information': question,
                  'eval': question};
        };
        break;
      case 'subtraction':
        formula = function subtractionQuestion(a, b) {
          var question = generateQuestionText(a, b, ' - ');
          return {'information': question,
                  'eval': question};
        };
        break;
      case 'multiplication':
        formula = function multiplicationQuestion(a, b) {
          var question = generateQuestionText(a, b, ' x ');
          return {'information': question,
                  'eval': question.replace('x','*')};
        };
        break;
      case 'division':
        formula = function divisionQuestion(a, b) {
          var dividend = 1 + rand(Math.sqrt(a), Math.sqrt(b));
          var denominator = 1 + rand(Math.sqrt(a), Math.sqrt(b));

          var multiple = dividend * denominator;

          return {'information': multiple + ' / ' + denominator,
                  'eval': multiple + '/' + denominator};
        };
        break;
      case 'square':
        formula = function squareQuestion(a, b){
          var x = rand(Math.sqrt(a), Math.sqrt(b));

          return {'information': x + '²',
                  'eval': Math.pow(x,2)};
        };
        break;
      case 'sqrt':
        formula = function squareRootQuestion(a, b){
          var x = rand(Math.sqrt(a), Math.sqrt(b));
          var y = x*x;

          return {'information': '√' + y,
                  'eval': x};
        };
        break;
    }

    // TODO: random selection
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
        $('#answer').parent().html('<h1 id="#answer">Game Over! You got '+totalScore+' correct!</h1>');
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

      // Animation
      btcAnimation();
    }else{
      console.log('answer is wrong');
    }
  })

});