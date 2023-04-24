import Article from "@/models/ArticleModel"
import cloudinary from "@/utils/cloudinary"
import connectMongo from "@/middlewares/connectMongo"
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
  .use(async (req, res, next) => {
    await connectMongo()
    next()
  })
  .get(async (req, res) => {
    try {
      const articles = await Article.find({ isFeatured: true }).limit(3)
      res.status(200).json({
        status: "successful",
        data: articles,
      })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  })

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
