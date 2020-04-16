const multer = require('multer');
const path = require('path');
const pathToUpload = path.join(__dirname, '../public/uploads')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pathToUpload)
  },
  filename: function (req, file, cb) {
    const allows = ['image/png', 'image/jpg', 'image/jpeg']
    if (!allows.includes(file.mimetype)) {
      const error = new Error('File type is not supported')
      cb(error, undefined)
    }
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

module.exports = upload;