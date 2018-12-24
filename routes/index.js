var express = require("express");
var router = express.Router();
var path = require("path");

var multer = require("multer");
var storage = multer.diskStorage({
  // destination
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });

// specify the folder
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// headers and content type
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.post("/uploads", upload.array("uploads[]", 12), function(
  req,
  res,
  next
) {
  console.log("files", req.files);
  res.send(req.files);
});

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
