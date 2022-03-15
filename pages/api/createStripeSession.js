const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

console.log(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items } = req.body;
  console.log(items);

  

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
           
            name: items.name,
          },
          unit_amount: items.price * 100,
        },
        description: items.description,
        
      },
    ],
    mode: "payment",

    success_url: "http://localhost:3000/Success",
    cancel_url: "http://localhost:3000/Cancel",
   
  });
  res.status(200).json({ id: session.id });
};
