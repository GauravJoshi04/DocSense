import multer  from "multer";
import path from "path";


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }

});
 // file filter feature of multer aloows me to only accept pdf files right now 
const fileFilter = (req, file, cb) => {

    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed!"), false);
    }

};
const upload = multer({
    storage: storage,
    fileFilter,
});

export default upload;
