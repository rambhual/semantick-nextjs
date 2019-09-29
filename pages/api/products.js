import { OK } from "http-status-codes";

import Product from "../../models/Product";

import connectDb from "../../utils/connectDb";
connectDb();

export default async (req, res) => {
  const products = await Product.find();
  res.status(OK).json(products);
};
