import User from "@/models/UserModel"
import { promisify } from "util"
import jwt from "jsonwebtoken"

const auth = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]
  }
  if (!token) {
    return res.status(401).json({
      message: "You are not logged in",
    })
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.NEXT_PUBLIC_JWT_SECRET
  )

  const currentUser = await User.findById(decoded.id)
  if (!currentUser) {
    return res.status(401).json({
      message:
        "User belonging to this token does no longer exists, please relogin",
    })
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return res.status(401).json({
      message: "User recently changed password! Please log in again",
    })
  }
  req.user = currentUser
  next()
}
export default auth
