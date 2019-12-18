const multer = require('multer');
const path = require('path');

// Khoi tao bien cau hinh cho viec luu tru file upload
const storage = multer.diskStorage({
    destination: (req, file, calllback) => {
        // Dinh nghia noi file upload se duoc luu lai
        calllback(null, './uploads/students/');
    },
    filename: (req, file, callback) => {
        // Them nhan thoi gian de dam bao ten file khong bi trung
        callback(null, file.originalname + '-' + Date.now());
        // Mac dinh luu file la ten goc
    }
});

const fileFilter = (req, file, callback) => {
    const extension = path.extname(file.originalname);
    if (extension === '.xlsx')
        callback(null, true);
    else callback(new Error('Only .xlsx files are accepted'), false);
};

// Luu tren local cua server khi dung multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1024 * 8
    },
    fileFilter: fileFilter
});

module.exports = {
    upload
};
