const router = require("express").Router();
const fileController = require("../controllers/file");
const multer = require("multer");
const path = require("path");
const isAuth = require("../middleware/auth");
const date = new Date().getTime();

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    const originalName = path.parse(file.originalname).name;
    const extension = path.extname(file.originalname);
    const finalFilename = `${originalName}_${date}${extension}`;
    cb(null, finalFilename);
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  isAuth,
  upload.single("file"),
  fileController.uplaodFile
);

router.get("/", isAuth, fileController.allFiles);

module.exports = router;
