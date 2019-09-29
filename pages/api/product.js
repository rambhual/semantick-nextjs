import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";
connectDb();
import {
  OK,
  NO_CONTENT,
  getStatusText,
  METHOD_NOT_ALLOWED,
  UNPROCESSABLE_ENTITY,
  CREATED,
  INTERNAL_SERVER_ERROR
} from "http-status-codes";

export default async (req, res) => {
  switch (req.method) {
    case type.GET:
      await handleGetRequest(req, res);
      break;
    case type.POST:
      await handlePostRequest(req, res);
      break;
    case type.DELETE:
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(METHOD_NOT_ALLOWED).send(getStatusText(METHOD_NOT_ALLOWED));
      break;
  }
};

const type = {
  GET: "GET",
  DELETE: "DELETE",
  POST: "POST"
};

async function handlePostRequest(req, res) {
  try {
    const { name, price, description, mediaUrl } = req.body;
    if (!name || !price || !description || !mediaUrl) {
      return res
        .status(UNPROCESSABLE_ENTITY)
        .send(
          `Unable to create product! ${getStatusText(UNPROCESSABLE_ENTITY)}`
        );
    }
    await new Product({
      name,
      price,
      description,
      mediaUrl
    }).save();
    res.status(CREATED).send("Created successfully");
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(
        `Server issue please contact to admin ${getStatusText(
          INTERNAL_SERVER_ERROR
        )}`
      );
  }
}

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
