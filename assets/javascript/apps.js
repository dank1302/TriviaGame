var triviaQuestions = [{
	question: "What is the name of the actor that played Charlie Conway?",
	answerList: [" Robert Dinero ", " Clint Eastwood ", " Joshua Jackson "],
	answer: 2
},{
	question: "What is the name of the actor who played Gordon Bombay?",
	answerList: [" Alec Baldwin ", " Emilio Estevez ", " Patrick Swayze "],
	answer: 1
},{
	question: "Who did the USA Ducks beat in D2 to win the Junior Goodwill Games?",
	answerList: [" Russia ", " Finland ", " Iceland "],
	answer: 2
},{
	question: "Fulton Reed, Dean Portman, and which other player made up the bash brothers group?",
	answerList: [" Greg Goldberg ", " Kenny Wu ", " Adam Banks "],
	answer: 1
},{
	question: "What was the nickname of the Iceland coach Wolf Stansson?",
	answerList: [" the enforcer ", " the crazy dude from Iceland ", " the dentist "],
	answer: 2
},{
	question: "What is the name of the Duck's goalie in the first movie?",
	answerList: ["Jackson Teller", "Greg Goldberg", "James Franco", "Julie Gaffney"],
	answer: 1

}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Quack! Quack! Quack! That's right!",
	incorrect: "Nope... cake eater.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how you did."
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
    $('#winPic').empty();
    $('#nopePic').empty();
	answered = true;
	
	
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
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	
	
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
        $('#message').html(messages.correct);
        $('#winPic').html('<img src="https://cdn-images-1.medium.com/max/853/1*VHZoMF2fOmlWEZEqNxvV8A.jpeg" alt="The mighty ducks team rejoicing" class="img-thumbnail" width = "400px">');
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
        incorrectAnswer++;
		$('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        $('#nopePic').html('<img src="http://www.snakkle.com/wp-content/uploads/2012/10/brandon-adams-mighty-ducks-movie-1992-photo-GC.jpg" alt="ducks player with look of disdain" width = "400px">');
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
    $('#winPic').empty();
    $('#nopePic').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}