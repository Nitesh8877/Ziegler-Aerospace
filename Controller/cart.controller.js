const Cart=require('../models/card.model');
const Product=require('../models/product.model');
const User=require('../models/user.model');
const CartItem = require('../models/cardItem.model');
exports.addToCart=async(req,res)=>{

    const productId=req.params.productId;
    let user=await User.findOne({email:req.email});
    console.log(user)
    const userId=user._id;
    try {
        const product=await Product.findById(productId);
        if(!product){
            return res.status(404).send({
                error:"Product not found"
            })
        }
        let cart=await Cart.findOne({user:userId});
        if(!cart){
            cart=new Cart({user:userId, items:[]});

        }
        const cartItem=cart.items.find(item=>item.product.equals(productId));
        if(cartItem){
            cartItem.quantity+=1;
        }else{
            cart.items.push(new CartItem({product:productId,quantity:1}));
        }
        await cart.save();

        res.status(200).send({
            message:"Product added to cart"
        })

    } catch (error) {
        res.status(500).send({
            message:"Something went wrong"
        })
    }

}

exports.removeToCart=async(req,res)=>{

    const productId=req.params.productId;
    let user=await User.findOne({email:req.email});
    console.log(user)
    const userId=user._id;
    try {
        const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });

    }
    cart.items = cart.items.filter(item => !item.product.equals(productId));
    await cart.save();
    
    res.status(200).send({ message: 'Cart item removed' });
} catch (err) {
  console.error(err);
  res.status(500).json({ error: 'An error occurred' });
}
}

exports.getCart=async(req,res)=>{

    let user=await User.findOne({email:req.email});
    console.log(user)
    const userId=user._id; // Assuming you have user authentication

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cartProducts = cart.items.map(item => ({
      product: item.product,
      quantity: item.quantity
    }));

    res.status(200).send({ cartProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching cart products' });
  }
}