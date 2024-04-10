const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_TEST);
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("GET Response from Researcher");
  res.json({
    message: "yay works!",
  });
});

router.post("/pay", async (req, res, next) => {
  try {
    const { token, amount } = req.body;
    const idempotencyKey = uuidv4();

    console.log("token email " + token.email);
    const customer = await stripe.customers.create({
      email: token.email,
      source: token,
    });

    console.log("Stripe customer: " + customer.id);
    const charge = await stripe.charges.create(
      {
        amount: amount * 100,
        currency: "cad",
        customer: customer.id,
        receipt_email: token.email,
      },
      { idempotencyKey }
    );

    res.status(200).json(charge);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "An error occurred while processing the payment:" + error,
      });
  }
});

module.exports = router;
