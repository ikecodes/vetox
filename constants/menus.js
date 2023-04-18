import { BiMessageRoundedDetail } from "react-icons/bi"
import { FaBlogger, FaStore } from "react-icons/fa"
import { RiDashboardFill } from "react-icons/ri"

const menus = [
  {
    id: "1",
    name: "products",
    path: "/products",
    sub: [
      {
        id: "1",
        name: "apply for grants",
        path: "/grants",
      },
      {
        id: "2",
        name: "awardees",
        path: "/awardees",
      },
    ],
  },
  {
    id: "2",
    name: "about us",
    path: "/about-us",
    sub: [
      {
        id: "1",
        name: "company overview",
        path: "/about-us",
      },
      {
        id: "3",
        name: "contact us",
        path: "/contact-us",
      },
    ],
  },

  {
    id: "3",
    name: "blog",
    path: "/blog",
    sub: [],
  },
]

export const adminMenu = [
  {
    id: 1,
    name: "dashboard",
    path: "/admin/dashboard",
    icon: <RiDashboardFill size={20} />,
    sub: [],
  },
  {
    id: 2,
    name: "products",
    path: "/admin/products",
    icon: <FaStore size={20} />,
    sub: [],
  },
  {
    id: 3,
    name: "blog",
    path: "/admin/blog",
    icon: <FaBlogger size={20} />,
    sub: [],
  },
  {
    id: 4,
    name: "messages",
    path: "/admin/messages",
    icon: <BiMessageRoundedDetail size={20} />,
    sub: [],
  },
]

export default menus
