const express = require('express');
const ProductManager = require('./productManager'); // Importamos la clase desde el archivo productManager.js

const app = express();
const path = 'BD.json' // Debes proporcionar la ruta correcta donde se guardará el archivo JSON

app.get('/', (req, res) => {
    res.send('<h1> SERVIDOR DE PRODUCTOS </h1>');
});

app.get('/products', async (req, res) => {
    const manejadorDeProductos = new ProductManager(path); 
    let products = await manejadorDeProductos.getProducts(); 

    res.send(products);
});

app.get('/products/:id', async (req, res) => {
    const manejadorDeProductos = new ProductManager(path); 
    let idProdu = parseInt(req.params.id);
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