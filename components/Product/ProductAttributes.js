import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import baseUrl from "../../utils/baseUrl";
import { Header, Button, Modal } from "semantic-ui-react";
function ProductAttributes({ description, name, _id }) {
  // create object of router here for navigation to homepage
  const router = useRouter();

  const [modal, setModal] = useState(false);

  async function handleDelete() {
    const url = `${baseUrl}/api/product`;
    const payload = { params: { _id } };
    await axios.delete(url, payload);
    router.push("/");
  }
  return (
    <>
      <Header as="h3" color="blue">
        About this product
      </Header>
      <p>{description}</p>
      <Button
        icon="trash alternate outline"
        color="red"
        content="Delete product"
        onClick={() => setModal(true)}
      ></Button>
      <Modal open={modal} dimmer="blurring">
        <Modal.Header>Confirmation delete</Modal.Header>
        <Modal.Content>
          <p>Are you sure want to delete this product {name}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button content="Cancel" onClick={() => setModal(false)}></Button>
          <Button
            content="Delete"
            negative
            icon="trash"
            labelPosition="right"
            onClick={handleDelete}
          ></Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ProductAttributes;
