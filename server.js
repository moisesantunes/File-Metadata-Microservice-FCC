'use strict';

var express = require('express');
var cors = require('cors');
var multer  = require('multer')
// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // error first callback
        cb(null, 'public/');
    },
    filename: function (req, file, cb) {

        // error first callback
        cb(null, file.originalname)
    }
});
const upload = multer({ storage });


app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse',upload.single('upfile'), (req, res, next) => {
res.json({name:req.file.originalname, type: req.file.mimetype, size: req.file.size})

  console.log(req.file)
  
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
