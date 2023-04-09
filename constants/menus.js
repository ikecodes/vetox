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
        path: "/contact",
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
    id: "1",
    name: "grants",
    path: "/admin-grants",
  },
  {
    id: "2",
    name: "portfolio",
    path: "/admin-portfolio",
  },
  {
    id: "3",
    name: "blog",
    path: "/admin-blog",
  },
  {
    id: "4",
    name: "press",
    path: "/admin-press",
  },
  {
    id: "5",
    name: "messages",
    path: "/admin-messages",
  },
  {
    id: "6",
    name: "applications",
    path: "/admin-applications",
  },
  {
    id: "7",
    name: "gallery",
    path: "/admin-gallery",
  },
  {
    id: "8",
    name: "staff/trustees",
    path: "/admin-staff-trustees",
  },
  {
    id: "9",
    name: "awardees",
    path: "/admin-awardees",
  },
];

export default menus;
