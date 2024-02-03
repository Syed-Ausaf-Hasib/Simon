var buttonColours=['yellow','blue','green','red']
var gamePattern=[]
var userClickedPattern=[]
var level=0

function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4)
    var randomChosenColour=buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    $('#'+randomChosenColour).fadeOut(100).fadeIn(100)

    level++
    $('h1').html("Level "+level)
    playSound(randomChosenColour)
}

function playSound(name){
    var sound=new Audio("sounds/"+name+".mp3")
    sound.play()
}

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id")
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer()
})

function checkAnswer(){
    flag=0
    for(i=0;i<userClickedPattern.length;i++){
        if(gamePattern[i]!==userClickedPattern[i]){
            flag=1
        }
    }
    if(gamePattern.length===userClickedPattern.length){
        if(flag===0){
            userClickedPattern=[]
            setTimeout(function(){
                nextSequence()
            },500);
        }
    }
    if(flag===1){
        wrongTile()
    }   
    
}

function wrongTile(){
    $("body").addClass("wrong")
    setTimeout(function(){
        $("body").removeClass("wrong")
    },200)
    $("h1").html("Game Over, Press Any Key to Restart")
    var wrong=new Audio("sounds/wrong.mp3")
    wrong.play()
    $(document).keypress(function(){
        startOver()
    })
}

$(document).keypress(function(e){
    var sq=e.key-1
    if(e.key>3 && e.key<6){
        sq=e.key-2
    }
    if(e.key==3){
        sq=6
    }
    if(e.key>=0 && e.key<=9){
        userClickedPattern.push(buttonColours[sq])
        playSound(buttonColours[sq])
        animatePress(buttonColours[sq])
        checkAnswer()
    }
})

$(document).keypress(function(){
    if(gamePattern.length===0){
        $("h1").html("Press A Key to Start")
        console.log("restart")
        nextSequence()
    }
})

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed")
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed")
    },100)
}

function startOver(){
    location.reload(true)
}
