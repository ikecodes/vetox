import { Schema, model, models } from "mongoose"
import validator from "validator"

const messageSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please tell us your fullName!"],
    },
    message: {
      type: String,
      required: [true, "Please provide your message"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
  },

  { timestamps: true }
)

const Message = models.Message || model("Message", messageSchema)

export default Message
