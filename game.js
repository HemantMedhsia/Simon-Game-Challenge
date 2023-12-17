// alocating variable and resources for the gameplay.
let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red" , "blue" , "green" , "yellow"];
var started = false;
var level=0;

// frist function for starting the game. 
function nextSequence () {

    //refreshing user while starting the game / new game.
    userClickedPattern = [];

    // update the current level to +1;
    level++;

    // update game title to the game current level.
    $("#level-title").text("Level " + level);

    // generating the random number between 0 to 3
    let randomNumber = Math.floor(Math.random() * 4);

    // generating random color using alrady generated random numbers
    randomChosenColour = buttonColours[randomNumber];

    // adding current game colour to the game pattern 
    gamePattern.push(randomChosenColour);

    // applying the animation while generating the color.
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // playing the sound of the particular color while generating the color.
    playSound(randomChosenColour);
}



// jQuery for decting the user clicks and perform operation on it.
$(".btn").on("click" , function() {

    // finding which button is pressed. 
    var userChosenColour = this.id;
    console.log(userChosenColour);

    // playing button sound while user is clicking a button.
    playSound(userChosenColour);

    // pussing user button press record to userClickedPattern Array.
    userClickedPattern.push(userChosenColour);

    // applying the animantion on particular kay while user is pressing it.
    animatePress(userChosenColour);

    // cheking if user record is equal to game record.
    checkAnswer(userClickedPattern.length-1);
})



// function of playing sounds for the particular button.
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}




// function for applying pressed class for applying blinking animation using jQuery.
function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");

    setTimeout(function() {
        $("." + currentColour).removeClass("pressed");
    },100);

}



// function of decting frist keypress while starting the new game and checking condition for update started variable.  
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
       }
});



// function for checking the user answer
function checkAnswer(currentLevel) {
    // ckecking user currentLevel is equal to game currentLevel. 
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
        // checking user array length and game array length. 
        if(userClickedPattern.length===gamePattern.length) {
            // if conditions are true then calling the nextSequence of next level. 
            setTimeout(function() {
                nextSequence();
            },1000);

        }
    }
    else {
        // playing sound while entering the wrong pattern
        playSound("wrong");

        // adding game-over class to the body for applying red blinking backgroung animatioin.
        $("body").addClass("game-over");

        // removing class after 100 miliseconds.
        setTimeout(function() {
            $("body").removeClass("game-over");
        },100);

        // Updating title after the game is over, and calling startOver function.
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// reinitializing the value of resources for starting new game when the game is over. 
function startOver() {
    level=0;
    started=false;
    gamePattern = [];
}

$(".Inst").on("click" , function() {
    $("#instructions").slideDown();
    $(".Inst").slideUp();
})

$("#instructions").on("click" , function() {
    $("#instructions").slideUp();
    $(".Inst").slideDown();
})

$("#instructions").hide();