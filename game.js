
let gamePattern = [];
let userClickedPattern = [];
let gameStart;
let level = 0;
let buttonColors = ["green", "red", "yellow", "blue"]

$(".btn").click(clickHandler);

function nextSequence() {
    userClickedPattern = [];

    // Random color picker
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor);

    // Animates squares at the start of the next sequence
    playSound(`sounds/${randomChosenColor}.mp3`);
    $(`#${randomChosenColor}`).animate({opacity:.2}).animate({opacity:1})

    level++;
    $("h1").text(`Level ${level}`)
}

function playSound(sound) {
    let audio = new Audio(sound);
    audio.play();
}

function clickHandler() {
    // This function animates button when clicked, but only if the game has started

    if (gameStart === false) {
        let userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(`sounds/${$(this).attr("id")}.mp3`);
        animatePress(this);

        if (checkAnswer(userClickedPattern.length) === false) {
            gameOver();
            return;
        }

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence, 500);
        }
    }
    
}

function animatePress(currentColor) {
    $(currentColor).addClass("pressed");
    setTimeout(() => {$(currentColor).removeClass("pressed");}, 170)
}

function checkAnswer(index) {
    let gameColor = gamePattern[index - 1];
    let clickedColor = userClickedPattern[index - 1 ];

    if (gameColor === clickedColor) {
        return true;
    }
    else {
        return false;
    }  
}

function gameOver() {
        gameStart = true;
        level = 0;
        $("h1").text("GAME OVER: Press any key to play again");
        gamePattern = [];
        userClickedPattern = [];
}

$(document).keydown(() => {
    if (gameStart !== false) {  
        $("h1").text("Level 0");
        nextSequence();
    } 

    gameStart = false;
})
