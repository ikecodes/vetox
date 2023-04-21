import { Schema, model, models } from "mongoose"
import slugify from "slugify"

const productSchema = new Schema(
  {
    name: {
      type: String,
    },
    nameSlug: String,
    category: {
      type: String,
    },
    categorySlug: String,
    images: [
      {
        publicId: String,
        original: String,
        thumbnail: String,
      },
    ],
    price: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    ratingsQuantity: Number,
    ratingsAverage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

//  virtural populate
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
})


productSchema.pre("save", function (next) {
  this.nameSlug = slugify(this.name, { lower: true })
  this.categorySlug = slugify(this.category, { lower: true })
  next()
})
const Product = models.Product || model("Product", productSchema)

export default Product
