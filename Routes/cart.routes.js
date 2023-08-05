const CartController=require('../Controller/cart.controller');
const {verifyToken} =require('../middaleware/user.middaleware')
module.exports=function(app){
    app.post('/api/cart/:productId', verifyToken , CartController.addToCart);
    app.get('/api/cart/',verifyToken, CartController.getCart);
    app.delete('/api/cart/:productId', verifyToken,CartController.removeToCart)
}
