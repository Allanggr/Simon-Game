var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
  if (!started){
    $("#title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#title").text("Level " + level);
  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);

    }
  }else{

    playSound("wrong");
    $("body").addClass("gameover");
    $("#title").text("GAME OVER, PRESS ANY KEY TO RESTART");

    setTimeout(function(){
      $("body").removeClass("gameover");
    }, 200);


    startOver();
  }

}


function startOver(){
  started = false;
  level = 0;
  gamePattern = [];
}
