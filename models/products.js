const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'product.json');

const getProductFromFile = cb => {
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

module.exports = class Product {
    constructor(id, title, description, price) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
    }

    async getProductById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const products = await getProductFromFile();
                const product = products.find(product => product.id === id);
                if (!product) {
                    reject('No Product found');
                }
                else {
                    resolve(product);
                }
            }
            catch (error) {
                console.log(error)
            }
        })
    }
}
