import connectMongo from "@/middlewares/connectMongo"
import nc from "next-connect"
import auth from "@/middlewares/auth"
import Cart from "@/models/CartModel"

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
  .get(async (req, res) => {
    try {
      const carts = await Cart.find({
        user: req.user._id,
      })
      res.status(200).json({
        status: "success",
        data: carts,
      })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  })
  .post(async (req, res) => {
    try {
      const alreadyInCart = await Cart.findOne({
        user: req.user._id,
        product: req.body.productId,
      })
      if (alreadyInCart)
        return res.status(400).json({
          success: false,
          message: "You already this this product in your cart",
        })
      const newCart = await Cart.create({
        user: req.user._id,
        product: req.body.productId,
      })

      res.status(200).json({
        status: "success",
        data: newCart,
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
