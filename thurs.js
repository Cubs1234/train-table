var firebaseConfig = {
  apiKey: "AIzaSyAezFtPCVdK1qSqedU5P9qaD3RYiOefWH8",
  authDomain: "train-table-31088.firebaseapp.com",
  databaseURL: "https://train-table-31088.firebaseio.com",
  projectId: "train-table-31088",
  storageBucket: "train-table-31088.appspot.com",
  messagingSenderId: "1171270101",
  appId: "1:1171270101:web:9b86b83b6378525e"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#addTrainBtn").on("click", function() {
  // take user input

  var trainName = $("#trainNameInput")
    .val()
    .trim();

  var destination = $("#destinationInput")
    .val()
    .trim();

  var firstTrain = moment(
    $("#timeInput")
      .val()
      .trim(),
    "HH:mm"
  ).format("HH:mm");

  var frequency = $("#frequencyInput")
    .val()
    .trim();

  var newTrain = {
    name: trainName,

    place: destination,

    ftrain: firstTrain,

    freq: frequency
  };

  // train to the database

  database.ref().push(newTrain);

  console.log(newTrain.name);

  // text-boxes

  $("#trainNameInput").val("");

  $("#destinationInput").val("");

  $("#timeInput").val("");

  $("#frequencyInput").val("");

  return false;
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  //childSnapshot values into a variable

  var trainName = childSnapshot.val().name;

  var destination = childSnapshot.val().place;

  var firstTrain = childSnapshot.val().ftrain;

  var frequency = childSnapshot.val().freq;

  // pushed back

  var firstTimeConverted = moment(firstTrain, "HH:mm");

  console.log(firstTimeConverted);

  var currentTime = moment().format("HH:mm");

  console.log("CURRENT TIME: " + currentTime);

  // store difference between currentTime and fisrt train converted in a variable.

  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");

  console.log(firstTrain);

  console.log("Difference in Time: " + timeDiff);

  var timeRemainder = timeDiff % frequency;

  var minToTrain = frequency - timeRemainder;

  // next train

  var nxTrain = moment()
    .add(minToTrain, "minutes")
    .format("HH:mm");

  $("#trainTable>tbody").append(
    "<tr><td>" +
      trainName +
      "</td><td>" +
      destination +
      "</td><td>" +
      nxTrain +
      "</td><td>" +
      frequency +
      "</td><td>" +
      minToTrain +
      "</td></tr>"
  );
});
