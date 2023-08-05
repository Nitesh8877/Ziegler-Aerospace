const orderController=require('../Controller/order.controller');
const {verifyToken} =require('../middaleware/user.middaleware')
module.exports=function (app){
    app.post('/api/product/order/',verifyToken, orderController.createOrder);
    app.get('/api/product/order/', verifyToken, orderController.getOrder);
    app.delete('/api/product/order/:orderId', verifyToken, orderController.cancelOrder)
}