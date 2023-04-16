import { Schema, model, models } from "mongoose"

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "An article must have a title"],
      unique: true,
    },
    author: {
      type: String,
      required: [true, "An article must have a author"],
    },
    preview: {
      type: "String",
      required: [true, "An article must have a preview"],
    },
    image: {
      type: "String",
      required: [true, "An article must have a image"],
    },
    public_id: {
      type: "String",
      required: [true, "A product must have a public id"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "A tour must have a description"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Article = models.Article || model("Article", articleSchema)

export default Article
