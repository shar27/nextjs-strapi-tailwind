const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

console.log(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async (req, res) => {
  //
  const { items} = req.body;
  console.log(items);

 const transformedItems = items.map(item => ({
   description: item.description,
   quantity: 1,
   price_data: {
     currency: 'gbp',
     unit_amount: item.price * 100,
     product_data: {
       name: item.name,

     },
   }
 }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: transformedItems,
    mode: "payment",
    
    success_url: "http://localhost:3000/Success",
    cancel_url: "http://localhost:3000/Cancel",
   
  });
  res.status(200).json({ id: session.id });

};
