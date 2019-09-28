import Product from "../../models/Product";
import {
  OK,
  NO_CONTENT,
  getStatusText,
  METHOD_NOT_ALLOWED
} from "http-status-codes";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(METHOD_NOT_ALLOWED).send(getStatusText(METHOD_NOT_ALLOWED));
      break;
  }
};

async function handleGetRequest(req, res) {
  const { _id } = req.query;
  const product = await Product.findOne({ _id });
  res.status(OK).json(product);
}
async function handleDeleteRequest(req, res) {
  const { _id } = req.query;
  await Product.findOneAndDelete({ _id });
  res.status(NO_CONTENT).send(getStatusText(NO_CONTENT));
}
