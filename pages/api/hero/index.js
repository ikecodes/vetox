import cloudinary from "@/utils/cloudinary"
import connectMongo from "@/middlewares/connectMongo"
import uploader from "@/utils/multer"
import nc from "next-connect"
import Hero from "@/models/HeroModel"

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
    try {
      const heros = await Hero.find()
      res.status(200).json({
        status: "successful",
        data: heros,
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
        { folder: "Heros" }
      )
      const newHero = await Hero.create({
        title: req.body.title,
        image: secure_url,
        public_id: public_id,
        description: req.body.description,
      })
      res.status(200).json({
        status: "successful",
        message: "Hero successfully created",
        data: newHero,
      })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error })
    }
  })
  .patch(async (req, res) => {
    try {
      const { heroId } = req.body
      const updatedHero = await Hero.findByIdAndUpdate(heroId, req.body, {
        new: true,
      })
      res.status(200).json({
        status: "successful",
        message: "Hero update",
        data: updatedHero,
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
