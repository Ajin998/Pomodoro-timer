var bell = new Audio("./assets/bell.mp3");
var min_work;
var sec_work = 00;
var min_break;
var sec_break = 00;
var data1;
var data2;
var startTimer;
var timer_work;
var timer_break;
var timer_cycle;
var cycle = 0;
var start = document.querySelector("#timer-start");
var pause = document.querySelector("#timer-pause");
var reset = document.querySelector("#timer-reset");

var root = document.querySelector(".display-session");

// -----------------For Modularizing---------------------------------
document.getElementById("set-timer").addEventListener("click", () => {
  if (
    document.getElementById("work_time").value !== "" &&
    document.getElementById("break_time").value !== ""
  ) {
    min_work = document.getElementById("work_time").value;
    min_break = document.getElementById("break_time").value;
    timer_work = document.createElement("h1");
    timer_work.id = "timer_for_work";
    timer_work.innerHTML = `Work Time--> ${min_work} m :${sec_work} s`;
    root.append(timer_work);
    timer_cycle = document.createElement("h1");
    timer_cycle.id = "cycle";
    timer_cycle.innerHTML = `No. of Cycle--->${cycle}`;
    root.append(timer_cycle);
    timer_break = document.createElement("h1");
    timer_break.id = "timer_for_break";
    timer_break.innerHTML = `Break Time--> ${min_break} m :${sec_break} s`;
    root.append(timer_break);
    document.getElementById("work_time").value = "";
    document.getElementById("break_time").value = "";
  } else {
    alert("Empty Timer value not allowed");
  }
});
// ------------------------------------------------------------------------------------

// For resetting the timer...
document.getElementById("reset-timer").addEventListener("click", () => {
  root.querySelectorAll("*").forEach((n) => n.remove());
});

//main function
const printTime = () => {
  //For work Section
  if (sec_work != 0) sec_work--;
  else if (sec_work == 0 && min_work != 0) {
    sec_work = 59;
    min_work--;
  }
  timer_work.innerHTML = `Work:-${min_work}:${sec_work}`;

  //For Break Section
  if (min_work == 0 && sec_work == 0) {
    bell.play();
    if (sec_break != 0) sec_break--;
    else if (sec_break == 0 && min_break != 0) {
      sec_break = 59;
      min_break--;
    }
    timer_break.innerHTML = `Break:-${min_break}:${sec_break}`;
  }

  //Counter part
  if (min_work == 0 && sec_work == 0 && min_break == 0 && sec_break == 0) {
    min_work = 25;
    sec_work = 0;
    min_break = 5;
    sec_break = 0;
    cycle++;
    timer_cycle.innerHTML = `No. of Cycles:-${cycle}`;
  }
};
start.addEventListener("click", () => {
  if (startTimer === undefined) {
    startTimer = setInterval(printTime, 1000);
  } else {
    alert("Timer running");
  }
});
const stoptimer = () => {
  clearInterval(startTimer);
  startTimer = undefined;
};
pause.addEventListener("click", () => {
  stoptimer();
  startTimer = undefined;
});

reset.addEventListener("click", () => {
  min_work = 25; //By default value
  timer_work.innerHTML = `Work:-${min_work}:${sec_work}`;

  sec_work = 0;
  min_break = 5; // By Default value
  timer_break.innerHTML = `Break:-${min_break}:${sec_break}`;

  sec_break = 0;
  cycle = 0;
  timer_cycle.innerHTML = `No. of Cycles:-${cycle}`;

  stoptimer();
});
