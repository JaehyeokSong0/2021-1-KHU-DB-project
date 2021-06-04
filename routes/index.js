var express = require('express');
var router = express.Router();
var dbConnection = require('../db/connection.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/pharms',function(req,res) {
  var queryString = 'SELECT * from pharm';
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
    var result = {
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
    }))
  });
});

module.exports = router;
