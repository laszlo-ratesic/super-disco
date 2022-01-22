$('#currentDay').append(moment().format('dddd, MMMM Do'));

// Create a function that retrieves the current hour
// Declare css classes of 12 timeblocks based on relative time
// There will always be 12 blocks***

$('#hour-el').append(moment().format('h'));