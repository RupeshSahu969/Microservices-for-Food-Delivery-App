const { ProductRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require('../utils/app-errors');

// All Business logic will be here
class ProductService {

    constructor(){
        this.repository = new ProductRepository();
    }

    async CreateProduct(productInputs){
        try {
            const productResult = await this.repository.CreateProduct(productInputs);
            return FormateData(productResult);
        } catch (err) {
            throw new APIError('Failed to create product', err);
        }
    }
    
    async GetProducts(){
        try {
            const products = await this.repository.Products();
            let categories = {};
    
            products.forEach(({ type }) => {
                categories[type] = type;
            });
            
            return FormateData({
                products,
                categories: Object.keys(categories),
            });

        } catch (err) {
            throw new APIError('Failed to fetch products', err);
        }
    }

    async GetProductDescription(productId){
        try {
            const product = await this.repository.FindById(productId);
            if (!product) throw new APIError('Product not found');
            return FormateData(product);
        } catch (err) {
            throw new APIError('Failed to fetch product description', err);
        }
    }

    async GetProductsByCategory(category){
        try {
            const products = await this.repository.FindByCategory(category);
            return FormateData(products);
        } catch (err) {
            throw new APIError('Failed to fetch products by category', err);
        }
    }

    async GetSelectedProducts(selectedIds){
        try {
            const products = await this.repository.FindSelectedProducts(selectedIds);
            return FormateData(products);
        } catch (err) {
            throw new APIError('Failed to fetch selected products', err);
        }
    }

    async GetProductById(productId){
        try {
            const product = await this.repository.FindById(productId);
            if (!product) throw new APIError('Product not found');
            return product;
        } catch (err) {
            throw new APIError('Failed to fetch product by ID', err);
        }
    }

       async GetProductPayload(userId,{ productId, qty },event){

         const product = await this.repository.FindById(productId);

        if(product){
             const payload = { 
                event: event,
                data: { userId, product, qty}
            };
 
             return FormateData(payload)
        }else{
            return FormateData({error: 'No product Available'});
        }

    }
}

module.exports = ProductService;
