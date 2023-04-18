import { useDeleteProduct } from "@/hooks/products.hook"
import React from "react"
import { Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
// import { deleteUser } from "../store/actions/admin";

const DeleteModal = (props) => {
  const { mutate: deleteProduct } = useDeleteProduct()

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
                    console.log("Delete Article")
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
