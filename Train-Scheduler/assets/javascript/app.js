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
  });
    
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
      
      var currentTime = moment();
      console.log(currentTime)
      
      var convertedFirst = moment(trainFirst, "HH:mm");
      console.log(convertedFirst)
      
      var diffTime = moment().diff(moment(convertedFirst), "minutes");
      console.log(diffTime)

      var tRemainder = diffTime % trainFrequency;
      console.log(tRemainder);

      var minutesAway = trainFrequency - tRemainder;
      console.log(minutesAway);

      var nextTrain = moment().add(minutesAway, "minutes")
      console.log(moment(nextTrain).format("h:mm a"));
      
      if (convertedFirst > currentTime) {
        nextTrain = convertedFirst;
        minutesAway = Math.abs(diffTime);
      };
      
      var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(moment(nextTrain).format("h:mm a")),
        $("<td>").text(minutesAway)
      );

      $("#train-sch-table > tbody").append(newRow);
    });