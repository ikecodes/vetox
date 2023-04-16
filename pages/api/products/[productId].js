import Product from "@/models/ProductModel"
import connectMongo from "@/utils/connectMongo"

export default async function products(req, res) {
  const { method } = req
  const { productId } = req.query

  console.log("///PRODUCT", productId)
  res.send("SUCCESS")
  await connectMongo()

  switch (method) {
    case "GET":
      try {
        const product = await Product.findOne({ _id: req.params.id })
        if (!product) {
          return next(new AppError("No product found with that ID", 404))
        }
        res.status(200).json({
          status: "successfull",
          message: "Product successfully create",
          data: product,
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case "DELETE":
      try {
        const product = await Product.deleteOne({ _id: req.params.id })
        if (!product) {
          return next(new AppError("No document found with that ID", 404))
        }
        res.status(204).json({
          status: "successfull",
          message: "Product successfully deleted",
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
