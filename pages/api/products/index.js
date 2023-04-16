import Product from "@/models/ProductModel"
import cloudinary from "@/utils/cloudinary"
import connectMongo from "@/utils/connectMongo"
import uploader, { upload } from "@/utils/multer"
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
  .use(upload.single("photo"))
  .get((req, res) => {
    res.send("Hello world")
  })
  .post(async (req, res) => {
    try {
      console.log(req.body)
      console.log("REDDD", req.file)
      // const fileStr = req.body.photo
      // const { secure_url, public_id } = await cloudinary.uploader.upload(
      //   req.file.path,
      //   {
      //     upload_preset: "product_images",
      //   }
      // )
      // await cloudinary.uploader.destroy(user.cloudinary_id);
      const newProduct = await Product.create({
        name: req.body.name,
        category: req.body.category,
        photo: secure_url,
        public_id: public_id,
        price: req.body.price,
        description: req.body.description,
      })
      res.status(200).json({
        status: "successfull",
        message: "Product successfully create",
        data: newProduct,
      })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error })
    }
  })
  .put(async (req, res) => {
    res.end("async/await is also supported!")
  })
  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.")
  })

export default handler
// export default async function products(req, res) {
//   const { method } = req

//   await connectMongo()

//   switch (method) {
//     case "GET":
//       try {
//         const products = await Product.find()
//         res.status(200).json({
//           status: "successfull",
//           data: products,
//         })
//       } catch (error) {
//         res.status(400).json({ success: false })
//       }
//       break
//     case "POST":
//       // uploader.single("photo")
//       // console.log("HITTING", req.body)
//       try {
//         // const fileStr = req.body.photo
//         const { secure_url, public_id } = await cloudinary.uploader.upload(
//           req.file.path,
//           {
//             upload_preset: "product_images",
//           }
//         )
//         // await cloudinary.uploader.destroy(user.cloudinary_id);
//         const newProduct = await Product.create({
//           name: req.body.name,
//           category: req.body.category,
//           photo: secure_url,
//           public_id: public_id,
//           price: req.body.price,
//           description: req.body.description,
//         })
//         res.status(200).json({
//           status: "successfull",
//           message: "Product successfully create",
//           data: newProduct,
//         })
//       } catch (error) {
//         console.log(error)
//         res.status(400).json({ success: false, error })
//       }
//       break
//     default:
//       res.status(400).json({ success: false })
//       break
//   }
// }
