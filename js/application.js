'use strict';

var timer;
var currentQuestion; 
var secondLeft = 10;
var totalScore = 0;
var numberValue;


$(document).ready(function(){
  console.log("linked");

  $("#number-picker").val(); // returns 5.3
  console.log('#number-picker');

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
        $('.clock').hide();
      };  

      if (secondLeft <= 2){
        $('#timer').addClass( "gameover" );
      };
    },1000);
  };

  //generate random number 
  var randomNum = function(num){
    return Math.floor(Math.random() * num);
    console.log(randomNum);
  };

  // set form of addition question
  var additionQuestion = function(a,b){
    return a + "+" + b;
  };

  // generate new question
  var newQuestion = function(num){
    currentQuestion = additionQuestion (randomNum(num),randomNum(num));
    $('#question').text(currentQuestion);
  };

  // newQuestion();

  var num = $('#number-picker').val();
  $('#number').val('Number Value: ' + num);
  newQuestion(num);
    
  $('#number-picker').on('input', function (){
    var num = $('#number-picker').val();
    $('#number').val('Number Value: ' + num);
    newQuestion(num);
  });


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
      newQuestion(num); // generate new question

    }
  });




});
