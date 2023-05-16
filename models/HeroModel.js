import { Schema, model, models } from "mongoose"

const heroSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "An hero must have a title"],
    },
    image: {
      type: "String",
      required: [true, "An hero must have a image"],
    },
    public_id: {
      type: "String",
      required: [true, "A hero image must have a public id"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Hero must have a description"],
    },
  },
  { timestamps: true }
)

const Hero = models.Hero || model("Hero", heroSchema)

export default Hero
