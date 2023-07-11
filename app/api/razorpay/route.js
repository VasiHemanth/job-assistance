const Razorpay = require("razorpay");
const shortid = require("shortid");

export async function POST(request) {
  let body = await request.json();

  // Initialize razorpay object
  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
  });

  // Create an order -> generate the OrderID -> Send it to the Front-end
  const payment_capture = 1;
  let amount = null;
  if (body.plan === "three months") {
    amount = 2999;
  } else {
    amount = 9999;
  }
  const currency = "INR";
  const options = {
    amount: (amount * 100).toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log("Response", response);
    return new Response(
      JSON.stringify({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify(
        {
          error: err,
        },
        { status: 400 }
      )
    );
  }
}
