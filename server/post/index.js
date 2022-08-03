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

app.put('/album/:name/:artist/:note/:summary/:spotifyCode/:genre', function(req,res){
    const name = req.params.name
    const artist = req.params.artist
    const note = req.params.note
    const summary = req.params.summary
    const spotifyCode = req.params.spotifyCode
    const genre = req.params.genre
    const summaryRegex = summary.replace(/'/g, "`")
    console.log(summary)

    sql.connect(sqlConfig,(err)=>{
        if (err) throw err;
      
        sql.query(`
        INSERT INTO record (record_note_perso, record_summary, record_spotify_link, record_name,record_artist, record_genre) VALUES ('${note}','${summaryRegex}','${spotifyCode}','${name}','${artist}','${genre}')
        `, function (err, result, fields) {
        
        if (err) throw err;
      
        res.status(200).json(result)
      });
    });
})

app.listen(8050,function(){
    console.log('server started at 8050');
  })