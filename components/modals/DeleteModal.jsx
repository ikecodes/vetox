import React from "react"
import { Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
// import { deleteUser } from "../store/actions/admin";

const DeleteModal = (props) => {
  const dispatch = useDispatch()

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
                    console.log("Delete Product")
                  }
                  if (props.deletetype === "article") {
                    console.log("Delete Article")
                  }
                  props.onHide()
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
