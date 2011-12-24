
function updateStats() {
    timeTicks("game_time",1,true);

    turnNumber = document.getElementById("turn_number").value;
    document.getElementById("message").innerHTML =
    document.getElementById("player_name_"+turnNumber).value + "'s turn now"

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
    document.getElementById("start_round_button").style.visibility = "hidden";
    document.getElementById("next_button").style.visibility = "visible";
    document.getElementById("pause_button").style.visibility = "visible";
    doInterludeThenUpdateStats();
}

function doInterludeThenUpdateStats() {
    interludeTime = parseInt(document.getElementById("interlude_per_turn").innerHTML.substr(0,2),10);
    document.getElementById("message").innerHTML = "Interlude time " + document.getElementById("interlude_per_turn").innerHTML;
    intervalId = setTimeout("updateStatsInInterval()",interludeTime * 1000);
}

function updateStatsInInterval() {
    intervalId = setInterval("updateStats()",1000);
}
function pauseGame() {
    clearInterval(intervalId);
    document.getElementById("pause_button").style.visibility = "hidden";
    document.getElementById("resume_button").style.visibility = "visible";
}

function resumeGame() {
    intervalId = setTimeout("updateStatsInInterval()", 1000);
    document.getElementById("pause_button").style.visibility = "visible";
    document.getElementById("resume_button").style.visibility = "hidden";
}

function endGame() {
    document.getElementById("turn_number").value = "-1"
    document.getElementById("form_timer").submit();
}

function nextPlayer() {
    clearInterval(intervalId);

    turnNumber = parseInt(document.getElementById("turn_number").value,10);
    turnNumber += 1;

    numberOfPlayers = parseInt(document.getElementById("number_of_players").innerHTML,10);

    if (turnNumber > numberOfPlayers) {
        document.getElementById("turn_number").value = 1;
        document.getElementById("message").innerHTML = "end of round, press to start next round"
        document.getElementById("start_round_button").style.visibility = "visible";
        document.getElementById("next_button").style.visibility = "hidden";
        document.getElementById("pause_button").style.visibility = "hidden";
        document.getElementById("resume_button").style.visibility = "hidden";
        $("#form_timer").submit();
    } else {
        document.getElementById("turn_number").value = turnNumber;
        //        document.getElementById("message").innerHTML = ""
        doInterludeThenUpdateStats();
    }
}

$(function() {

    $( "#change_turn_order_button" )
    .click(function() {
        $( "#change_turn_order_dialog" ).dialog( "open" );
    });

    $( "#player_sortable" ).sortable({
        placeholder: "ui-state-highlight",
        opacity: 0.6,
        stop: function(event, ui) { 
            //            alert ("sortable inside!");
            var orders = $('#player_sortable').sortable('toArray');
            $.each(orders, function(i,order){
                $('<input />').attr('type', 'hidden')
                .attr('name', order)
                .attr('value', i+1)
                .appendTo('#form_timer');
            });
            var input = $("<input>").attr("type", "hidden").attr("name", "commit").val("change_turn_order");
            $('#form_timer').append($(input));
            $("#form_timer").submit();
        }
    });
});