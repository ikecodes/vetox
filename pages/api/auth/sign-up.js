import User from "@/models/UserModel"
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
  .post(async (req, res) => {
    try {
      const existingUserWithEmail = await User.findOne({
        email: req.body.email,
      })

      if (existingUserWithEmail)
        return res.status(400).json({
          status: false,
          message: "User with this email already exists",
        })

      const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      })
      res.status(200).json({
        status: "success",
        data: newUser,
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
