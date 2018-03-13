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
database.ref().on("child_added", function (snapshot) {
    var sv= snapshot.val(); 
    var tfrequency = snapshot.val().frequency;
    // $("#train-name").val("");
    // $("#destination").val("");
    // $("#first-train-time").val("");
    // $("#frequency").val("");
console.log (snapshot.val());

  // pushed back 1 year to make sure it comes before current time
  var convertedDate = moment(snapshot.val().firstTrainTime, 'hh:mm').subtract(1, 'years');
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
    $("#trainSchedule").append("<tr><td>" + snapshot.val().trainName + "</td><td>" +
        snapshot.val().destination + "</td><td>" + snapshot.val().frequency +
        "</td><td>" + trainTime + "</td><td>" + tMinutesTillTrain + "</td></tr>")
});


// Assumptions

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