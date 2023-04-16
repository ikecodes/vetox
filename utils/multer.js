import multer from "multer"
import path from "path"

// Multer config
const uploader = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    // let ext = path.extname(file.originalname)
    // if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    //   cb(
    //     {
    //       message: "Unsupported file format",
    //     },
    //     false
    //   )
    //   return
    // }
    cb(null, true)
  },
})

const limits = {
  fileSize: 3221225472,
}
const storage = multer.memoryStorage()
export const upload = multer({
  storage,
  limits: limits,
})

export default uploader
