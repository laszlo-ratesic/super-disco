// UNCOMMENT THIS LINE FOR TESTING
// OUTSIDE OF BUSINESS HOURS
// const hour = 12;

// Uses Moment JS to display current date
$("#currentDay").append(moment().format("dddd, MMMM Do"));

// Store current hour as a number
const hour = Number(moment().format("H"));


// Initialize empty task list object
let taskList = {};

function loadTasks() {
  // Retrieve saved tasks from localStorage
  taskList = JSON.parse(localStorage.getItem("punkTasks"));

  // If nothing has been saved yet,
  // constructs the empty list object
  // with the appropriate keys
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
}

// Loads the tasks saved in localStorage
loadTasks();

// OUTER for-loop to create our time-blocks
for (let i = 0; i < 9; i++) {
  // Creates a container row for the time-block elements
  const newRow = $('<div class="row time-block"></div>');
  // Creates and sizes the hour div, and gives it an id relating to it's actual time
  // prettier-ignore
  const newHour = $('<div class="hour col-2 col-lg-1"></div>').attr("id", i + 9);

  // Conditional checks whether to add 'am' or 'pm' after hour
  if (i + 9 < 12) {
    newHour.text(i + 9 + "am");
  } else if (i + 9 === 12) {
    newHour.text(i + 9 + "pm");
  } else {
    newHour.text(i - 3 + "pm");
  }

  // INNER for-loop to populate timeblocks
  for (let j = 0; j < 3; j++) {
    // FIRST, add the hour div
    if (j < 1) {
      $(newRow).append(newHour);
    }

    // SECOND, add the textarea element
    else if (j === 1) {
      // Convert the hour id to a number for comparison
      const hourNum = Number(newHour.attr("id"));
      // Create and size the textarea element
      const textArea = $('<textarea class="col-8 col-lg-10"></textarea>');

      // Conditional checks whether the timeblock is past, present, or future
      // to the current time, using MomentJS
      if (hourNum < hour) {
        textArea.addClass("past");
      } else if (hourNum === hour) {
        textArea.addClass("present");
      } else {
        textArea.addClass("future");
      }

      // Creates a reference to an array of key-value pairs from our task list object
      const pairs = Object.entries(taskList);
      // Updates the textarea to show the saved value from localstorage, if there is one
      textArea.text(pairs[i][1]);

      // Inserts the newly created textarea element into the time-block
      $(newRow).append(textArea);
    }

    // THIRD, create, size, and add an icon to the save button
    else {
      const button = $('<button class="saveBtn col-2 col-lg-1"><i class="far fa-save"></i></button>');
      // Insert save button into time-block
      $(newRow).append(button);
    }
  }

  // Inserts the new time-block into the larger container
  $(".container").append(newRow);
}

// Save button event listener
$(".saveBtn").click(function () {
  // References the current value of what is typed in the textarea
  // preceding whichever saveBtn was clicked
  const taskText = $(this).prev().val();
  // References the hour of the selected time-block
  const time = $(this).parent()[0].innerText;
  // Initializes an empty object to store the new key-value pair
  const newTask = {};

  // Adds the hour as a key, and the text as its value
  newTask[time] = taskText;

  // Updates our taskList to include the newly created object
  Object.assign(taskList, newTask);
  // Saves the new list to localStorage
  localStorage.setItem("punkTasks", JSON.stringify(taskList));
});

