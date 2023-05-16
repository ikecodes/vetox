import cloudinary from "@/utils/cloudinary"
import connectMongo from "@/middlewares/connectMongo"
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
  .use(async (req, res, next) => {
    await connectMongo()
    next()
  })
  .get(async (req, res) => {
    const { heroId } = req.query
    try {
      const hero = await Hero.findById(heroId)
      res.status(200).json({
        status: "successful",
        data: hero,
      })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  })
  .delete(async (req, res) => {
    const { heroId } = req.query
    try {
      const heroNumber = await Hero.countDocuments()
      if (heroNumber === 1)
        return res
          .status(400)
          .json({
            success: false,
            message:
              "You must have atleast one hero, add a new one if you want to delete this one",
          })

      const hero = await Hero.findById(heroId)
      await cloudinary.uploader.destroy(hero.public_id, null, {
        folder: "Heros",
      })
      await Hero.findByIdAndDelete(heroId)
      res.status(204).json({
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
