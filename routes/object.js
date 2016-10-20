var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var username = process.env.MONGODB_USER
var password = process.env.MONGODB_PASSWORD


mongoose.connect('mongodb://' + username + ':' + password + '@ds063186.mlab.com:63186/heroku_kr7vh701')

var Score = mongoose.model('keyvaluepair', {
  key: String,
  values: [{
            value : String,
            timestamp : String
          }]
})
router.get('/', function(req, res, next) {
  res.render('object')
})

// 1. Receive key value JSON and store in mlabs
router.post('/', function(req, res, next) {
  var reqBody = req.body
  var reqVal

  Object.keys(reqBody).map(function(k) {
    reqVal = reqBody[k]
  })

  console.log(reqVal)

  Object.keys(reqBody).forEach(function(mykey) {
    console.log(mykey)

    // Check if key is in NOT DB. Save it
    Score.find({key: mykey }, function(err, e){
      if (e === undefined || e.length == 0) {
        console.log('Not in DB')
        Object.keys(reqBody).map(function(myval) {
          var newEntry = new Score({
            key:mykey,
            values: [{
              value: myval,
              timestamp: Math.floor(new Date() / 1000)
            }]
          })
          newEntry.save(function (err) {
            if (err) {
                return err;
              }
              else {
                 console.log("Entry saved");
               }
          })
        })

      }
      // Key in DB, Add to existing key
      else {
        console.log('In DB!')
        Score.find({key: mykey }, function(err, e){
          console.log(e)
          e[0].values.push({
            value: reqVal,
            timestamp: Math.floor(new Date() / 1000)
          })
          e[0].values.forEach(function(allin){
            console.log(allin)
          })
        })

      }
    })
  });

})

// 2. Key Retrieval
router.get('/:id', function(req, res) {

    if (req.originalUrl.includes("?")) {
      console.log(req.query.timestamp)
      Score.find({key: req.params.id}, function(err, e){
        console.log(e[0].values[0].timestamp)

        if(e[0].values[0].timestamp === req.query.timestamp){
          console.log('hurray@')
        }
      })

    }
    // Return by latest timestamp
    else {
      Score.find({key: req.params.id}, function(err, e){
        console.log(e[0].values[0].timestamp)

        if(e[0].values[0].timestamp === req.query.timestamp){
          console.log('hurray@')
        }
      })
    }



});

module.exports = router;
