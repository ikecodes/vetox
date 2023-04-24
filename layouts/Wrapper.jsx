import React, { useEffect } from "react"
import Layout from "./Layout"
import { useRouter } from "next/router"
import AdminLayout from "./admin/AdminLayout"
import { useSelector } from "react-redux"
import protectRoutes from "@/constants/protectedRoutes"

const Wrapper = ({ children }) => {
  const { value } = useSelector((state) => state.user)
  const { asPath, push } = useRouter()

  useEffect(() => {
    // if (!value && protectRoutes.includes(asPath)) return () => push("/")
    if (
      value &&
      asPath !== "/admin/login" &&
      asPath.startsWith("/admin") &&
      value.role !== "admin"
    )
      return () => push("/")
  }, [asPath, push, value])

  if (asPath === "/admin/login") return <div>{children}</div>
  if (asPath.startsWith("/admin")) return <AdminLayout>{children}</AdminLayout>
  return <Layout>{children}</Layout>
}

export default Wrapper
