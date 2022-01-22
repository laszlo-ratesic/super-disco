$('#currentDay').append(moment().format('dddd, MMMM Do'));

// Create a function that retrieves the current hour
// Declare css classes of 12 timeblocks based on relative time
// There will always be 12 blocks***

// Store current hour in a variable
const hour = moment().format('H');

// console.log(hour);

for (let i = 0; i < 13; i++) {
    // creates a container row
    const newRow = $('<div class="row time-block"></div>').attr('id', i);
    const newHour = $('<div class="hour col-2 col-lg-1"></div>').attr('id', (i + 9));
    if ((i + 9) < 12) {
        newHour.text((i + 9) + 'am');
    }
    else if ((i + 9) === 12) {
        newHour.text((i + 9) + 'pm');
    }
    else {
        newHour.text((i - 3) + 'pm');
    }
    for(let j = 0; j < 3; j++) {
        if (j < 1) {
            $(newRow).append(newHour);
        }
        else if (j === 1) {
            const textArea = $('<textarea class="col-8 col-lg-10"></textarea>');
            if (Number(newHour.attr('id')) < hour) {
                textArea.addClass('past');
            }
            else if (newHour.attr('id') === hour) {
                textArea.addClass('present');
            }
            else {
                textArea.addClass('future');
            }
            $(newRow).append(textArea);
        }
        else {
            $(newRow).append('<button class="saveBtn col-2 col-lg-1"></button>');
        }
    }
    $('.container').append(newRow);
}