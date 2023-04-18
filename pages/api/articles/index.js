import Article from "@/models/ArticleModel"
import cloudinary from "@/utils/cloudinary"
import connectMongo from "@/utils/connectMongo"
import uploader from "@/utils/multer"
import nc from "next-connect"

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).end("Something broke!")
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found")
  },
})
  .use(uploader.single("image"))
  .use(async (req, res, next) => {
    await connectMongo()
    next()
  })
  .get(async (req, res) => {
    try {
      const articles = await Article.find()
      res.status(200).json({
        status: "successful",
        data: articles,
      })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  })
  .post(async (req, res) => {
    try {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        null,
        { folder: "Articles" }
      )
      const newArticle = await Article.create({
        title: req.body.title,
        author: req.body.author,
        image: secure_url,
        public_id: public_id,
        description: req.body.description,
      })
      res.status(200).json({
        status: "successful",
        message: "Article successfully created",
        data: newArticle,
      })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error })
    }
  })
  .patch(async (req, res) => {
    try {
      const { articleId } = req.body
      const updatedArticle = await Article.findByIdAndUpdate(
        articleId,
        req.body,
        { new: true }
      )
      res.status(200).json({
        status: "successful",
        message: "Article update",
        data: updatedArticle,
      })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error })
    }
  })

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
