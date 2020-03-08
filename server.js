const path = require('path');
const express = require('express');
const app = express();
const Category = require('./models/categories');

app.set('view engine', 'ejs');
app.set('views', 'public')

app.use(express.static(path.join(__dirname, 'public')));

app.use('/:id?', async (req, res, next) => {
    let categories = new Category();
    const id = (!req.params.id || req.params.id === 'favicon.ico') ? 1 : req.params.id;
    try {

        const allCategories = await categories.getAllCategories();
        const products = await categories.getProductsByCategory(id);
        res.render('index', {
            categories: allCategories,
            products
        });
    }
    catch (error) {
        console.log(error)
    }
})

app.listen(5000, () => {
    console.log('Server listening on port 5000');
})