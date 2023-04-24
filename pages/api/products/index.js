import Product from "@/models/ProductModel"
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
  .use(uploader.array("images"))
  .use(async (req, res, next) => {
    await connectMongo()
    next()
  })
  .get(async (req, res) => {
    const { pageSize, page, ...rest } = req.query
    let filter = {}
    let sort = { createdAt: 1 }

    if (rest.categorySlug) {
      filter = { ...filter, categorySlug: rest.categorySlug }
    }
    if (rest.subCategorySlug) {
      filter = { ...filter, subCategorySlug: rest.subCategorySlug }
    }

    const pageNumber = page || 1
    const limit = parseInt(pageSize)
    const skip = (pageNumber - 1) * limit
    try {
      const products = await Product.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)

      const count = await Product.countDocuments()
      const totalPage = Math.ceil(count / pageSize || 1)
      const hasNextPage = pageNumber < totalPage
      const hasPrevPage = pageNumber > 1

      res.status(200).json({
        status: "successful",
        data: {
          products,
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
      const imagesPromises = req.files.map(async (file) => {
        const { secure_url, public_id } = await cloudinary.uploader.upload(
          file.path,
          null,
          { folder: "Products" }
        )
        return {
          original: secure_url,
          thumbnail: secure_url,
          publicId: public_id,
        }
      })

      const images = await Promise.all(imagesPromises)
      const newProduct = await Product.create({
        name: req.body.name,
        category: req.body.category,
        subCategory: req.body.subCategory,
        images: images,
        price: req.body.price,
        description: req.body.description,
      })
      res.status(200).json({
        status: "successful",
        message: "Product successfully create",
        data: newProduct,
      })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error })
    }
  })
  .patch(async (req, res) => {
    try {
      const { productId } = req.body
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        req.body,
        { new: true }
      )
      res.status(200).json({
        status: "successful",
        message: "Product update",
        data: updatedProduct,
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
