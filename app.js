var config = {
    apiKey: "AIzaSyDE31ayU-089MYRsLQEl8Ym6c90IYGgQo8",
    authDomain: "train-schedule-8012b.firebaseapp.com",
    databaseURL: "https://train-schedule-8012b.firebaseio.com",
    projectId: "train-schedule-8012b",
    storageBucket: "train-schedule-8012b.appspot.com",
    messagingSenderId: "921801277233"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#add-train-btn").on("click", function(event){
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainTime = moment($("#start-input").val().trim(), "HH:mm A").format("X");
  var trainFreq = $("#freq-input").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDest,
    start: trainTime,
    frequency: trainFreq
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#freq-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    
    
    
    //var trainNext = "";
    
  
    // Store everything into a variable.
    var fbName = childSnapshot.val().name;
    var fbDest = childSnapshot.val().destination;
    var fbTime = childSnapshot.val().start;
    var fbFreq = childSnapshot.val().frequency;
    
    var timeDiff = moment().diff(moment.unix(fbTime), "minutes") % fbFreq;
    console.log(timeDiff + " the time difference in minutes");
    var timeAway = fbFreq - timeDiff;
    console.log(timeAway + " the time away");
    var nextArrival = moment().add(timeAway, "m").format("hh:mm A");
    console.log(nextArrival + " the nextArrival");


    

     
    
  
    
    console.log(fbName);
    console.log(fbDest);
    console.log(fbTime);
    console.log(fbFreq);
  

  

    var newRow = $("<tr>").append(
      $("<td>").text(fbName),
      $("<td>").text(fbDest),
      $("<td>").text(fbFreq),
      $("<td>").text(nextArrival),
      $("<td>").text(timeAway)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
