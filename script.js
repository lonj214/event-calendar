// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.



//   this should get the event from local storage
// var projects = readEventsFromStorage();


$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  //  Going to create a function that will save events put into calendar; Need to include id in the containing time-block
  function readEventsFromStorage() {
    var hourlyEvents = localStorage.getItem('events');
    if (events) {
      events = JSON.parse(events);
    } else {
      events = [];
    }
    return events;
  }


  //   this function should take the array of events and save them into local storage

  function saveEventsToStorage(events) {
    localStorage.setItem('events', JSON.stringify(events));
  }

  // now we need to take the array of events and save them to their appropriate id and display it there
  function printEventData() {
    eventDisplayEl.empty();
    var events = readEventsFromStorage();
    // loops through each event and creates a row HOWEVER i dont need a row I need them to attach to their respective hour
    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];
      var eventTime = dayjs(event.time);
      // get date/time for start of today
      var today = dayjs().startOf('day');

      var eventNameEl = $('<textarea').text(event.name);
      var eventTimeBlockEl = $('<div>').text(eventTime.format());

      eventDisplayEl.append(eventTimeBlockEl);
    }

    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    $("#hour-10").on("click", function () {
      alert("Saved");
    });
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.

  }
  var currentDayEl = $('#currentDay');

  function displayDate() {
    var todaysDate = dayjs().format('MMM DD, YYYY');
    currentDayEl.text(todaysDate);
  }
  displayDate()
  function determineTimeNow() {
    var currentTime = dayjs().hour()
    console.log(currentTime)
    console.log($(this).attr("id").slice(5))
    var hour = $(this).attr("id").slice(5)
    //     console.log(hour)
    if (hour < currentTime) {
      $(this).addClass("past").removeClass("present future")
    }
    else if (hour == currentTime) {
      $(this).addClass("present").removeClass("past future")
    }
    else {
      $(this).addClass("future").removeClass("present past")
    }


  }
  $(".time-block").each(determineTimeNow)

  $(".saveBtn").click(function(){
    console.log($(this).parent().attr("id"))
    var words = $(this).siblings("textarea").val()
    console.log(words)
    var id = $(this).parent().attr("id")
    localStorage.setItem(id, words)
  })
// Each loop through time block, got to local storage and get the time block id from local storage and apply it back
$(".time-block").each(function(){
  var id = $(this).attr("id")
  $(this).children("textarea").val(localStorage.getItem(id))
})
});


