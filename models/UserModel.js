import mongoose from "mongoose"
import { Schema, model, models } from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"

const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    isVerified: {
      type: Boolean,
      default: true,
    },
    emailConfirmToken: Number,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      minlength: 5,
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },

  { timestamps: true }
)

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next()
  this.passwordChangedAt = Date.now() - 1000
  next()
})

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } })
  next()
})

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    )
    return JWTTimestamp < changedTimestamp
  }
  return false
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex")

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000
  return resetToken
}

userSchema.methods.createEmailConfirmToken = function () {
  const confirmToken = Math.floor(100000 + Math.random() * 900000)
  this.emailConfirmToken = confirmToken
  return confirmToken
}

const User = models.User || model("User", userSchema)

export default User
