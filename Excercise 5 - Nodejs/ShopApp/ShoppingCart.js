class ShoppingCart{
    constructor(){
        this.games = [];
    }

    addGame(game){
        this.games.push(game);
    }

    removeGame(gameId){
        let newGamesCart = []
        for(let i = 0; i<this.games.length; i++){
            if(this.games[i].Id != gameId){
                newGamesCart.push(this.games[i]);
            }
        }
        this.games = newGamesCart;
    
    }

    cleanShoppingCart(){
        this.games = [];
    }
}


module.exports = ShoppingCart