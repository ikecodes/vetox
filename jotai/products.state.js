import { atom } from "jotai"

export const productsPagination = atom({
  page: 1,
  pageSize: 20,
  categorySlug: " ",
  subCategorySlug: "",
})
