const ShoppingCart = require('./ShoppingCart');

class SiteRouting{
    constructor(express, sqLite){
        this.express = express;
        this.sqLite = sqLite;
    }

    init() {
        this.routeShopPath();
        this.routeShoppingCartPath();
    }

    routeShopPath() {
        this.express.get('/', (req, res) => {
            let shoppingCart = Object.assign(new ShoppingCart, req.session.shoppingCart);
            if (req.session.message) {
                var message = req.session.message.slice();
                req.session.message = undefined;
            }
            let sql = this.sqLite;
            sql.serialize(function () {
                sql.all("SELECT Id, Title FROM Games Where Already_bought = 0;", (error, results) => {
                    if (error) {
                        res.status(400).send('Error during database operation');
                    } else {
                        res.render('index', { 'games': results, 'gamesInCart': shoppingCart.games, 'userMessage': message });
                    }
                });
            })
        });
    }

    routeShoppingCartPath() {
        this.express.get('/shoppingCart', (req, res) => {
            let shoppingCart = Object.assign(new ShoppingCart, req.session.shoppingCart);
            if (req.session.message) {
                var message = req.session.message.slice();
                req.session.message = undefined;
            }

            res.render('shoppingCart', { 'gamesInCart': shoppingCart.games, 'userMessage': message });
        });
    }

}

module.exports = SiteRouting;