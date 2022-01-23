$("#currentDay").append(moment().format("dddd, MMMM Do"));

// Create a function that retrieves the current hour
// Declare css classes of 12 timeblocks based on relative time
// There will always be 12 blocks***

// Store current hour in a variable
const hour = Number(moment().format("H"));
// const hour = 12;

let taskList = {};

function loadTasks() {
  taskList = JSON.parse(localStorage.getItem("tasks"));

  if (!taskList) {
    taskList = {
      "9am": "",
      "10am": "",
      "11am": "",
      "12pm": "",
      "1pm": "",
      "2pm": "",
      "3pm": "",
      "4pm": "",
      "5pm": "",
    };
  }

  const pairs = Object.entries(taskList);

  console.log(pairs);

  for (let i = 0; i < pairs.length; i++) {
      console.log(pairs[i][0]) // needs to be used as a reference of where we're going
      console.log(pairs[i][1]) // is what we will put in the 'where we're going'
  }

}

loadTasks();
// console.log(hour);

for (let i = 0; i < 9; i++) {
  // creates a container row
  const newRow = $('<div class="row time-block"></div>').attr("id", i);
  const newHour = $('<div class="hour col-2 col-lg-1"></div>').attr(
    "id",
    i + 9
  );
  if (i + 9 < 12) {
    newHour.text(i + 9 + "am");
  } else if (i + 9 === 12) {
    newHour.text(i + 9 + "pm");
  } else {
    newHour.text(i - 3 + "pm");
  }
  for (let j = 0; j < 3; j++) {
    if (j < 1) {
      $(newRow).append(newHour);
    } else if (j === 1) {
      const hourNum = Number(newHour.attr("id"));
      const textArea = $('<textarea class="col-8 col-lg-10"></textarea>');
      if (hourNum < hour) {
        textArea.addClass("past");
      } else if (hourNum === hour) {
        textArea.addClass("present");
      } else {
        textArea.addClass("future");
      }
      const pairs = Object.entries(taskList);
      textArea.text(pairs[i][1]);
      $(newRow).append(textArea);
    } else {
      const button = $('<button class="saveBtn col-2 col-lg-1"></button>');
      $(newRow).append(button);
    }
  }
  $(".container").append(newRow);
}

$(".saveBtn").click(function () {
  const taskText = $(this).prev().val();
  const time = $(this).parent()[0].innerText;
  const newTask = {};
  newTask[time] = taskText;
  Object.assign(taskList, newTask);
  console.log(taskList);
  localStorage.setItem("tasks", JSON.stringify(taskList));
});
