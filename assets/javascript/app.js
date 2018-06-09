var triviaQuestions = [{
	question: "Which of the below is a foundational CrossFit movement?",
	answerList: ["Bicep curls", "Calf raises", "Deadlift", "Jumping Jacks"],
	answer: 2
},{
	question: "Who was named the Fittest Man on Earth in 2017?",
	answerList: ["Brent Fikowski", "Mat Frasier", "Rich Froning", "Ben Smith"],
	answer: 1
},{
	question: "This WOD requires the athlete to complete 30 snatches for time:",
	answerList: ["Isabel", "Cindy", "Fran", "Nicole"],
	answer: 0
},{
	question: "Who invented CrossFit?",
	answerList: ["Samantha Briggs", "Thomas Crubaugh", "Denise Thomas", "Greg Glassman"],
	answer: 3
},{
	question: "Where were the first CrossFit games held?",
	answerList: ["Los Angeles, CA", "San Diego, CA", "Aromas, CA", "Carson, CA"],
	answer: 2
},{
	question: "Who is the offical sponsor of the CrossFit games?",
	answerList: ["Nike", "Reebok", "Under Armour", "Rogue"],
	answer: 1
},{
	question: "CrossFit gyms (or boxes) are referred to this by the CrossFit corporate offices:",
	answerList: ["Affiliates", "Franchises", "Branches", "Offices"],
	answer: 0
},{
	question: "Which type of pull up involves using momentum to get your chin above the bar?",
	answerList: ["Fast", "Strict", "Jerking", "Kipping"],
	answer: 3
},{
	question: "This exercise works primarily your legs:",
	answerList: ["Snatch", "Toes to bar", "Squat", "Clean"],
	answer: 2
},{
	question: "What does scalability refer to?",
	answerList: ["Modifying the prescribed workout", "Creating your own workout from scratch", "Running 1 mile prior to the WOD", "Recovery"],
	answer: 0
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 
'question7', 'question8', 'question9', 'question10'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
