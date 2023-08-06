//import express from 'express';
//import ProductManager from '../src/productManager';
const express = require('express');
const ProductManager = require('./productManager'); // Importamos la clase desde el archivo productManager.js
const CartManager = require('./cartManager'); // Importamos la clase desde el archivo productManager.js

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = 'productos.json' // Debes proporcionar la ruta correcta donde se guardará el archivo JSON
const pathcarrito = 'carrito.json' // Debes proporcionar la ruta correcta donde se guardará el archivo JSON

app.get('/', (req, res) => {
    res.send('<h1> SERVIDOR DE PRODUCTOS </h1>');
});

app.get('/api/products', async (req, res) => {
    const manejadorDeProductos = new ProductManager(path); 
    let listadoProductos = [];

    let cantidadLimite = +req.query.limit;

    if (!cantidadLimite) {
        let products = await manejadorDeProductos.getProducts(); 
        res.send(products);
        return;
    }

    listadoProductos = await manejadorDeProductos.getProducts(); 

    res.send(listadoProductos.slice(0,cantidadLimite));
});

app.post('/api/products', async (req, res) => {
    const manejadorDeProductos = new ProductManager(path); 

    let producto = req.body;
    let statusInsert;
    
    statusInsert = await manejadorDeProductos.addProduct(producto.title, producto.description, producto.price, producto.status, producto.thumbnail, producto.code, producto.stock);

    //res.send('<h1> SERVIDOR DE PRODUCTOS </h1>' + statusInsert);
    if (statusInsert == -1){
        return res.status(400).send({status: 'error', error: 'Se produjo un error al crear el producto'})
    }
    return res.send({status: 'success', message:'Producto Creado correctamente'});
});

app.put('/api/products/:id', async (req, res) => {
    const manejadorDeProductos = new ProductManager(path); 
    const productID = req.params.id;
    let producto = req.body;
    let statusUpdate;

    //res.send('<h1> SERVIDOR DE PRODUCTOS </h1>' + productID);
    
    statusUpdate = await manejadorDeProductos.updateProduct(productID, producto.title, producto.description, producto.price, producto.status, producto.thumbnail, producto.code, producto.stock);

    //res.send('<h1> SERVIDOR DE PRODUCTOS </h1>' + statusInsert);
    if (statusUpdate == -1){
        return res.status(400).send({status: 'error', error: 'Se produjo un error al modificar el producto'})
    } 
    
    if (statusUpdate == -2) {
        return res.status(400).send({status: 'error', error: 'No existe un producto con ese ID'})
    }

    return res.send({status: 'success', message:'Producto Modificado correctamente'});
});

app.get('/api/products/:id', async (req, res) => {
    const manejadorDeProductos = new ProductManager(path); 
    let idProdu = +req.params.id;
    let productByID = await manejadorDeProductos.getProductById(idProdu); // Usa await porque la función getProducts es asíncrona

    res.send(productByID);
});


app.delete('/api/products/:id', async (req, res) => {
    const manejadorDeProductos = new ProductManager(path); 
    let idProdu = +req.params.id;
    let DelproductByID = await manejadorDeProductos.deleteProduct(idProdu); // Usa await porque la función getProducts es asíncrona

    if (DelproductByID === -2) {
        return res.status(400).send({status: 'error', error: 'Se produjo un error al modificar el producto'})
    }

    if (DelproductByID === -1) {
        return res.status(400).send({status: 'error', error: 'El ID no corresponde a un producto válido'})
    }

    return res.send({status: 'success', message:'Producto Eliminado correctamente'});
});

// *********************************************** CARRITOOOOOOOOOOOOOO **************************************
// ***********************************************************************************************************

app.post('/api/carts', async (req, res) => {
    const manejadorCarrito = new CartManager(pathcarrito); 

    let carrito = req.body;
    let statusInsert;
    
    statusInsert = await manejadorCarrito.addCart(carrito.arrayCart);

    //res.send('<h1> SERVIDOR DE PRODUCTOS </h1>' + statusInsert);
    if (statusInsert == -1){
        return res.status(400).send({status: 'error', error: 'Se produjo un error al crear el carrito de compras'})
    }
    return res.send({status: 'success', message:'Carrito Creado correctamente'});
});

app.listen(8080, () => {
    console.log('Server Operativo en puerto 8080');
});







// import express from 'express';
// import manager from './productManager';

// const app = express();
// //const produ = manager();

// app.get('/', (req, res) => {
//     res.send('<h1> SERVIDOR DE PRODUCTOS </h1>');
// })

// app.get('/products', (req, res) => {

//     const manejadorDeProductos = new manejadorDeProductos(path); //ManagerProductos(path);
//     let products = manejadorDeProductos.getProducts();

//     res.send(products);

// })

// app.listen(8080, ()=> {
//     console.log('Server Operativo en puerto 8080');
// });