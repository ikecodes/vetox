import Article from "@/models/ArticleModel"
import cloudinary from "@/utils/cloudinary"
import connectMongo from "@/utils/connectMongo"
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
    const { articleId } = req.query
    try {
      const article = await Article.findById(articleId)
      res.status(200).json({
        status: "successful",
        data: article,
      })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  })
  .delete(async (req, res) => {
    const { articleId } = req.query
    try {
      const article = await Article.findById(articleId)
      await cloudinary.uploader.destroy(article.public_id, null, {
        folder: "Articles",
      })
      await Article.findByIdAndDelete(articleId)
      res.status(204).json({
        status: "success",
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
