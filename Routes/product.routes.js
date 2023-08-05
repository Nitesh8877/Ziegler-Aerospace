const ProductController=require('../Controller/product.controller');
const {verifyToken} =require('../middaleware/user.middaleware')
module.exports=function(app){
    app.get('/api/product',ProductController.getAllProducts);
    app.post('/api/product', verifyToken, ProductController.createProduct);
    app.get('/api/product/:id', ProductController.search);
}