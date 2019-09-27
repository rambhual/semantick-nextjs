import React from "react";
import axios from "axios";

function Home({ products }) {
  console.log("Initial Props", products);

  return <>home</>;
}

Home.getInitialProps = async () => {
  const url = "http://localhost:3000/api/products";
  const result = await axios.get(url);
  return { products: result.data };
};
export default Home;
