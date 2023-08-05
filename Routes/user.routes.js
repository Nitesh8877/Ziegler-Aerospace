const UserController=require('../Controller/user.controller');
const {validateField}=require('../middaleware/user.middaleware')
module.exports=function(app){
    app.post('/api/signup',validateField,UserController.signup )
    app.post('/api/signin',UserController.signin )
}