const path = require('path');


class wineController{
    getWinePage=(req,res)=>{
        res.sendFile(path.join(__dirname,'../views/index.html'))
    }
}

module.exports =new wineController();