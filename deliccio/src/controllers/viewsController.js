const path = require('path');

class ViewsController {
    // Página principal
    getIndexPage(req, res) {
        res.sendFile(path.join(__dirname, '../public/views/index.html'));
    }


    // Página de cocina
    getCuisinePage(req, res) {
        res.sendFile(path.join(__dirname, '../public/views/cuisine.html'));
    }

    // Página del recetario
    getCookBookPage(req, res) {
        res.sendFile(path.join(__dirname, '../public/views/cook-book.html'));
    }
}

module.exports = new ViewsController();
