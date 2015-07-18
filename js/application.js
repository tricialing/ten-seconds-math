$(document).ready(function(){
	console.log("this is working");
	// $('#list-example li').text('fer');
	var secondLeft = 10;
 	$('#timer').text(secondLeft);


	console.log(secondLeft);

	var addSecond = function(){
		secondLeft++;
	};

	console.log(addSecond);


	// var addSecond = function(){
	// 	secondLeft++;
	// };

	// var minusSecond = function(){
	// 	secondLeft--;
	// };

	// var timer = setInterval(function(){
	// 	if (secondLeft <= 0){
	// 		clearInterval(timer);
	// 	}
	// });

});
