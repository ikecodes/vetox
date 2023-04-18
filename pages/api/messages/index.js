import Message from "@/models/MessageModel"
import connectMongo from "@/utils/connectMongo"
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
    try {
      const messages = await Message.find()
      res.status(200).json({
        status: "successful",
        data: messages,
      })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  })
  .post(async (req, res) => {
    try {
      const newMessage = await Message.create({
        fullName: req.body.fullName,
        email: req.body.email,
        message: req.body.message,
      })
      res.status(200).json({
        status: "successful",
        message: "Message successfully sent",
        data: newMessage,
      })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error })
    }
  })
  .patch(async (req, res) => {
    // No patch for messages
  })

export default handler

export const config = {
  api: {
    bodyParser: true,
  },
}
