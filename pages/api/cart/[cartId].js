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
  .delete(async (req, res) => {
    const { cartId } = req.query
    try {
      await Cart.findByIdAndDelete(cartId)
      res.status(200).json({
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
