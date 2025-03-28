const path = require('path');

class LoginController{
    getLoginPage =(req, res)=> {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    }
}
module.exports=new LoginController();