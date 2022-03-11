const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

console.log(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { item } = req.body;
  console.log(item);

  

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            images: [item.image],
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        description: item.description,
        quantity: item.quantity,
      },
    ],
    mode: "payment",

    success_url: "http://localhost:3000/Success",
    cancel_url: "http://localhost:3000/Cancel",
    metadata: {
      images: item.image,
    },
  });
  res.status(200).json({ id: session.id });
};
