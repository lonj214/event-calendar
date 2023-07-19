$(function () {

  function printEventData() {
    eventDisplayEl.empty();
    var events = readEventsFromStorage();
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
$(".time-block").each(function(){
  var id = $(this).attr("id")
  $(this).children("textarea").val(localStorage.getItem(id))
})
});


