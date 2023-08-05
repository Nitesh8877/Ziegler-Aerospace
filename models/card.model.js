const mongoose = require('mongoose');
const CartItem=require('./cardItem.model');

const cartSchema = new mongoose.Schema({
    user: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        required: true },
        items: [CartItem.schema]
  });
  
  const Cart = mongoose.model('Cart', cartSchema);
  module.exports=Cart;

  