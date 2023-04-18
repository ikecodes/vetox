import { useDeleteArticle } from "@/hooks/articles.hook"
import { useDeleteMessage } from "@/hooks/messages.hook"
import { useDeleteProduct } from "@/hooks/products.hook"
import React from "react"
import { Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
// import { deleteUser } from "../store/actions/admin";

const DeleteModal = (props) => {
  const { mutate: deleteProduct } = useDeleteProduct()
  const { mutate: deleteArticle } = useDeleteArticle()
  const { mutate: deleteMessage } = useDeleteMessage()

  console.log("PROPS", props)
  return (
    <Modal
      {...props}
      size='sm'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className='d-flex gap-3 flex-wrap flex-md-nowrap'>
          <div>
            <h5>Are you sure you want to remove?</h5>
            <div>
              <button
                className='btn btn-danger'
                onClick={async () => {
                  if (props.deletetype === "product") {
                    deleteProduct(props.deleteid, {
                      onSuccess: () => {
                        toast.success("Delete successful")
                        props.onHide()
                      },
                      onError: (e) => {
                        toast.error(
                          e?.response?.data?.message ??
                            "Something went wrong deleting product"
                        )
                        props.onHide()
                      },
                    })
                  }
                  if (props.deletetype === "article") {
                    deleteArticle(props.deleteid, {
                      onSuccess: () => {
                        toast.success("Delete successful")
                        props.onHide()
                      },
                      onError: (e) => {
                        toast.error(
                          e?.response?.data?.message ??
                            "Something went wrong deleting article"
                        )
                        props.onHide()
                      },
                    })
                  }
                  if (props.deletetype === "message") {
                    deleteMessage(props.deleteid, {
                      onSuccess: () => {
                        toast.success("Delete successful")
                        props.onHide()
                      },
                      onError: (e) => {
                        toast.error(
                          e?.response?.data?.message ??
                            "Something went wrong deleting message"
                        )
                        props.onHide()
                      },
                    })
                  }
                }}
              >
                Yes remove
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default DeleteModal
