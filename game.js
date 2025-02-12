
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern =[];

var userClickedPattern = [];

var startGame = false;

var level = 0;

function nextSequence(){
  userClickedPattern = [];
  $("h1").text("Level " + level);
  level++;
  var randomNumber = Math.round(Math.random()*3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// check if this sequence works, it should be above nextSequence

$(".btn").click(function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1)
})

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

  $(document).keydown(function(){
    if(!startGame){
      $("h1").text("Level " + level);
      nextSequence();
      startGame = true;
    }
  });

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence()}, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    }, 200);
    $("h1").text("Game over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern=[];
  startGame = false;
}
