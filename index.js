require("dotenv").config();
const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

app.use(cors());
app.use(express.json());

app.post("/payment", async (req, res) => {
  try {
    const { amount, currency } = req.body; // 👈 get amount from frontend

    // Validation
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    if (!currency || typeof currency !== "string") {
      return res.status(400).json({ error: "Invalid currency" });
    }

    // Create a new customer
    const customer = await stripe.customers.create();

    // Create an ephemeral key for the customer
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2023-08-16" }
    );

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // 👈 use the dynamic amount here
      currency,
      customer: customer.id,
      automatic_payment_methods: { enabled: true },
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Backend running on port 3000"));
