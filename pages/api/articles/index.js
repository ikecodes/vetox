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
  .use(uploader.single("image"))
  .use(async (req, res, next) => {
    await connectMongo()
    next()
  })
  .get(async (req, res) => {
     const { pageSize, page, ...rest } = req.query
     let filter = {}
     let sort = { createdAt: 1 }

     const pageNumber = page || 1
     const limit = parseInt(pageSize)
     const skip = (pageNumber - 1) * limit
     try {
       const articles = await Article.find(filter)
         .skip(skip)
         .limit(limit)
         .sort(sort)

       const count = await Article.countDocuments()
       const totalPage = Math.ceil(count / pageSize || 1)
       const hasNextPage = pageNumber < totalPage
       const hasPrevPage = pageNumber > 1

       res.status(200).json({
         status: "successful",
         data: {
           articles,
           totalPage,
           hasNextPage,
           hasPrevPage,
         },
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
