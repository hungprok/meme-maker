var express = require('express');
var router = express.Router();
const upload = require('../utils/upload');
const {loadData,  saveData} = require('../utils/data')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', upload.single('fileUpload'), function(req, res,) {
  console.log(req.file)

if (!req.file){
  res.render('allImages', {error: 'You need to choose a file to upload'})
}

const data = loadData()
data.push(req.file)
saveData(data)

  res.render('allImages', {data})
})

router.get('/browse', upload.single('fileUpload'), function(req, res,) {
  const data = loadData()
  
    res.render('allImages', {data})})
module.exports = router;

//