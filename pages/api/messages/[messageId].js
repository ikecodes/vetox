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
    const { messageId } = req.query
    try {
      const message = await Message.findById(messageId)
      res.status(200).json({
        status: "successful",
        data: message,
      })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  })
  .delete(async (req, res) => {
    const { messageId } = req.query
    console.log("MESSAGE ID", messageId)
    try {
      await Message.findByIdAndDelete(messageId)
      // res.status(204)
      res.status(200).json({
        status: "successful",
        message: "Message deleted",
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
