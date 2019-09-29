import { Button, Segment, Divider } from "semantic-ui-react";
function CartSummary() {
  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub Total:</strong> $0.00
        <Button
          color="teal"
          floated="right"
          icon="cart"
          content="Checkout"
        ></Button>
      </Segment>
    </>
  );
}

export default CartSummary;
