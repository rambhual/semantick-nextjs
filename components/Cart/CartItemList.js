import { Header, Segment, Button } from "semantic-ui-react";

function CartItemList() {
  const user = false;
  return (
    <Segment secondary color="teal" inverted textAlign="center">
      <Header>
        <p>No products in your cart! Add some</p>
      </Header>
      <div>
        {user ? (
          <Button color="orange">View products</Button>
        ) : (
          <Button color="blue">Login to add carts</Button>
        )}
      </div>
    </Segment>
  );
}

export default CartItemList;
