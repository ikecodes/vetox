import Product from "@/models/ProductModel"
import connectMongo from "@/middlewares/connectMongo"
import nc from "next-connect"
import Article from "@/models/ArticleModel"
import Message from "@/models/MessageModel"
import User from "@/models/UserModel"

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
      const productsCountPromise = Product.countDocuments()
      const articlesCountPromise = Article.countDocuments()
      const usersCountPromise = User.countDocuments()
      const messagesCountPromise = Message.countDocuments()

      const [products, articles, users, messages] = await Promise.all([
        productsCountPromise,
        articlesCountPromise,
        usersCountPromise,
        messagesCountPromise,
      ])

      return res.status(200).json({
        status: true,
        data: {
          totalProducts: products,
          totalArticles: articles,
          totalUsers: users,
          totalMessages: messages,
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
