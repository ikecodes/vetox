import React, { useState } from "react"
import { useEffect } from "react"
import { Form, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
import Toast from "@/utils/Toast"
import PrimaryBtn from "../PrimaryBtn"
import Image from "next/image"
import { toast } from "react-toastify"
import { useCreateProduct } from "@/hooks/products.hook"
import { Editor } from "@tinymce/tinymce-react"

const ProductModal = (props) => {
  const dispatch = useDispatch()
  const { mutate, isLoading } = useCreateProduct()
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [photo, setPhoto] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)
  const [images, setImages] = useState("")

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setPhoto(file)
    previewFile(file)
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  // useEffect(() => {
  //   if (props?.data) {
  //     setCode(props?.data.code)
  //     setDiscount(props?.data.discount)
  //     setMaxUsage(props?.data.max_usage)
  //     setExpiry(props?.data.expiry)
  //   } else {
  //     setCode("")
  //     setDiscount("")
  //     setMaxUsage("")
  //     setExpiry("")
  //   }
  // }, [props?.data])
  const handleSubmit = (e) => {
    e.preventDefault()
    // if (
    //   name === "" ||
    //   category === "" ||
    //   description === "" ||
    //   price === "" ||
    //   previewSource === ""
    // )
    //   return toast.error("Please input all fields")

    const formdata = new FormData()
    formdata.append("name", name)
    formdata.append("category", category)
    formdata.append("photo", photo)
    formdata.append("description", description)
    formdata.append("price", price)
    // for (let i = 0; i < images.length; i++) {
    //   formdata.append("images", images[i])
    // }
    // const formdata = {
    //   name,
    //   category,
    //   photo,
    //   description,
    //   price,
    // }

    // return console.log(formdata)
    mutate(formdata, {
      onSuccess: () => {
        toast.success("Product uploaded successfully")
      },
      onError: (e) => {
        toast.error(e?.response?.data?.message ?? "Something went wrong")
      },
    })
    // if (props?.data) {
    //   const id = props.data?.id
    //   dispatch(updateCoupon({ formdata, id }))
    // } else {
    //   dispatch(createCoupon(formdata))
    // }

    // props.onHide()
  }
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <form className='text-secondary'>
          {props?.data ? (
            <h4 className='text-capitalize mb-4 text-secondary'>
              update product
            </h4>
          ) : (
            <h4 className='text-capitalize mb-4 text-secondary'>new product</h4>
          )}

          <Form.Group className='mb-3'>
            <Form.Label>Product name</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Name'
              className='bg-light'
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='text'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='Price'
              className='bg-light'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder='Category'
              className='bg-light'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Editor
              apiKey='635vw7fla4lvr9tzuknnjxfngq61h86fjr4dntt7e3ai956i'
              textareaName='content'
              value={description}
              init={{
                height: 350,
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={(text) => setDescription(text)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Photo</Form.Label>
            <input
              type='file'
              name=''
              id=''
              onChange={(e) => handleFileChange(e)}
            />
            {/* <Form.Control
              type='file'
              // value={photo}
              onChange={(e) => handleFileChange(e)}
              placeholder='Photo'
              className='bg-light'
            /> */}
          </Form.Group>

          {previewSource && (
            <Image
              src={previewSource}
              alt='product img'
              height={200}
              width={200}
            />
          )}

          <div className='text-center mt-5 mb-2'>
            <PrimaryBtn
              title='submit'
              className='btn-trade'
              primary
              loading={isLoading}
              handleClick={handleSubmit}
            />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default ProductModal
