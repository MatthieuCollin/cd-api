const sql = require('mssql');
require('msnodesqlv8');
var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors())

const sqlConfig ={
    user:'Mog',
    password:'23b68a2f',
    database: 'CD',
    server: 'DESKTOP-T4EV6H2',
    driver: 'msnodesqlv8',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      trustedConnection: true,
      encrypt: true,
      trustServerCertificate: true,
    }
}

app.get('/lines', function (req,res){
    sql.connect(sqlConfig,(err)=>{
    if (err) throw err;
  
    sql.query("SELECT * FROM record", function (err, result, fields) {
    
    if (err) throw err;
  
    res.status(200).json(result)
  });
});
})


app.get('/record/:id', function (req,res){
  const id = req.params.id

    sql.connect(sqlConfig,(err)=>{
    if (err) throw err;

    sql.query(`SELECT * FROM record WHERE record_id = '${id}'`, function (err, result, fields) {

    if (err) throw err;

    res.status(200).json(result)
    });
  });
})

app.listen(8080,function(){
    console.log('server started at 8080');
  })