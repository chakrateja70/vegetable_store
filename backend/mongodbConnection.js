import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://chakrateja70:21811A4226@cluster0.xu5qq6y.mongodb.net/"
    );

    const db = mongoose.connection.useDb("ecomStore");
    const customers = db.collection("customers");

    console.log("MongoDB connected");
    return {customers};

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connect;
