const fs = require('fs');
const path = require('path');
const Product = require('./products');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'categories.json');

const getCategoryFromFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(p, (err, content) => {
            if (err) {
                reject([])
            }
            else {
                resolve(JSON.parse(content));
            }
        })
    })
}

module.exports = class Category {
    constructor(id, type, products) {
        this.id = id;
        this.type = type;
        this.products = products;
    }

    getAllCategories() {
        return new Promise(async (resolve, reject) => {
            try {
                const categories = await getCategoryFromFile();
                if (!categories) {
                    reject([]);
                }
                else {
                    resolve(categories);
                }
            }
            catch (error) {
                console.log(error)
            }
        })
    }

    async getProductsByCategory(categoryId) {
        const categories = await getCategoryFromFile();
        return new Promise(async (resolve, reject) => {
            try {
                if (!categories) {
                    reject('No Categories present')
                }
                else {
                    const category = categories.find(cat => cat.id === parseInt(categoryId));
                    if (!category) {
                        reject('Category Invalid with id=' + categoryId);
                    }
                    else {
                        let product = new Product();
                        let products = category.products;
                        let pArray = [];
                        pArray = products.map(async prId => {
                            return await product.getProductById(prId);
                        });
                        const allProducts = await Promise.all(pArray);
                        resolve(allProducts);
                    }
                }

            }
            catch (error) {
                console.log(error)
            }
        })
    }
}