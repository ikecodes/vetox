import jwt from "jsonwebtoken"

const signToken = (id) => {
  return jwt.sign({ id }, process.env.NEXT_PUBLIC_JWT_SECRET, {
    expiresIn: process.env.NEXT_PUBLIC_JWT_EXPIRES_IN,
  })
}
const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  user.password = undefined
  res.status(statusCode).json({
    token,
    ...user._doc,
  })
}

export default createAndSendToken
