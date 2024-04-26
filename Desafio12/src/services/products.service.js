const productsRepository = require('../repositories/productsRepository')

const Products = new productsRepository()

const createProd = async ( newProductDTO ) => {
    try {
        return await Products.createdProduct( newProductDTO )
    } catch (error) {
        throw error
    }
}

const productId = async ( id ) => {
    try {
        return await Products.getProductById( id )
    } catch (error) {
        throw error
    }
}

const allProducts = async (req) => {
    try {
        const { page, limit, sort, category, stock } = req.query;
        const options = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 2,
            sort: parseInt(sort) || 0,
            category: parseInt(category) || 0,
            stock: parseInt(stock) || 0,
        };
        const paginateProducts = await Products.getProducts(options);
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = paginateProducts;
        return { docs, hasPrevPage, hasNextPage, nextPage, prevPage };
    } catch (error) {
        throw error;
    }
};

const updateProd = async ( id , updateData ) => {
    try {
        const { id } = req.params
        const { body } = req.body
        const productUpdate = await Products.updateProduct({ _id : id , status : true }, body) 
    } catch (error) {
        throw error
    }
}

const softDelete = async ( id , updateData ) => {
    try {
        const { id } = req.params
        const deleteProduct = await Products.updateProd({ _id : id }, { status : false })
    } catch (error) {
        throw error
    } 
}

const updateStock = async productsInStock => {
    try {
        const result = await productReposity.updateStock(productsInStock) 
        return result
    } catch (error) {
        throw error
      }  
   }

module.exports = {
    createProd,
    productId,
    allProducts,
    updateProd,
    softDelete,
    updateStock
}