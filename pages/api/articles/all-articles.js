import connectMongo from "@/middlewares/connectMongo"
import nc from "next-connect"
import Article from "@/models/ArticleModel"

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

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
