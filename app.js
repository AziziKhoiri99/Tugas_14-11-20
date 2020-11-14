const express = require('express');
const mysql = require('mysql');
const hbs =  require('hbs');
const bodyParser = require('body-parser');

const app = express();
const port = 9900;

app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


var koneksi =  mysql.createConnection({
   host: 'localhost',
   user: 'Azizi',
   password: '1945',
   database: 'BUSINESS'
});

koneksi.connect((err) => {
   if(err) throw err;
   console.log("Koneksi Database Berhasil Terkoneksi");
});

app.get('/data', (req, res) => {
    res.render(__dirname + '/views/data.hbs')
 })

app.get('/', (req, res) => {
    res.render(__dirname + '/views/login.hbs')
 })

//LOGIN===================================================>
app.get('/', (req, res) => {
   koneksi.query('SELECT * FROM USER', (err, hasil) => {
    if(err) throw err;
    res.render('login.hbs', {
        judulhalaman: 'LOGIN HERE !!!',
        data: hasil
      });
   });
});

app.post('/', (req, res) => {
  var USERNAME = req.body.inputusername;
  var EMAIL_ADDRESS = req.body.inputemail;
  var PASSWORD = req.body.inpupassword;
   koneksi.query('INSERT INTO USER( USERNAME, EMAIL_ADDRESS, PASSWORD ) VALUES( ?, ?, ? )',
        [  USERNAME, EMAIL_ADDRESS, PASSWORD  ],
            (err, hasil) => {
                if(err) throw err;
                res.redirect('/');
                }
          )
});

//DATA===================================================>
app.get('/data', (req, res) => {
   koneksi.query('SELECT * FROM SCIENCE', (err, hasil) => {
    if(err) throw err;
    res.render('data.hbs', {
        judulhalaman: 'Data Bantuan UMKM Dari Pemerintah Bagi Yang Membutuhkan',
        data: hasil
      });
   });
});

app.post('/data', (req, res) => {
   var NOKK = req.body.inputnokk;
   var NOKTP = req.body.inputnoktp;
   var NAMAKEPALA = req.body.inputnama;
   var ALAMAT = req.body.inputalamat;
   var DAERAH = req.body.inputdaerah;
   var JUMLAHBANTUAN = req.body.inputjumlah;
   koneksi.query('INSERT INTO SCIENCE( NO_KK, NO_KTP, NAMA_KEPALA, ALAMAT, DAERAH, JUMLAH_BANTUAN ) VALUES( ?, ?, ?, ?, ?, ? )',
         [  NOKK, NOKTP, NAMAKEPALA, ALAMAT, DAERAH, JUMLAHBANTUAN],
             (err, hasil) => {
                 if(err) throw err;
                 res.redirect('/data');
                 }
           )
 });

app.get('/hapus-barang/:NOKK', (req, res) => {
  var NOKK = req.params.NOKK;
  koneksi.query("DELETE FROM PEMBAYARAN WHERE NO_KK=?", 
         [ NOKK ], (err, hasil) => {
            if(err) throw err;
            res.redirect('/data');
      }
  );
});
  
app.listen(port, () => {
    console.log(`App berjalan pada port ${port}`);
})