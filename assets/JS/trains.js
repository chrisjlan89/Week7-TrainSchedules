var config = {
    apiKey: "AIzaSyDr6e6hAWwT-GO-5-OK6Ftyfz3UDgc2pzw",
    authDomain: "trainschedulecjl89.firebaseapp.com",
    databaseURL: "https://trainschedulecjl89.firebaseio.com",
    projectId: "trainschedulecjl89",
    storageBucket: "trainschedulecjl89.appspot.com",
    messagingSenderId: "27517096965"
  };
  firebase.initializeApp(config);


  var myDataBase = firebase.database();

  $("#submit").on('click' , function(event){
  	event.preventDefault();
  	var trainName = $("#trainName").val().trim();
  	var destination = $("#destination").val().trim();
  	var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();
   
    

  myDataBase.ref().push({
      trainName : trainName,
      destination : destination, 
      firstTrain : firstTrain,
      frequency : frequency,
      


  });
  trainName = $("#trainName").val("")
 destination = $("#destination").val("")
 firstTrain = $("#firstTrain").val("")
 frequency = $("#frequency").val("")




   });

  myDataBase.ref().on("child_added" , function(childSnapshot) {
      var trainName = childSnapshot.val().trainName
      var destination = childSnapshot.val().destination
      var firstTrain = childSnapshot.val().firstTrain
      var frequency = childSnapshot.val().frequency

     var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
  

    

    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  //  console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequency;
   // console.log(tRemainder);


  var minutesAway = frequency - tRemainder;
   // console.log("MINUTES TILL TRAIN: " + minutesAway);

   var nextArrival = moment().add(minutesAway, "minutes");
   nextArrival = moment(nextArrival).format("hh:mm")
   console.log( "next arrive : " + nextArrival)

      

    var newTableRow = $("<tr class = 'table-secondary'>");

    var newTrainName = $("<td>");
    newTrainName.html(trainName);
    newTableRow.append(newTrainName);


    var newDest = $("<td>");
    newDest.html(destination);
    newTableRow.append(newDest); 


  /*  var newFirstTrain = $("<td>");
    newFirstTrain.html(firstTrain);
    newTableRow.append(newFirstTrain); */

   var newFreq = $("<td>");
    newFreq.html(frequency + " minute(s) ");
    newTableRow.append(newFreq);

    var newNextArrival = $("<td>");
    newNextArrival.html(nextArrival);
    newTableRow.append(newNextArrival); 

    var newMinutesAway = $("<td>");
    newMinutesAway.html(minutesAway + " minute(s) ");
    newTableRow.append(newMinutesAway)

   $("tbody").append(newTableRow);
});