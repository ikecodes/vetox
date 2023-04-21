import Review from "@/models/ReviewModel"
import connectMongo from "@/middlewares/connectMongo"
import nc from "next-connect"
import auth from "@/middlewares/auth"

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
  .use(auth)
  .post(async (req, res) => {
    try {
      const alreadyReviewed = await Review.findOne({
        user: req.user._id,
        product: req.body.productId,
      })
      if (alreadyReviewed)
        return res.status(400).json({
          success: false,
          message: "You already review this product",
        })
      const newReview = await Review.create({
        title: req.body.title,
        message: req.body.message,
        rating: req.body.rating,
        user: req.user._id,
        product: req.body.productId,
      })

      res.status(200).json({
        status: "success",
        data: newReview,
      })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error })
    }
  })

export default handler

export const config = {
  api: {
    bodyParser: true,
  },
}
