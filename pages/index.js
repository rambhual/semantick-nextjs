import React from "react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import ProductList from "../components/Index/ProductList";

function Home({ products }) {
  return <ProductList products={products}></ProductList>;
}

Home.getInitialProps = async () => {
  const url = `${baseUrl}/api/products`;
  const result = await axios.get(url);
  return { products: result.data };
};
export default Home;
//
