import { Schema, model, models } from "mongoose"
import slugify from "slugify"

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "An article must have a title"],
    },
    titleSlug: String,
    author: {
      type: String,
      required: [true, "An article must have a author"],
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

articleSchema.pre("save", function (next) {
  this.titleSlug = slugify(this.title, { lower: true })
  next()
})
const Article = models.Article || model("Article", articleSchema)

export default Article
