var friends = require("../app/data/friends.js");

var name = 0;
var photo = 0;

var returnMatch = function() {
  return [name, photo];
};

module.exports = function(app) {
  
    app.get("/api/friends", function(req, res) {
      res.json(friends);
    });
  
    app.post("/api/friends", function(req, res) {
      //Post the new friend JSON from req, to the friends.js file
      friends.push(req.body);

      console.log(req.body.scores);

      var newFriend = 0;
      //Get the scores total for the new friend
      for (var i = 0; i < 10; i++) {
        newFriend += parseInt(req.body.scores[i]);
      };

      console.log(newFriend);

      var totalDifference = [];
      var friendsArrayLength = friends.length - 1;

      for (var j = 0; j < friendsArrayLength; j++) {   
      //Get the abs difference for each individual score between the new friend and all existing friends, then add each one up
      var inDiff = 0;

      for (var i = 0; i < 10; i++) {
        //Get the abs difference for each individual score between the new friend and friend[j] and add them up in 'inDiff'
        inDiff += (Math.abs(req.body.scores[i] - friends[j].scores[i]))
      };
      //Add each difference total (inDiff) for each existing friend to the totalDifference array
      totalDifference.push(inDiff);

      };

      console.log(totalDifference);
      //Find the lowest number in the totalDifference array to find the match
      var match = Math.min.apply(Math, totalDifference);
      console.log(match);
      //Find the index of the match
      var matchIndex = totalDifference.indexOf(match);

      name = friends[matchIndex].name;
      photo = friends[matchIndex].photo;
  
    });
};