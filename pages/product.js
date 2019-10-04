import axios from "axios";
import baseUrl from "../utils/baseUrl";
import ProductSummary from "../components/Product/ProductSummary";
import ProductAttributes from "../components/Product/ProductAttributes";
function Product({ product, user }) {
  return (
    <div style={{ margin: "2rem 7rem" }}>
      <ProductSummary {...product} />
      <ProductAttributes user={user} {...product} />
    </div>
  );
}
Product.getInitialProps = async ({ query: { _id } }) => {
  const url = `${baseUrl}/api/product`;
  const payload = { params: { _id } };
  const res = await axios.get(url, payload);
  return { product: res.data };
};

export default Product;
