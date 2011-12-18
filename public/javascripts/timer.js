function updateStats() {
    timeTicks("game_time",1,true);

    turnNumber = document.getElementById("turn_number").innerHTML;
    document.getElementById("message").innerHTML =
        document.getElementById("player_name_"+turnNumber).innerHTML + "'s turn now"
    timeTicks("player_turn_time_" + turnNumber,-1,false);
//    timeTicks("player_time_bank_" + turnNumber.-1,false);
    timeTicks("player_time_taken_so_far_" + turnNumber,1,true);
}

function timeTicks(timeId,addSecond,withHour) {
    timeText = document.getElementById(timeId).innerHTML;
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
        if (second === -1) {
            minute -= 1;
            second = 59;
        }
        if (minute === 60) {
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
        document.getElementById(timeId).innerHTML = hourPadding + hour + ":"
            + minutePadding + minute + ":"
            + secondPadding + second;
    } else {
        document.getElementById(timeId).innerHTML = minutePadding + minute + ":"
            + secondPadding + second;
    }

//    console.log("Result is " + document.getElementById("game_time_text").innerHTML);
}

var intervalId = 0;

function startRound() {
    roundNumber = parseInt(document.getElementById("round_number").innerHTML,10);
    roundNumber += 1;
    document.getElementById("round_number").innerHTML = roundNumber;

    doInterludeThenUpdateStats();
}

function doInterludeThenUpdateStats() {
    interludeTime = parseInt(document.getElementById("interlude_per_turn").innerHTML.substr(0,2),10);
    document.getElementById("message").innerHTML = "Interlude time " + document.getElementById("interlude_per_turn").innerHTML;
    setTimeout("updateStatsInInterval()",interludeTime * 1000);
}

function updateStatsInInterval() {
    intervalId = setInterval("updateStats()",1000);
}
function pauseGame() {
    clearInterval(intervalId);
}

function nextPlayer() {
    clearInterval(intervalId);
    turnNumber = parseInt(document.getElementById("turn_number").innerHTML,10);
    turnNumber += 1;

    numberOfPlayers = parseInt(document.getElementById("number_of_players").innerHTML,10);

    if (turnNumber > numberOfPlayers) {
        document.getElementById("turn_number").innerHTML = 1;
        document.getElementById("message").innerHTML = "end of round, press to start next round"
        clearInterval(intervalId);
    } else {
        document.getElementById("turn_number").innerHTML = turnNumber;
//        document.getElementById("message").innerHTML = ""
        doInterludeThenUpdateStats();
    }
}