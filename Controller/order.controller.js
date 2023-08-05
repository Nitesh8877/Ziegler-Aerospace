const Cart = require('../models/card.model');
const Order = require('../models/order.model');
const User=require('../models/user.model')
const constant=require('../utils/constant');
exports.createOrder=async(req, res)=> {
  const user = await User.findOne({email:req.email}) // Assuming you have user authentication
  const userId=user._id;
    console.log(userId);
  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    console.log(cart);
    const totalAmount = cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
    console.log(totalAmount)
    const order = new Order({
      user: userId,
      products: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      totalAmount: totalAmount,
      paymentMethod: 'Cash on Delivery',
      status:constant.Dispathch
    });

    await order.save();
    await cart.deleteOne(); // Clear the cart after creating the order
    res.status(201).send({ 
      message: `Order created successfully`,
      PaymentMethod: "Cash on Delivery",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while creating the order' });
  }
}

exports.cancelOrder=async(req,res)=>{

  const user = await User.findOne({email:req.email}) // Assuming you have user authentication
  const userId=user._id;
  const orderId = req.params.orderId;

  try {
    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

  if (order.status !== 'Delivered' && order.status !== 'Processed') {
      order.status = 'Cancelled';
      await order.save();

      res.status(200).send({ message: 'Order cancelled successfully' });
    } else {
      res.status(400).send({ error: 'Cannot cancel delivered or processed orders' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while cancelling the order' });
  }
}


exports.getOrder=async(req,res)=>{
  const user = await User.findOne({email:req.email}) // Assuming you have user authentication
  const userId=user._id;
  try {
    const orders = await Order.find({ user: userId }).populate('products.product');

    res.status(200).send({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching orders' ,err});
  }
}