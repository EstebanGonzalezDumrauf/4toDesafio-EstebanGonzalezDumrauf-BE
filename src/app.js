//import express from 'express';
//import ProductManager from '../src/productManager';
const express = require('express');
const handlebars = require('express-handlebars');
//import handlebars from 'express-handlebars';
const __dirName = require('./utils.js');

const cartsRouter = require('./routes/carts.js');
const productsRouter  = require('./routes/products.js');
const viewsRouter = require('./routes/views.js');

const app = express();
app.engine('handlebars', handlebars.engine());
app.set('views', __dirName + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(__dirName + '/public'));
app.use(express.urlencoded({ extended: true }));

//app.use('/api/products', productsRouter);
app.use('/', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter)

// app.get('/', (req, res) => {
//     let producto = {
//         name:'Crema de manos',
//         cantidad:2
//     }

//     res.render('index', producto)
// })


const server = app.listen(8080, () => {
    console.log('Server ON en puerto 8080');
});
