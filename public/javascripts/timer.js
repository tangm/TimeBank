
$(function() {
    $('#pause_button').click(function(e){
        pauseGame();
    });
    $('#resume_button').click(function(e){
        resumeGame();
    });
});

function updateStats() {
    timeTicks("game_time",1,true);

    turnNumber = document.getElementById("turn_number").value;
    document.getElementById("message").innerHTML =
    document.getElementById("player_name_"+turnNumber).value + "'s turn now"
    if (document.getElementById("player_turn_time_" + turnNumber).value === "00:10") {
        document.getElementById("message_time").style.color = "red";
    }

    if (document.getElementById("player_turn_time_" + turnNumber).value === "00:00"
        && document.getElementById("player_time_bank_" + turnNumber).value === "00:00") {
        document.getElementById("message").innerHTML = "skipping player "
        + document.getElementById("player_name_"+turnNumber).value
        + ", no more time left for this turn";
        nextPlayer();
    } else {
        if (document.getElementById("player_turn_time_" + turnNumber).value === "00:00") {
            timeTicks("player_time_bank_" + turnNumber,-1,false);
        } else {
            timeTicks("player_turn_time_" + turnNumber,-1,false);
        }
        document.getElementById("message_time").innerHTML =
        document.getElementById("player_turn_time_" + turnNumber).value +
        " &nbsp&nbsp&nbsp&nbsp&nbsp with timebank: "+ document.getElementById("player_time_bank_" + turnNumber).value;
    
    }



    //    timeTicks("player_time_bank_" + turnNumber.-1,false);
    timeTicks("player_time_taken_so_far_" + turnNumber,1,true);
}

function timeTicks(timeId,addSecond,withHour) {
    timeText = document.getElementById(timeId).value;
    //    console.log ("withHour: " + withHour);
    if (withHour === true) {
        hour = parseInt(timeText.substr(0,2), 10);
        minute = parseInt(timeText.substr(3,2), 10);
        second = parseInt(timeText.substr(6,2), 10);
    } else {
        hour = 0
        minute = parseInt(timeText.substr(0,2), 10);
        second = parseInt(timeText.substr(3,2), 10);
    }
    //    console.log("hour:" + timeText.substr(0,2) + ", minute:" + timeText.substr(3,2) + ", seconds:" + timeText.substr(6,2));
    //    console.log("hour:" + hour + ", minute:" + minute + ", seconds:" + second);
    second += addSecond;

    if (addSecond === 1) {
        if (second === 60) {
            minute += 1;
            second = 0;
        }
        if (minute === 60) {
            hour += 1;
            minute = 0;
        }
    } else if (addSecond === -1) {
        //        console.log(timeId+" top hour:" + hour + ", minute:" + minute + ", seconds:" + second);
        if (second === -1) {
            minute -= 1;
            second = 59;
        }
        if (minute === -1) {
            hour -= 1;
            minute = 59;
        }
        
    }

    if (second < 10) {
        secondPadding = "0";
    } else {
        secondPadding = "";
    }
    if (minute < 10) {
        minutePadding = "0";
    } else {
        minutePadding = "";
    }
    if (hour < 10) {
        hourPadding = "0";
    } else {
        hourPadding = "";
    }
    //    console.log("seconds: " + second);

    if (withHour === true) {
        document.getElementById(timeId).value = hourPadding + hour + ":"
        + minutePadding + minute + ":"
        + secondPadding + second;
    } else {
        document.getElementById(timeId).value = minutePadding + minute + ":"
        + secondPadding + second;
    }

//    console.log("Result is " + document.getElementById("game_time_text").value);
}

var intervalId = 0;

function startRound() {
    roundNumber = parseInt(document.getElementById("round_number").value,10);
    roundNumber += 1;
    document.getElementById("round_number").value = roundNumber;
    document.getElementById("round_number_display").innerHTML = roundNumber;
    document.getElementById("turn_number").value = 1;
    doInterludeThenUpdateStats();
}

function continue_step() {
    document.getElementById("message_time").style.color = "black";
    $(".set-as-first").hide();
    turnNumber = parseInt(document.getElementById("turn_number").value,10);
    if (turnNumber === 0) {
        startRound();
    } else {
        nextPlayer();
    }
}

function doInterludeThenUpdateStats() {
    interludeTime = parseInt(document.getElementById("interlude_per_turn").value.substr(0,2),10);
    
    turnNumber = document.getElementById("turn_number").value;
    document.getElementById("message").innerHTML = document.getElementById("player_name_"+turnNumber).value + "'s turn is starting in " + document.getElementById("interlude_per_turn").value;
    document.getElementById("message_time").innerHTML = "&nbsp"
    clearInterval(intervalId);
    intervalId = setTimeout("updateStatsInInterval()",interludeTime * 1000);
}

function updateStatsInInterval() {
    clearInterval(intervalId);
    intervalId = setInterval("updateStats()",1000);
}
function pauseGame() {
    clearInterval(intervalId);

}

function resumeGame() {
    clearInterval(intervalId);
    intervalId = setTimeout("updateStatsInInterval()", 1000);

}

function endGame() {
    document.getElementById("turn_number").value = "-1"
    $("#form_timer").submit();
}

function nextPlayer() {

    turnNumber = parseInt(document.getElementById("turn_number").value,10);
    turnNumber += 1;

    numberOfPlayers = parseInt(document.getElementById("number_of_players").value,10);

    if (turnNumber > numberOfPlayers) {
        document.getElementById("turn_number").value = 0;
        document.getElementById("message").innerHTML = "End of round, please wait..."

        $("#form_timer").submit();
    } else {
        document.getElementById("turn_number").value = turnNumber;
        //        document.getElementById("message").innerHTML = ""
        doInterludeThenUpdateStats();
    }
}

