var express = require('express');
var router = express.Router();
const upload = require('../utils/upload');
const { loadData, saveData, loadMeme, saveMeme } = require('../utils/data');
// const modal = require('modal');
const jimp = require('jimp');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var index = express();
index.use(express.json());
index.use(express.urlencoded({ extended: false }));

onclick = function () {
  // modal.style.display = "block";
  console.log('Modal clicked')
}



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', upload.single('fileUpload'), async (req, res, ) => {

  if (!req.file) {
    res.render('index', { error: 'You need to choose a file to upload' });
    return;
  }
  const image = await jimp.read('public/uploads/' + req.file.originalname);
  image.resize(jimp.AUTO, 300, jimp.RESIZE_BEZIER);
  const newfilename = 'resize-' + req.file.originalname;
  image.write('public/uploads/' + newfilename);

  const data = loadData();

  var latestid;
  if (data.length == 0) {
    latestid = 1
  } else { latestid = data[data.length - 1].ID + 1 }

  const newData = req.file;
  newData['newname'] = newfilename;
  newData['ID'] = latestid;
  console.log(req.file.originalname)
  data.push(newData)
  saveData(data)
  res.render('allImages', { data })
})

router.get('/browse', upload.single('fileUpload'), function (req, res, ) {

  const data = loadData()

  res.render('allImages', { data })
})

router.get('/meme', function (req, res, ) {
  const data = loadMeme();
  console.log('this is from meme tab', data);

  console.log(data);
  res.render('meme', { data })
})

router.get('/view', async (req, res, ) => {
  console.log(req)
  console.log(req.query.imageInfo)

  const filename = req.query.imageInfo;
  onclick();
  console.log(filename);
  res.render('image', { filename })

})

router.post('/preview', urlencodedParser, async (req, res) => {
  console.log(req.body)
  console.log(req.body.top, req.body.bottom, req.body.imageInfo)
  const filename = req.body.imageInfo;
  const image = await jimp.read('public/uploads/' + filename);
  const font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE);
  // image.print(font, 0, 10, req.body.top);
  // image.print(font, 0, 210, req.body.bottom);

  var w = image.bitmap.width;
  var h = image.bitmap.height;
  console.log(w,h)
  let text = "example"
  var textWidth = jimp.measureText(font, text);
  var textHeight = jimp.measureTextHeight(font, text);
  image.print(
    font, w/2 - textWidth/2, 0 - textHeight/2,
        {   
        text: req.body.top,
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,                                      
        }, textWidth, textHeight
  );

  image.print(
    font, w/2 - textWidth/2, h - h/6 - textHeight/2,
        {   
        text: req.body.bottom,
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,                                      
        }, textWidth, textHeight
  );

  const newfilename = 'jimp-' + Date.now() + '-' + filename;
  image.write('public/uploads/' + newfilename);

  const data = loadMeme()
  data.push({ newfilename })
  saveMeme(data)

  res.render('preview', { newfilename })
})
module.exports = router;