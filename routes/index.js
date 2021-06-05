var express = require('express');
var router = express.Router();
var db = require('../db/query');

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

router.get('/pharms_time',function(req,res) {
  var queryString = 'SELECT * from pharm_time';
  dbConnection.query(queryString, (error,rows) => {
    if(error) throw error;
    res.send(rows);
  });
});

router.get('/pharms/:tel',function(req,res) {
  var tel = req.params.tel;
  var queryString = 'SELECT * FROM pharm WHERE tel=?';
  dbConnection.query(queryString, [tel], (error,rows) => {
    if(error) throw error;
    /*var result = {
      "name" : name,
      "tel" : tel,
      "addr_street" : addr_street,
      "addr_lot" : addr_lot,
      "time_mon" : time_mon,
      "time_tue" : time_tue,
      "time_wed" : time_wed,
      "time_thu" : time_thu,
      "time_fri" : time_fri,
      "time_sat" : time_sat,
      "time_sun" : time_sun,
      "time_hol" : time_hol,
    }
    res.send(ejs.render(data, {
      data:result
    }))*/
    res.send(rows);
  });
});
//TEST CODE END

module.exports = router;
