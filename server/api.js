const express = require('express')
const router = express.Router()
router.get('/prefecture', (req, res, next) => {
  const mysql = require('mysql');
  const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database: 'mydb',
    password: 'Nagachan0226DB_'
  });
  var ret=[];
  connection.connect();
  connection.query('select * from prefecture;', function(error, row, fields){
    if (error) {
      console.log(error);
    }
    var dat = [];
    for (var i = 0;i < row.length; i++) {
      dat.push({id: row[i].id, name: row[i].name});
    }
    ret = JSON.stringify(dat);
    // console.log(ret);
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(ret)
  });
  connection.end();
})
module.exports = router
