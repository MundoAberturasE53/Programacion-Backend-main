const Products = require('../models/products.model')

class ProductsDao{
    async createdProduct( newProductDTO ){
        try{
            return await Products.create( newProductDTO )
        }catch (error){
            console.error(' Error created Product', error)
        }
    }

    async getProducts( options ){
        try {
            const { page , limit , sort , category , stock } = options || {}
            const query = { status : true }
            const filter = {
                $and: [
                    { status: true },
                    category ? { category: { $eq: category } } : { category : { $exists: true } },
                    stock ? { stock: { $eq: stock } } : { stock : { $exists: true }}
                ]
            }
            const result = await Products.paginate(query , { page , limit , lean: true , filter , sort: { fieldToSort: -1 } })
            return result
        } catch (error) {
            console.error(' Error get Products', error)
        }
    }

    async getProductById( id ){
        try {
            return await Products.findOne({ _id : id , status: true })
        } catch (error) {
            console.error(' Error get Product id', error)
        }
    }

    async updateProduct( id , updateData ){
        try {
            return await Products.updateOne({ _id : id }, updateData )
        } catch (error) {
            console.error(' Error update Product', error)
        }
    }

    async updateStock(productsInStock) {
        try {
            // Itera sobre cada producto en productsInStock
            for (const product of productsInStock) {
                // Encuentra el producto por su ID
                const productId = product.product._id
                const quantity = product.quantity
    
                const foundProduct = await getProductById(productId)
    
                if (!foundProduct) {
                    throw new Error(`Producto con ID ${productId} no encontrado`)
                }
    
                // Actualiza el stock restando la cantidad vendida
                foundProduct.stock -= quantity
    
                // Guarda los cambios en la base de datos
                await foundProduct.save()
                console.log(`Stock del producto ${foundProduct.title} actualizado correctamente`)
            }
    
            console.log('Todos los stocks actualizados correctamente')
        } catch (error) {
            console.error('Error al actualizar el stock:', error)
        }
      }

}

module.exports = ProductsDao