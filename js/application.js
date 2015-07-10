// It give you an error when you don't declare the scope variables (local, global)
'use strict';

var secondsLeft = 10;
var currentQuestion;
var totalScore = 0;
var timer;

$(document).ready(function(){
  var addSecond = function(){
    secondsLeft++;
  };

  var minusSecond = function(){
    secondsLeft--;
  };

  var startTimer = function(){
    timer = setInterval(function(){
      // decrease time
      minusSecond();
      $('#clock').text(secondsLeft);

      // check time
      if (secondsLeft <= 0) {
        clearInterval(timer);
        $('#answer').parent().text('Game over. Total score: ' + totalScore);
      }
    }, 1000);
  };

  var rand = function(){
    return Math.floor(Math.random() * 10);
  }

  var additionQuestion = function(a, b){
    return a + '+' + b;
  }

  var generateQuestion = function(){
    currentQuestion = additionQuestion(rand(), rand());
    $('#question').text(currentQuestion);
  };

  generateQuestion();

  $('#answer').keyup(function(){
    var yourAnswer = Number($('#answer').val());
    var rightAnswer = eval(currentQuestion);

    if (yourAnswer === rightAnswer){
      if (totalScore === 0) {
        startTimer();
      }

      addSecond();
      generateQuestion();
      $('#answer').val('');
      totalScore++;
    }
  });
});