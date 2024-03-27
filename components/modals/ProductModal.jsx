import React, { useState } from "react";
import { useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Toast from "@/utils/Toast";
import PrimaryBtn from "../PrimaryBtn";
import Image from "next/image";
import { toast } from "react-toastify";
import { useCreateProduct, useUpdateProduct } from "@/hooks/products.hook";
import { Editor } from "@tinymce/tinymce-react";
import { FiUploadCloud } from "react-icons/fi";
import styled from "styled-components";
import colors from "@/constants/colors";
import { categories } from "@/constants/categories";

const ProductModal = (props) => {
  const { mutate, isLoading } = useCreateProduct();
  const { mutate: updateProduct, isLoading: loading } = useUpdateProduct();
  const [subCategories, setSubCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  // const [photo, setPhoto] = useState(null)
  const [previewSource, setPreviewSource] = useState(null);
  const [images, setImages] = useState(null);

  const handleFileChange = (e) => {
    setImages(e.target.files);
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    if (props?.data) {
      setName(props?.data.name);
      setCategory(props?.data.category);
      setSubCategory(props?.data.subCategory);
      setDescription(props?.data.description);
      setPrice(props?.data.price);
    } else {
      setName("");
      setCategory("");
      setSubCategory("");
      setDescription("");
      setPrice("");
    }
  }, [props?.data]);

  useEffect(() => {
    checkForSubCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  function checkForSubCategory() {
    const foundSubCategory = categories.find(
      (value) => value.category === category
    );
    if (foundSubCategory && foundSubCategory.subCategory.length > 0) {
      setSubCategories(foundSubCategory.subCategory);
    } else {
      setSubCategories([]);
      setSubCategory("");
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      category === "" ||
      description === "" ||
      price === "" ||
      (!images && !props?.data)
    )
      return toast.error("Please input all fields");

    const foundSubCategory = categories.find(
      (value) => value.category === category
    );
    if (
      !subCategory &&
      foundSubCategory &&
      foundSubCategory.subCategory.length > 0
    )
      return toast.error(`Please select a sub category for ${category}`);

    if (props.data) {
      const formdata = {
        productId: props?.data?._id,
        name,
        category,
        subCategory,
        description,
        price,
      };
      updateProduct(formdata, {
        onSuccess: () => {
          toast.success("Product updated successfully");
          props.onHide();
        },
        onError: (e) => {
          toast.error(e?.response?.data?.message ?? "Something went wrong");
        },
      });
      return;
    }

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("category", category);
    formdata.append("description", description);
    formdata.append("price", price);
    if (subCategory) {
      formdata.append("subCategory", subCategory);
    }
    for (let i = 0; i < images.length; i++) {
      formdata.append("images", images[i]);
    }

    mutate(formdata, {
      onSuccess: () => {
        toast.success("Product uploaded successfully");
        props.onHide();
      },
      onError: (e) => {
        toast.error(e?.response?.data?.message ?? "Something went wrong");
      },
    });
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <form className="text-secondary">
          {props?.data ? (
            <h4 className="text-capitalize mb-4 text-secondary">
              edit product
            </h4>
          ) : (
            <h4 className="text-capitalize mb-4 text-secondary">new product</h4>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Product name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="bg-light"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="bg-light"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              aria-label="Select category"
              className="bg-light"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value=""> Select category</option>
              {categories.map((value, i) => (
                <option key={i} value={value.category}>
                  {value.category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {subCategories && subCategories.length > 0 && (
            <Form.Group className="mb-3">
              <Form.Label>Sub Category</Form.Label>
              <Form.Select
                aria-label="Select sub category"
                className="bg-light"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="">Select sub category</option>
                {subCategories.map((value, i) => (
                  <option key={i} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Editor
              apiKey="e50lo9r0erydcyinvgbalc6p5352jhepdnwspkj7j1n689it"
              textareaName="content"
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
          {props?.data ? (
            <p>
              If you need to edit this products images, Kindly delete the
              product and add again with the new images
            </p>
          ) : (
            <Form.Group className="mb-3">
              <Form.Label>Image </Form.Label>
              <Upload className="bg-light border">
                <div>
                  <FiUploadCloud size={30} color={colors.grey5} />
                </div>
                <input
                  type="file"
                  multiple
                  name="images"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e)}
                />
              </Upload>
              <p className="text-success">You can select more than one image</p>
            </Form.Group>
          )}

          {previewSource && (
            <Image
              src={previewSource}
              alt="product img"
              height={200}
              width={200}
            />
          )}

          <div className="text-center mt-5 mb-2">
            <PrimaryBtn
              title="submit"
              className="btn-trade"
              primary
              loading={isLoading || loading}
              handleClick={handleSubmit}
            />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

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
`;
export default ProductModal;
