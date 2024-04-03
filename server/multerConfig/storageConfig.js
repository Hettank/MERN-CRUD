import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },

    filename: function (req, file, cb) {
        const fileName = `image-${Date.now()}.${file.originalname}`
        cb(null, fileName)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true)
    } else {
        cb(null, false)
        return cb(new Error("only .png .jpg .jpeg files are allowed"))
    }
}

const upload = multer({ storage })

export default upload