var express = require('express');
var router = express.Router({mergeParams: true});
var db = require('../db/query');
var dbConnection = require('../db/connection');
const { rawListeners } = require('../db/connection');

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

// TEST CODE START
router.get('/',function(req,res) {
  db.getPharmsInfo((rows) => {
    res.render('index', {rows:rows});
  });
});

router.post('/pharms/',function(req,res) {
  var time = req.body.time;
  var day = time.substr(0,3);
  var querytime = time.substr(3,time.length-3);
  var queryday = "time_" + day; // ex) time_mon
  console.log(querytime," , ",queryday);
  var queryString = 'SELECT * FROM pharm_time WHERE ? >= SUBSTRING_INDEX(?,"~",1) and ? <= SUBSTRING_INDEX(?,"~",2)';  
  dbConnection.query(queryString, [querytime,queryday,querytime,queryday], (error,rows) => {
    if(error) throw error;
    res.send(rows);
    //res.render('index', {rows:rows});
  });
});
//TEST CODE END

module.exports = router;
