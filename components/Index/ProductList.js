import { Card } from "semantic-ui-react";
function ProductList({ products }) {
  function mapProductsToItems(products) {
    return products.map((product, i) => ({
      header: product.name,
      image: product.mediaUrl,
      meta: `$${product.price}`,
      color: i % 2 === 0 ? `red` : "green",
      fluid: true,
      childKey: product._id,
      href: `/product?_id=${product._id}`
    }));
  }
  return (
    <Card.Group
      itemsPerRow={3}
      centered
      stackable
      items={mapProductsToItems(products)}
    ></Card.Group>
  );
}

export default ProductList;
