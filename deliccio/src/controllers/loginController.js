const path = require('path');


class loginController{
    getLoginPage=(req,res)=>{
        res.sendFile(path.join(__dirname,'../views/index.html'))
    }
}

module.exports =new loginController();