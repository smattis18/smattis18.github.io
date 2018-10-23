// Initialize Firebase
var config = {
    apiKey: "AIzaSyBv7W15sRXPMbkyZissQsxd3fcqkxkrPKY",
    authDomain: "train-schedule-homework-30e70.firebaseapp.com",
    databaseURL: "https://train-schedule-homework-30e70.firebaseio.com",
    projectId: "train-schedule-homework-30e70",
    storageBucket: "train-schedule-homework-30e70.appspot.com",
    messagingSenderId: "391174970072"
  };
  firebase.initializeApp(config);
  // Store database object in a variable
  var database = firebase.database();
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirst = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var newTrain = {
      name: trainName,
      destination: trainDestination,
      first: trainFirst,
      frequency: trainFrequency
    };
    // Push entered form data to root of Firebase database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    document.getElementById("add-train-form").reset();
    
    database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

      var trainName = childSnapshot.val().name;
      var trainDestination = childSnapshot.val().destination;
      var trainFirst = childSnapshot.val().first;
      var trainFrequency = childSnapshot.val().frequency;

      console.log(trainName);
      console.log(trainDestination);
      console.log(trainFirst);
      console.log(trainFrequency);
      
      // Current time
      var currentTime = moment();
      console.log(currentTime)
      var converted = moment(trainFirst, "HH:mm");
      console.log(converted)
      var diffTime = moment().diff(moment(converted), "minutes");
      console.log(diffTime)
      
      if (diffTime < 0) {
          diffTime = Math.abs(diffTime);
          diffTime++;
          console.log(diffTime);
      }

      /* NOTE: Cannot add diffTime minutes to current time or moment().  The logic I am trying to work
      out here is that if the first train time entered is in the future, we would need to find the difference
      between it and the current time to establish a baseline to then add the first frequencey time to achieve
      the next train time.

      I keep getting an object when I try to add diffTime to moment() I am not able to format it either.
      
      var newTime = moment().add(diffTime, "minutes")
      moment(newTime).format("HH:mm")
      console.log(newTime)
      */
      
      var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(moment(nextTrain).format("HH:mm a")),
        $("<td>").text(tMinutesTillTrain)
      );

      $("#train-sch-table > tbody").append(newRow);
      });
  });