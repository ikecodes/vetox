import Product from "@/models/ProductModel"
import cloudinary from "@/utils/cloudinary"
import connectMongo from "@/middlewares/connectMongo"
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
    const { productId } = req.query
    try {
      const product = await Product.findById(productId)
      res.status(200).json({
        status: "successful",
        data: product,
      })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  })
  .delete(async (req, res) => {
    const { productId } = req.query
    try {
      const product = await Product.findById(productId)
      const deletePromises = product.images.map(async (image) => {
        await cloudinary.uploader.destroy(image.publicId, null, {
          folder: "Products",
        })
      })
      await Promise.all(deletePromises)
      await Product.findByIdAndDelete(productId)
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
