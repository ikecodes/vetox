import { Schema, model, models } from "mongoose"
import Product from "./ProductModel"

const reviewSchema = new Schema(
  {
    review: {
      type: String,
      ref: "User",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    product: {
      type: Schema.ObjectId,
      ref: "Product",
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "firstName lastName",
  })
  next()
})

reviewSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ])

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    })
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: 0,
      ratingsAverage: 0,
    })
  }
}

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.product)
})

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.model.findOne(this.getQuery())
  next()
})

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRatings(this.r.product)
})

const Review = models.Review || model("Review", reviewSchema)

export default Review
