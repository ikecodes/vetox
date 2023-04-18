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
import { FiUploadCloud } from "react-icons/fi"
import styled from "styled-components"
import colors from "@/constants/colors"

const ProductModal = (props) => {
  const dispatch = useDispatch()
  const { mutate, isLoading } = useCreateProduct()
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [photo, setPhoto] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)
  const [images, setImages] = useState(null)

  const handleFileChange = (e) => {
    setImages(e.target.files)
    const file = e.target.files[0]
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
    if (
      name === "" ||
      category === "" ||
      description === "" ||
      price === "" ||
      !images
    )
      return toast.error("Please input all fields")

    const formdata = new FormData()
    formdata.append("name", name)
    formdata.append("category", category)
    formdata.append("photo", photo)
    formdata.append("description", description)
    formdata.append("price", price)
    for (let i = 0; i < images.length; i++) {
      formdata.append("images", images[i])
    }

    // const formdata = {
    //   name,
    //   category,
    //   images,
    //   description,
    //   price,
    // }
    console.log(formdata)
    mutate(formdata, {
      onSuccess: () => {
        toast.success("Product uploaded successfully")
        props.onHide()
      },
      onError: (e) => {
        toast.error(e?.response?.data?.message ?? "Something went wrong")
      },
    })
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
            <Upload className='bg-light border'>
              <div>
                <FiUploadCloud size={30} color={colors.grey5} />
              </div>
              <input
                type='file'
                multiple
                name='images'
                accept='image/*'
                onChange={(e) => handleFileChange(e)}
              />
            </Upload>
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

const Upload = styled.div`
  position: relative;
  border-radius: 20px;
  height: 100px;
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.secondary};
  & input {
    opacity: 0;
  }
  & div {
    border-radius: 20px;
    border: 1px dashed ${colors.grey5};
    padding: 1.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
export default ProductModal
