'use strict';

var timer;
var currentQuestion; 
var secondLeft = 5;
var totalScore = 0;

$(document).ready(function(){
	console.log("linked");

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
				$('#answer').parent().text("Gameover" + "n/ Total Score: " + totalScore);
				console.log(totalScore);
			};	

		},1000);
	};



	//generate random number 
	var randomNum = function(){
		return Math.floor(Math.random() * 10);
		console.log(randomNum);
	};

	//set form of addition question
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



	// var timer = setInterval(function(){
	// addSecond();

	// });

	// 		clearInterval(timer);


});
