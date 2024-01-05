import Order from '../models/order.js';

// Add or update an order
export const createOrUpdateOrder = async (req, res) => {
    try {
        const {
            id,
            order_type,
            service,
            products,
            customer,
            status,
            payment,
            delivery_agent,
            cartTotal,
            cartWeight,
            cartWeightBy,
        } = req.body;

        const existingOrder = await Order.findById(id);

        if (existingOrder) {
            existingOrder.order_type = order_type;
            existingOrder.service = service;
            existingOrder.products = products;
            existingOrder.customer = customer;
            existingOrder.status = status;
            existingOrder.payment = payment;
            existingOrder.delivery_agent = delivery_agent;
            existingOrder.cartTotal = cartTotal;
            existingOrder.cartWeight = cartWeight;
            existingOrder.cartWeightBy = cartWeightBy;

            await existingOrder.save();

            return res.status(200).json({
                message: 'Order updated successfully',
                order: existingOrder
            });
        } else {
            const newOrder = new Order({
                order_type,
                service,
                products,
                customer,
                status,
                payment,
                delivery_agent,
                cartTotal,
                cartWeight,
                cartWeightBy,
            });

            await newOrder.save();

            return res.status(201).json({
                message: 'Order created successfully',
                order: newOrder
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};




// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('service', 'serviceTitle')
            .populate('products.id', 'product_name')
            .populate('customer', 'username')
            .populate('delivery_agent', 'username')
            .execPopulate();

        return res.status(200).json({
            orders,
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

// Get a specific order by its ID
export const getOrderById = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const order = await Order.findById(id)
            .populate('service', 'serviceTitle')
            .populate('products.id', 'product_name')
            .populate('customer', 'username')
            .populate('delivery_agent', 'username')
            .execPopulate();

        if (!order) {
            return res.status(404).json({
                message: 'Order not found',
                ok: false
            });
        }

        return res.status(200).json({
            order,
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

// Delete an order by its ID
export const deleteOrderById = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        // Find the Order by ID and remove it
        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({
                message: 'Order not found',
                ok: false
            });
        }

        return res.status(200).json({
            message: 'Order deleted successfully',
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


// Update the status of an order by its ID
export const updateOrderStatusById = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            status
        } = req.body;

        const existingOrder = await Order.findById(id);

        if (!existingOrder) {
            return res.status(404).json({
                message: 'Order not found',
                ok: false
            });
        }

        existingOrder.status = status;
        await existingOrder.save();


        return res.status(200).json({
            message: 'Order status updated successfully',
            order: updatedOrder
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};