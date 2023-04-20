import User from "@/models/UserModel"
import connectMongo from "@/middlewares/connectMongo"
import createAndSendToken from "@/utils/createAndSendToken"
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
      const { email, password } = req.body
      if (!email || !password)
        return res.status(400).json({
          status: false,
          message: "Please provide your email and password",
        })
      const user = await User.findOne({ email }).select("+password")
      if (!user || !(await user.correctPassword(password, user.password)))
        return res.status(401).json({
          status: false,
          message: "Incorrect email and password",
        })
      createAndSendToken(user, 200, res)
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
