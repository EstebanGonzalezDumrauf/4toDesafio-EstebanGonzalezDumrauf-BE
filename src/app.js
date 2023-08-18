//import express from 'express';
//import ProductManager from '../src/productManager';
const express = require('express');
const handlebars = require('express-handlebars');
//import handlebars from 'express-handlebars';
const __dirName = require('./utils.js');

const cartsRouter = require('./routes/carts.js');
const productsRouter  = require('./routes/products.js');
const viewsRouter = require('./routes/views.js');
const socketIO = require('socket.io');

const app = express();
app.engine('handlebars', handlebars.engine());
app.set('views', __dirName + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(__dirName + '/public'));
app.use(express.urlencoded({ extended: true }));

//esto funciona
app.use('/api/products', productsRouter);

//app.use('/', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const http = require('http');
const server = http.createServer(app);
const socketServer = socketIO(server);
app.set('socketServer', socketServer); 

socketServer.on('connection', socket =>{
    console.log('Nuevo Cliente conectado');

    socket.on('createProduct', () => {
        // Cuando se crea un nuevo producto, emite un evento a todos los clientes
        socketServer.emit('productCreated');
    });

    socket.on('deleteProduct', () => {
        // Cuando se elimina un producto, emite un evento a todos los clientes
        socketServer.emit('productDeleted');
    });

})

server.listen(8080, () => {
    console.log('Server ON en puerto 8080');
});

