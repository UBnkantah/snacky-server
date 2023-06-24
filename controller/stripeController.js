const stripe = require("stripe")
require("dotenv").config({path: "../config.env"})


exports.checkout = async(req, res) =>{
    const line_items = req.body.cartItems.map((item) => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    images: [item.image],
                    description: item.desc,
                    metadata: {
                        id: item.id,
                    }
                },
                unit_amount: item.price * 100,
            },
            quantity: item.cartQuantity
        }
    })

    const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {
            allowed_address_colection: {
                allowed_countries: ["US", "CA", "KE"],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 0,
                            currency: "usd",
                        },
                        display_name: "Free Shipping",
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 5,
                            },
                            maximum: {
                                unit: "business_day",
                                value: 7,
                            }
                        }
                    }
                },
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 1500,
                            currency: "usd",
                        },
                        display_name: "Next day air",
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 1,
                            },
                            maximum: {
                                unit: "business_day",
                                value: 1,
                            }
                        }
                    }
                }
            ],
            phone_number_collection: {
                enabled: true
            },
            line_items,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/checkout-success`,
            cancel_url: `${process.env.CLIENT_URL}/shop`
        }
    })
    res.send({url: session.url});
}