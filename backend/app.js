import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import connect from "./mongodbConnection.js";
import user from "./Schema.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/signUpDetails", async (req, res) => {
  const data = req.body;
  const { name, phoneNumber, email, password } = data;

  try {
    const { customers } = await connect();
    const customer = await customers.findOne({ email });

    if (customer) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new user({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    await customers.insertOne(newUser);
    console.log("User created successfully");
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/signInDetails", async (req, res) => {
  const data = req.body;
  const { email, password } = data;

  try {
    const { customers } = await connect();
    const customer = await customers.findOne({ email });

    if (customer) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        customer.password
      );

      if (isPasswordCorrect) {
        console.log("User signed in successfully");
        return res.status(200).json({ message: "User signed in successfully" });
      } else {
        console.log("Invalid credentials");
        return res.status(400).json({ message: "Invalid credentials" });
      }
    } else {
      console.log("User does not exist");
      return res.status(400).json({ message: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
});



connect();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
