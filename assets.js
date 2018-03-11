// Assume the following situations.

// (TEST 1)
// First Train of the Day is 3:00 AM
// Assume Train comes every 3 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Use your brain first)
// It would be 3:18 -- 2 minutes away

// (TEST 2)
// First Train of the Day is 3:00 AM
// Assume Train comes every 7 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Use your brain first)
// It would be 3:21 -- 5 minutes away


// ==========================================================

// Solved Mathematically
// Test case 1:
// 16 - 00 = 16
// 16 % 3 = 1 (Modulus is the remainder)
// 3 - 1 = 2 minutes away
// 2 + 3:16 = 3:18

// Solved Mathematically
// Test case 2:
// 16 - 00 = 16
// 16 % 7 = 2 (Modulus is the remainder)
// 7 - 2 = 5 minutes away
// 5 + 3:16 = 3:21

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAmdFiIU_CZ9QkZs21EnO5r7R1uXjPBPwY",
    authDomain: "train-schedule-1a67a.firebaseapp.com",
    databaseURL: "https://train-schedule-1a67a.firebaseio.com",
    storageBucket: "train-schedule-1a67a.appspot.com",
}
firebase.initializeApp(config);

//   initialize values
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;
var minutes = "";
var trainArrivalTime = "";
var currentTime = "";

var database = firebase.database();

// Capture Button Click
$("#add-train").on("click", function () {
    // Don't refresh the page
    event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#first-train-time").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");
});

// This needs to be added to the Current Train Schedule.
database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
    var sv= snapshot.val(); 
    var tfrequency = childSnapshot.val().frequency;

  // pushed back 1 year to make sure it comes before current time
  var convertedDate = moment(childSnapshot.val().firstTrain, 'hh:mm').subtract(1, 'years');
  var trainTime = moment(convertedDate).format('HH:mm');
  var currentTime = moment();
  // pushed back 1 year to make sure it comes before current time
  var firstTimeConverted = moment(trainTime,'hh:mm').subtract(1, 'years');
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % tfrequency;
  //solved
  var tMinutesTillTrain = tfrequency - tRemainder;
  //solved
  var nextTrain = moment().add(tMinutesTillTrain, 'minutes').format('HH:mm')

  // build a new row for information.
    $("#trainSchedule").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" +
        childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency +
        "</td><td>" + trainTime + "</td><td>" + tMinutesTillTrain + "</td></tr>")
});


Assumptions

var tFrequency = 3;

// Time is 3:30 AM
var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

$("#submit").on("click", function (e) {
    e.preventDefault();
    var trainName = $("#train-name").val();
    var destination = $("#destination").val();
    var firstTrainTime = $("#firstTrainTIme").val();
    var frequency = $("#frequency").val();

    //add to firebase, object
    var newTrainInfo = {
        name: trainName,
        dest: destination,
        ftt: firstTrainTime,
        frequency: frequency
    }

});