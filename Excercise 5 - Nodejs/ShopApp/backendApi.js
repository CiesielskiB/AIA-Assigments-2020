const ShoppingCart = require('./ShoppingCart');
const url = require('url');
const sqlite3 = require('sqlite3').verbose()


class BackendApi{
    constructor(express, sqLite) {
        this.express = express;
        this.sqLite = sqLite;
    }

    init() {
        this.handlePutGameToShoppingCart();
        this.handleRemoveGameFromShoppingCart();
        this.handleCleanGamesFromShoppingCart();
        this.handleBuyAllGames();
    }

    handlePutGameToShoppingCart() {
        this.express.put('/api/shopping-cart/game', (req, res) => {

            let gameId = req.body;
            if (!req.session.shoppingCart) {
                req.session.shoppingCart = new ShoppingCart();
            }
            let query = 'SELECT * FROM Games WHERE Id = ?';
            this.sqLite.get(query, [gameId.Id], (_, row) => {
                let gameInDB = row;
                if (!gameInDB.Already_bought) {
                    let shoppingCart = Object.assign(new ShoppingCart, req.session.shoppingCart);
                    shoppingCart.addGame(gameInDB);
                } else {
                    req.session.message = 'This game has already been bought';
                }

                this.sendUserTo('/', res, req)
            })
        })
    }


    handleRemoveGameFromShoppingCart() {
        this.express.delete('/api/shopping-cart/game', (req, res) => {

            let gameId = req.body;
            let shoppingCart = Object.assign(new ShoppingCart, req.session.shoppingCart)
            shoppingCart.removeGame(gameId.Id)
            req.session.shoppingCart = shoppingCart
            this.sendUserTo('/shoppingCart', res, req)
        })
    }

    handleCleanGamesFromShoppingCart() {
        this.express.delete('/api/shopping-cart/games', (req, res) => {

            let shoppingCart = Object.assign(new ShoppingCart, req.session.shoppingCart)
            shoppingCart.cleanShoppingCart()
            req.session.shoppingCart = shoppingCart
            req.session.message = 'Your shopping cart has been successfuly cleared'
            this.sendUserTo('/', res, req)
        })
    }



    handleBuyAllGames() {
        this.express.post('/api/shopping-cart/games', (req, res) => {
                let shoppingCart = Object.assign(new ShoppingCart, req.session.shoppingCart)
                let gamesInCartIds = []
                shoppingCart.games.forEach(game => {
                    gamesInCartIds.push(game.Id)
                });
                let query = 'SELECT * FROM games WHERE Id IN (' + gamesInCartIds.map(function(){ return '?' }).join(',') + ' )';
                this.sqLite.all(query, gamesInCartIds, (error, rows) => {
                    if (error) {
                        res.status(400).send('Error during database operation' + error);
                    } else {
                        let wasAnyGameBoughtBefore = false
                        rows.forEach(gamesInDb => {
                            if (gamesInDb.Already_bought) {
                                wasAnyGameBoughtBefore = true
                                shoppingCart.removeGame(gamesInDb.Id)
                                req.session.shoppingCart = shoppingCart
                            }
                        });

                        if (wasAnyGameBoughtBefore) {
                            req.session.message = 'Someone had already bought at least one of your games and they were removed from the cart, transactions couldn\'t be finalized'
                            this.sendUserTo('/shoppingCart', res, req)
                        } else {
                            let updateQuery = 'UPDATE games SET Already_bought = 1 WHERE Id In (' + gamesInCartIds.map(function(){ return '?' }).join(',') + ' )';
                            console.log(updateQuery)
                            this.sqLite.run(updateQuery, gamesInCartIds, (error) => {
                                if (error) {
                                    res.status(400).send('Error during database operation');
                                } else {
                                    console.log(this.changes)
                                    req.session.shoppingCart = new ShoppingCart()
                                    req.session.message = 'Successfully bought all games!'
                                    this.sendUserTo('/', res, req)
                                }
                            })
                        }
                    }
                }
            )
        })
    }


    sendUserTo(path, res, req) {
        var requrl = url.format({
            protocol: req.protocol,
            host: req.get('Host'),
            pathname: path,
        });
        res.send({ redirectUrl: requrl });
    }
}


module.exports = BackendApi;