var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
// var username = "lanbau";
// var password = "1spitfire3";
//
// mongoose.createConnection('mongodb://' + username + ':' + password + '@ds061506.mlab.com:61506/vaultdragon')
//
// var Score = mongoose.model('keyvaluepair', {
//   key: String,
//   value: [String],
//   timestamp: [String]
//
// })

/* GET home page. */
router.get('/', function(req, res, next) {
    // Score.findOne({key: 'monkey1'}, function(err, e){
    //   console.log(e)
    // })
    // Score.close()

//   var silence = new Score({
//     key:"monkey1",
//     value:"black",
//     timestamp: "1234567"
//   })
//   console.log(silence.value);
//   silence.save(function (err) {
//   if (err) {
// 		return err;
//   }
//   else {
//   	console.log("Post saved");
//   }
//   // Score.find(function(err, keyvaluepair){
//   //   console.log(keyvaluepair);
//   // })
//
// })
  res.send('hello');
});

module.exports = router;
