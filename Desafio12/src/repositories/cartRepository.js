const CartDao = require('../Dao/cartDao')

class CartRepository {
    constructor() {
        this.Cart = new CartDao()
    }

    async cartCreated() {
        try {
            return await this.Cart.cartCreated()
        } catch (error) {
            console.error('Error cartAdd',error);
        }
    }

    async tiketCreated ( tiket ) {
        try {
            return await this.Cart.tiketCreated( tiket )
        } catch (error) {
            console.error('Error Tiket Created',error);
        }
    }

    async getCarts (){
        try {
            return await this.Cart.getCarts()
        } catch (error) {
            console.error('Error getCarts',error);
        }
    }

    async getCartById ( id ){
        try {
            return await this.Cart.getCartById( id )
        } catch (error) {
            console.error('Error getCartById',error);
        }
    }


}
module.exports = CartRepository
