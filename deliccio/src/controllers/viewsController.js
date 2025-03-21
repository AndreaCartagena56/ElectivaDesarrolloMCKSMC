const path = require('path');

class ViewsController {
    getContactsPage = (req, res) => {
        res.sendFile(path.join(__dirname, '../views/contacts.html'));
    }

    getCookBookPage = (req, res) => {
        res.sendFile(path.join(__dirname, '../views/cook-book.html'));
    }

    getCuisinePage = (req, res) => {
        res.sendFile(path.join(__dirname, '../views/cuisine.html'));
    }

    getRegistroPage = (req, res) => {
        res.sendFile(path.join(__dirname, '../views/registro.html'));
    }

    getWinePage = (req, res) => {
        res.sendFile(path.join(__dirname, '../views/wine.html'));
    }
}

module.exports = new ViewsController();
