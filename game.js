var buttonColors = ['green', 'red', 'yellow', 'blue'];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

var started = false;
var cnt = 1;

$(document).click(function() {
    cnt++;
    if(cnt==2) {
        initial();
    }
});

$(document).keypress(function() {
    initial();
})

$('.btn').click(function() {    
    userClickedPattern.push($(this).attr('id'));
    
    playSound($(this).attr('id'));
    animatePress($(this).attr('id'));

    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(level) {
    if ( userClickedPattern[level] === gamePattern[level] ) {
        if( userClickedPattern.length === gamePattern.length ) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');
        $('body').addClass('red');
        $('#level-title').html('Game-Over, Press Any Key to Restart');

        setTimeout(function() {
            $('body').removeClass('red');
        }, 200);

        startOver();        
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').html('Level ' + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currname) {
    $("#" + currname).addClass('pressed');

    setTimeout(function() {
        $("#" + currname).removeClass('pressed');
    }, 100);
}


function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
    cnt = 0;
}

function initial() {
    if (!started) {
        $('#level-title').html('Level ' + level);
        nextSequence();
        started = true;
    }
}