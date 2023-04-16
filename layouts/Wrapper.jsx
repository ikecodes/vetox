import React from "react"
import Layout from "./Layout"
import { useRouter } from "next/router"
import AdminLayout from "./admin/AdminLayout"

const Wrapper = ({ children }) => {
  const { asPath } = useRouter()
  if (asPath === "/admin/login") return <div>{children}</div>
  if (asPath.startsWith("/admin")) return <AdminLayout>{children}</AdminLayout>
  return <Layout>{children}</Layout>
}

export default Wrapper
