var express = require('express');
var router = express.Router({mergeParams: true});
var db = require('../db/query');
var dbConnection = require('../db/connection');
var mysql = require('mysql');

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
  var querytime = time.substr(3,time.length-6).replace(":","");
  var queryday = "time_" + day; // ex) time_mon
  var queryString = `SELECT * FROM pharm_time WHERE ? BETWEEN SUBSTRING_INDEX(${queryday},"~",1) and SUBSTRING_INDEX(${queryday},"~",-1)`;  
  queryString = mysql.format(queryString, [querytime]);
  dbConnection.query(queryString, (error,rows) => {
    if(error) throw error;
    res.render('index_result',{rows:rows,day:day});
  });
});

router.post('/detail/',function(req,res) {
  var tel = req.body.tel;
  var queryString = `SELECT * FROM pharm_info WHERE tel = ?`;  
  queryString = mysql.format(queryString, [tel]);
  dbConnection.query(queryString, (error,rows) => {
    if(error) throw error;
    res.render('index',{rows:rows});
  });
});
//TEST CODE END

module.exports = router;
