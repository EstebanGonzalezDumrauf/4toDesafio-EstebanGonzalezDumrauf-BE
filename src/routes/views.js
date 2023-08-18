const { Router } = require('express');
const ProductManager = require('../productManager'); 
const router = Router();

const path = 'productos.json' // Debes proporcionar la ruta correcta donde se guardará el archivo JSON

router.get('/', async (req, res) => {
    const manejadorDeProductos = new ProductManager(path); 
    let listadoProductos = [];

    let cantidadLimite = +req.query.limit;

    if (!cantidadLimite) {
        let products = await manejadorDeProductos.getProducts(); 
        res.render('index', {productos: products});
        return;
    }

    listadoProductos = await manejadorDeProductos.getProducts(); 

    res.render('index', {productos: listadoProductos.slice(0,cantidadLimite)})
});


router.get('/realtimeproducts', async (req, res) => {

    const manejadorDeProductos = new ProductManager(path); 
    let listadoProductos = [];

    let cantidadLimite = +req.query.limit;

    if (!cantidadLimite) {
        let products = await manejadorDeProductos.getProducts(); 
        res.render('realTimeProducts', {productos: products});
        return;
    }

    listadoProductos = await manejadorDeProductos.getProducts(); 

    res.render('realTimeProducts', {productos: listadoProductos.slice(0,cantidadLimite)})


    // const manejadorDeProductos = new ProductManager(path);
    // const products = await manejadorDeProductos.getProducts();

    // res.render('realTimeProducts', { productos: products });
});


module.exports = router;