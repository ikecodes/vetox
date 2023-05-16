import React, { useEffect, useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { Form, Modal } from "react-bootstrap"
import PrimaryBtn from "../PrimaryBtn"
import Image from "next/image"
import { toast } from "react-toastify"
import styled from "styled-components"
import colors from "@/constants/colors"
import { FiUploadCloud } from "react-icons/fi"
import { useCreateHero, useUpdateHero } from "@/hooks/hero.hook"

const HeroModal = (props) => {
  const { mutate, isLoading } = useCreateHero()
  const { mutate: updateHero, isLoading: loading } = useUpdateHero()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [previewSource, setPreviewSource] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    previewFile(file)
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  useEffect(() => {
    if (props?.data) {
      setTitle(props?.data.title)
      setDescription(props?.data.description)
    } else {
      setTitle("")
      setDescription("")
    }
  }, [props?.data])
  const handleSubmit = (e) => {
    e.preventDefault()
    if (title === "" || description === "")
      return toast.error("Please input all fields")
    if (!image && !props?.data) return toast.error("Please input all fields")
    if (props?.data) {
      const formdata = {
        heroId: props?.data?._id,
        title,
        description,
      }

      updateHero(formdata, {
        onSuccess: () => {
          toast.success("Hero updated successfully")
          props.onHide()
        },
        onError: (e) => {
          toast.error(e?.response?.data?.message ?? "Something went wrong")
        },
      })
      return
    }
    const formdata = new FormData()
    formdata.append("title", title)
    formdata.append("description", description)
    formdata.append("image", image)
    mutate(formdata, {
      onSuccess: () => {
        toast.success("Hero uploaded successfully")
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
            <h4 className='text-capitalize mb-4 text-secondary'>update hero</h4>
          ) : (
            <h4 className='text-capitalize mb-4 text-secondary'>new hero</h4>
          )}

          <Form.Group className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Title'
              className='bg-light'
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              //   type='textarea'
              as={"textarea"}
              value={description}
              cols='60'
              rows='5'
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Description'
              className='bg-light'
            />
          </Form.Group>

          {!props?.data && (
            <Form.Group className='mb-3'>
              <Form.Label>Image</Form.Label>
              <Upload className='bg-light border'>
                <div>
                  <FiUploadCloud size={30} color={colors.grey5} />
                </div>
                <input type='file' onChange={(e) => handleFileChange(e)} />
              </Upload>
            </Form.Group>
          )}

          {previewSource && (
            <Image
              src={previewSource}
              alt='hero img'
              height={200}
              width={200}
            />
          )}

          <div className='text-center mt-5 mb-2'>
            <PrimaryBtn
              title='submit'
              className='btn-trade'
              primary
              loading={isLoading || loading}
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
export default HeroModal
