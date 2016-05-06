$(document).ready(function(){
var running = false;
var playing = false;
var i = 0;
var note_context, note_node, gain_node, frequencyOne, frequencyTwo, repeat, repeatedNotes, runningVar;
var repeatCount = 2;
var duration = 1;
var pause = 2;

function randomFreq() {
  frequencyOne = Math.floor(Math.random() * 18);
  frequencyTwo = frequencyOne + Math.pow(-1, Math.ceil(Math.random() * 2)) * (Math.floor(Math.random() * 13));
}

function playNote(frequency) {
  
  var C2 = 65.41;
  note_context = new AudioContext();
  note_node = note_context.createOscillator();
  gain_node = note_context.createGain();
  var resultFreq = (440 *  Math.pow(2, frequency / 12));
  note_node.frequency.value = resultFreq.toFixed(2); // RANDOM NOTE
  
  console.log(note_node.frequency.value);
  gain_node.gain.value = 0;
  note_node.connect(gain_node);
  gain_node.connect(note_context.destination);
  note_node.start();
}

function toggle_playing_note() {
  playing = !playing;
	if (playing)
		gain_node.gain.value = 0.1;
	else {
  gain_node.gain.value = 0;
    setTimeout(function(){ note_context.close();
                         },100);
  }
}

function playNotesOnce() {
  playNote(frequencyOne);
  toggle_playing_note(); //start playing first note
  setTimeout(function(){toggle_playing_note();//stop first note after 1s
    }, (1000 * duration));
  setTimeout(function(){
    playNote(frequencyTwo);
    toggle_playing_note();//start 2nd note after 1 second
    }, (1000 * duration + 250));
  setTimeout(function(){
      toggle_playing_note(); //stop 2nd note after another second
    }, (2000 * duration + 250));
} //Total time: 2000 * duration + 250

function playRepeatedNotes() {
  
  repeatedNotes = setTimeout(function(){
    playNote(frequencyOne);
  toggle_playing_note(); //start playing first note
  setTimeout(function(){toggle_playing_note();//stop first note after 1s
    }, (1000 * duration));
  setTimeout(function(){
    playNote(frequencyTwo);
    toggle_playing_note();//start 2nd note after 1 second
    }, (1000 * duration + 250));
  setTimeout(function(){
      toggle_playing_note(); //stop 2nd note after another second
    }, (2000 * duration + 250));

  i++;
  if (i< repeatCount - 1) {
    playRepeatedNotes();
  }}, (2000 * duration + 250 + 1000 * pause));
}

function playASongForMe() {
  i = 0;
  randomFreq();
  playNotesOnce();
  playRepeatedNotes();
}

$("#play").click(function(){
  if (running) {
    return;
  }
  $(this).css("border-left", "5vh solid #70FF63");
  running = true;
  if (!playing) {
    playASongForMe();
 repeat = setInterval(function(){
    playASongForMe();
 }, (repeatCount * (2000 * duration + 250 + 1000 * pause) + 2000));
  }
});

$("#pause").click(function(){
    $("#play").css("border-left", "5vh solid white");
    clearInterval(runningVar);
    clearInterval(repeat);
    clearInterval(repeatedNotes);
    runningVar = setTimeout(function(){
      running = false;
    }, (1000 * 1.5 * duration));
})

$("#play").mouseenter(function(){
  if (!running) {
    $(this).css("border-left", "5vh solid #888888");
  }
})

$("#play").mouseleave(function(){
  if (!running) {
    $(this).css("border-left", "5vh solid white");
  }
})

$("#play").mousedown(function(){
  if (!running) {
    $(this).css("border-left", "5vh solid #444444");
  }
})

$("#pause").mouseenter(function(){
    $(".pauseBars").css("background-color", "#888888");
})

$("#pause").mouseleave(function(){
    $(".pauseBars").css("background-color", "white");
})

$("#pause").mousedown(function(){
    $(".pauseBars").css("background-color", "#444444");
})

$("#pause").mouseup(function(){
    $(".pauseBars").css("background-color", "#888888");
})


$("#repeatMinus").click(function(){
  if (running) {
    return;
  }
  if (repeatCount > 2) {
    repeatCount--;
    $("#repeatTime").text(repeatCount);
  }
});

$("#repeatPlus").click(function(){
  if (running) {
    return;
  }
  if (repeatCount < 10) {
    repeatCount++;
    $("#repeatTime").text(repeatCount);
  }
});

$("#durationMinus").click(function(){
  if (running) {
    return;
  }
  if (duration > 0.5) {
    duration = duration - 0.25;
    $("#durationTime").text(duration);
  }
});

$("#durationPlus").click(function(){
  if (running) {
    return;
  }
  if (duration < 3) {
    duration = duration + 0.25;
    $("#durationTime").text(duration);
  }
});

$("#pauseMinus").click(function(){
  if (running) {
    return;
  }
  if (pause > 1) {
    pause = pause - 0.5;
    $("#pauseTime").text(pause);
  }
});

$("#pausePlus").click(function(){
  if (running) {
    return;
  };
  if (pause < 5) {
    pause = pause + 0.5;
    $("#pauseTime").text(pause);
  };

});

});