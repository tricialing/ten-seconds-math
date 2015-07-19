'use strict';

var timer;
var currentQuestion; 
var secondLeft = 2;
var totalScore = 0;


$(document).ready(function(){
  console.log("linked");

  $('#number-picker').on('input', function (){
    var num = $('#number-picker').val();
    $('#number').val("Number Value: " + num);
  });

  $('#timer').text(secondLeft);

  var addSecond = function(){
    secondLeft++;
  };

  var minusSecond = function(){
    secondLeft--;
  };

  var timerStarts = function(){
    timer = setInterval(function(){
      minusSecond();
      $('#timer').text(secondLeft);

      if (secondLeft <= 0){
        clearInterval(timer);
        $('.panel-heading').addClass( "accent-color" );
        $('#question').parent().html('<h2 class="gameover">GAME OVER</h2>');
        $('#answer').parent().html('<h3>Total Score: </h3>' + '<h2>' + totalScore + '</h2> <button class="btn btn-default" id="playAgain">play again</button>');
        console.log(totalScore);
        $('#playAgain').click(function(){
          location.reload(true);
          console.log('playagain');
        });
      };  

    },1000);
  };

  //generate random number 
  var randomNum = function(){
    return Math.floor(Math.random() * 10);
    console.log(randomNum);
  };

  //get number from slider

  // set form of addition question
  var additionQuestion = function(a,b){
    return a + "+" + b;
  };

  // generate new question
  var newQuestion = function(){
    currentQuestion = additionQuestion (randomNum(),randomNum());
    $('#question').text(currentQuestion);
  };

  newQuestion();


  $('#answer').keyup(function(){
    var inputAnswer = Number($('#answer').val());
    var correctAnswer = eval(currentQuestion);

    // when answered correctly
    if (inputAnswer === correctAnswer){
      if (totalScore === 0) {
        timerStarts();
      };
      // console.log(totalScore);
      addSecond(); //add sec to time
      totalScore++; //add score
      $('#answer').val(''); //clear input box
      newQuestion(); // generate new question

    }
  });




});
