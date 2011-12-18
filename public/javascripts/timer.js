function updateStats() {
    timeText = document.getElementById("game_time_text").innerHTML;
    hour = parseInt(timeText.substr(0,2), 10);
    minute = parseInt(timeText.substr(3,2), 10);
    second = parseInt(timeText.substr(6,2), 10);

    console.log("hour:" + timeText.substr(0,2) + ", minute:" + timeText.substr(3,2) + ", seconds:" + timeText.substr(6,2));
    console.log("hour:" + hour + ", minute:" + minute + ", seconds:" + second);

    second += 1;
    if (second === 60) {
        minute += 1;
        second = 0;
    }
    if (minute === 60) {
        hour += 1;
        minute = 0;
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
    console.log("seconds: " + second);

    document.getElementById("game_time_text").innerHTML = hourPadding + hour + ":"
        + minutePadding + minute + ":"
        + secondPadding + second;

    console.log("Result is " + document.getElementById("game_time_text").innerHTML);
}

var intervalId = 0;

function startRound() {
    intervalId = setInterval("updateStats()", 500);
}

function endGame() {
    clearInterval(intervalId);
}