import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isLength from "validator/lib/isLength";
import isEmail from "validator/lib/isEmail";

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!isLength(name, { min: 3, max: 10 })) {
      return res.status(422).send("name must be between 3-10 char!");
    } else if (!isLength(password, { min: 6 })) {
      return res.status(422).send("password cannot be less then 6 char!");
    } else if (!isEmail(email)) {
      return res.status(422).send("email address must be valid");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(422).send(`User already exist with email ${email}`);
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hash
    }).save();
    // create token for the user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signup");
  }
};
