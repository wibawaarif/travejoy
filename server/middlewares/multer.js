const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage')
const { signInWithEmailAndPassword, getAuth } = require("firebase/auth");
const auth = require('../config/firebase.config')

// import uuid from "uuid/v4";

const storageMultiple = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = 'public/images';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const uploadMultiple = multer({
  storage: storageMultiple,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).array("image", 12);


// Set storage engine
const storage = multer.diskStorage({
  destination: "public/images",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1000000 },
  fileFilter: async function (req, file, cb) {
  checkFileType(file, cb);
  const storageFB = getStorage();
  try {
    const { user } = await signInWithEmailAndPassword(getAuth(), process.env.FIREBASE_USER, process.env.FIREBASE_AUTH)
    console.log('middleware', req.files)
    const dateTime = Date.now();
    const fileName = `images/${req.file.originalname + "      " + dateTime}`
    const storageRef = ref(storageFB, fileName)
    const metadata = {
        contentType: req.file.mimetype,
    }
    await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    req.file.originalname = fileName
  } catch (error) {
    console.log(error)
  }
  }
}).single("image");

// // Check file Type
function checkFileType(file, cb) {

  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: Images Only !!!");
  }
}

module.exports = { uploadMultiple, upload };