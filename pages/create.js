import React from "react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import catchError from "../utils/catchErrors";

import {
  Form,
  Button,
  Message,
  TextArea,
  Image,
  Input,
  Segment,
  Responsive
} from "semantic-ui-react";
const INITIAL_PRODUCT = {
  name: "",
  price: "",
  description: "",
  media: ""
};
function CreateProduct() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  const [mediaPre, setMediaPre] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean(el));
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [product]);

  async function handleImageUpload() {
    return await imageUpload(product);
  }
  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "media") {
      setProduct(pre => ({ ...pre, media: files[0] }));
      setMediaPre(window.URL.createObjectURL(files[0]));
    } else {
      setProduct(pre => ({ ...pre, [name]: value }));
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      const mediaUrl = await handleImageUpload();
      const url = `${baseUrl}/api/product`;
      const { name, price, description } = product;
      const payload = { name, price, description, mediaUrl };
      await axios.post(url, payload);
      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      catchError(error, setError);
      console.error("Error!", error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Segment.Group>
      <Responsive as={Segment}>
        <Form
          loading={loading}
          error={Boolean(error)}
          success={success}
          onSubmit={handleSubmit}
        >
          <Message error header="oops!" content={error}></Message>
          <Message
            success
            header="Success!"
            content="Your product has been successfully created"
          ></Message>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              name="name"
              focus
              label="Name"
              value={product.name}
              placeholder="Enter Product Name"
              onChange={handleChange}
            />
            {/* price */}
            <Form.Field
              control={Input}
              name="price"
              label="Price"
              min="0.00"
              focus
              value={product.price}
              step="0.01"
              type="number"
              placeholder="Enter Product Price"
              onChange={handleChange}
            />

            {/* media */}
            <Form.Field
              control={Input}
              name="media"
              label="Image"
              type="file"
              accept="image/*"
              content="Select Image"
              onChange={handleChange}
            />
          </Form.Group>
          <Image src={mediaPre} centered rounded size="small"></Image>
          {/* description */}
          <Form.Field
            width={10}
            control={TextArea}
            focus
            name="description"
            value={product.description}
            label="Description"
            placeholder="Enter Descriptions"
            onChange={handleChange}
          />
          <Form.Field
            control={Button}
            color="blue"
            disabled={disabled || loading}
            content="Submit"
            type="submit"
          />
        </Form>
      </Responsive>
    </Segment.Group>
  );
}

export default CreateProduct;

async function imageUpload(product) {
  const data = new FormData();
  data.append("file", product.media);
  data.append("upload_preset", "reactreserve");
  data.append("cloud_name", "rps-technologies");
  const response = await axios.post(process.env.CLOUDINARY_URL, data);
  const mediaUrl = response.data.url;
  return mediaUrl;
}
