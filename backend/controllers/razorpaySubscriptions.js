import Order from '../models/order.js';
import Razorpay from 'razorpay';
import Transaction from '../models/transacation.js';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});
// Add or update an order


export const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log("id==", body)

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;


    if (isAuthentic) {

        console.log(Payment)



        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        //  return NextResponse.redirect(new URL('/paymentsuccess', req.url));

    } else {
        return NextResponse.json({
            message: "fail"
        }, {
            status: 400,
        })

    }


    return NextResponse.json({
        message: "success"
    }, {
        status: 200,
    })

}


export const savePayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        // const body = razorpay_order_id + "|" + razorpay_payment_id;
        console.log("id==", razorpay_order_id, razorpay_payment_id, razorpay_signature);

        const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
        console.log("Payment Details:", paymentDetails);

        // Handle the payment details as needed
        // Save the payment details in your database as well
        // For example, you may want to save payment details in a 'Payment' model
        const transaction = new Transaction({
            payment_id: razorpay_payment_id,
            entity: paymentDetails.entity,
            amount: paymentDetails.amount,
            currency: paymentDetails.currency,
            status: paymentDetails.status,
            razorpay_order_id: paymentDetails.order_id,
            method: paymentDetails.method,
            captured: paymentDetails.captured,
            card_id: paymentDetails.card_id,
            bank: paymentDetails.bank,
            wallet: paymentDetails.wallet,
            vpa: paymentDetails.vpa,
            fee: paymentDetails.fee,
            tax: paymentDetails.tax,
            error_code: paymentDetails.error_code,
            error_description: paymentDetails.error_description,
            acquirer_data: {
                rrn: paymentDetails.acquirer_data.rrn,
                upi_transaction_id: paymentDetails.acquirer_data.upi_transaction_id,
            },
            created_at: paymentDetails.created_at,
            upi: {
                vpa: paymentDetails.upi.vpa,
            },

        });

        await transaction.save();


        res.status(200).json({ success: true, message: 'Payment details fetched successfully' });

    } catch (error) {
        console.error('Error saving payment:', error);
        res.status(500).json({ success: false, message: 'Error saving payment' });
    }
};

export const createPlan = async (req, res) => {
    const { period, interval, item } = req.body;
    try {
        const plan = razorpay.plans.create({
            period: period,
            interval: interval,
            item: {
                name: item.name,
                amount: item.amount,
                currency: "INR",
                description: item.description
            },
            notes: {
                notes_key_1: "Laundry, Dry Cleaning, Ironing",
                notes_key_2: "Laundry, Dry Cleaning, Ironing"
            }
        });

        return res.status(200).json({
            message: 'Plan Created  successfully',
            plan: plan
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}




export const getAllPlans = async (req, res) => {
    try {

        const plans = await razorpay.plans.all();
console.log('plansplans',plans)
        return res.status(200).json({
            plans,
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            ok: false
        });
    }
};


// export const getAllSubscriptionPlans = async (req, res) => {
//     try {
//         // const orders = await Order.find()
//         //     .populate('service', 'serviceTitle')
//         //     .populate('products.id', 'product_name')
//         // .populate('customer', 'fullName')
//         // .populate('delivery_agent', 'fullName')
//         // .execPopulate();

//         return res.status(200).json({
//             orders,
//             ok: true
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             error: 'Internal Server Error',
//             ok: false
//         });
//     }
// };


// export const getSubscriptionPlanById = async (req, res) => {
//     try {
//         const {
//             id
//         } = req.params;
//         return res.status(200).json({

//             ok: true
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             error: 'Internal Server Error',
//             ok: false
//         });
//     }
// };


// export const deletSubscriptionPlanById = async (req, res) => {
//     try {
//         const {
//             id
//         } = req.params;

//         // Find the Order by ID and remove it


//         return res.status(200).json({

//             ok: true
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             error: 'Internal Server Error',
//             ok: false
//         });
//     }
// };



// export const updateSubscriptionPlanById = async (req, res) => {
//     try {
//         const {
//             id
//         } = req.params;
//         const {
//             status
//         } = req.body;
//         return res.status(200).json({
//             message: 'Order status updated successfully',
//             order: updatedOrder
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             error: 'Internal Server Error'
//         });
//     }
// };



export const createSubscriptionCheckout = async (req, res) => {
    try {
      // Validate the request body
    //   const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     return res.status(400).json({ success: false, errors: errors.array() });
    //   }
  
      const { plan_id, quantity, item, addonQuantity,total_count } = req.body;
      console.log('req.body',req.body)
  
      // Create subscription payload
      const subscriptionPayload = {
        plan_id,
        quantity,
        total_count,
        // addons: [
        //   {
        //     item: item,
        //     quantity: addonQuantity
        //   }
        // ]
        addons: [
            {
              item: {
                name: "Delivery charges",
                amount: 10000,
                currency: "INR"
              }
            },
            {
                item: {
                  name: "Delivery charges",
                  amount: 10000,
                  currency: "INR"
                }
              },
              {
                item: {
                  name: "Delivery charges",
                  amount: 10000,
                  currency: "INR"
                }
              },
              {
                item: {
                  name: "Delivery charges",
                  amount: 10000,
                  currency: "INR"
                }
              }
          ],
          notes: {
            key1: "value3",
            key2: "value2"
          }
      };
  console.log('subscriptionPayloadsubscriptionPayloadsubscriptionPayloadsubscriptionPayloadsubscriptionPayloadsubscriptionPayload',subscriptionPayload)
      // Create subscription using Razorpay instance
      razorpay.subscriptions.create(subscriptionPayload, (error, subscription) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ success: false, message: 'Subscription creation failed' });
        }
  
        return res.status(201).json({ success: true, message: 'Subscription created successfully', data: subscription });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };





