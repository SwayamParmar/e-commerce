const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const port =3001;

const productAPI = require("./data.json");

app.get("/", (req, res)  => {
    res.send("Hello Api is being uploading on server please wait !!!!!")
});

app.get("/products", (req, res) => {
    res.send(productAPI);
});

// Place Order API
app.post("/api/order", (req, res) => {
    const { firstName, lastName, address, cartItems } = req.body;

    if (!firstName || !lastName || !address || !cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: "All fields are required and cart cannot be empty." });
    }

    console.log("Order placed successfully:");
    console.log("Customer:", firstName, lastName);
    console.log("Address:", address);
    console.log("Cart Items:", cartItems);

    res.json({ message: "Order placed successfully!" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});