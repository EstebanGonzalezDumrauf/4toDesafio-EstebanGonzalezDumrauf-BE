//import express from 'express';
//import ProductManager from '../src/productManager';
const express = require('express');
const ProductManager = require('./productManager'); // Importamos la clase desde el archivo productManager.js

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = 'BD.json' // Debes proporcionar la ruta correcta donde se guardará el archivo JSON

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
    //res.send('<h1> SERVIDOR DE PRODUCTOS </h1>' + test.title);

    //manejadorDeProductos.addProduct("Producto Prueba", "Este es un producto de prueba", 200, true, "sin imagen", "abc122", 25);
    manejadorDeProductos.addProduct(producto.title, producto.description, producto.price, producto.status, producto.thumbnail, producto.code, producto.stock);

    return res.send({status: 'success', message:'Producto Creado correctamente'});
});

app.get('/api/products/:id', async (req, res) => {
    const manejadorDeProductos = new ProductManager(path); 
    let idProdu = +req.params.id;
    let productByID = await manejadorDeProductos.getProductById(idProdu); // Usa await porque la función getProducts es asíncrona

    res.send(productByID);
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