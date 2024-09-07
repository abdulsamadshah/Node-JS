const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save images in the 'uploads/' directory
    },
    filename: function (req, file, cb) {
        // Use timestamp and original extension for filename
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter to allow only image files
const fileFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// Initialize multer with storage and fileFilter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limit files to 5MB
    }
});

module.exports = upload;
