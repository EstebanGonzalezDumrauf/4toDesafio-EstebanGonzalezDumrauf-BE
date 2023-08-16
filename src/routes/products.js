const { Router } = require('express');
const ProductManager = require('../productManager'); 
const router = Router();

const path = 'productos.json' // Debes proporcionar la ruta correcta donde se guardará el archivo JSON


// router.get('/', async (req, res) => {
//     const manejadorDeProductos = new ProductManager(path); 
//     let listadoProductos = [];

//     let cantidadLimite = +req.query.limit;

//     if (!cantidadLimite) {
//         let products = await manejadorDeProductos.getProducts(); 
//         res.send(products);
//         return;
//     }

//     listadoProductos = await manejadorDeProductos.getProducts(); 

//     res.send(listadoProductos.slice(0,cantidadLimite));
// });

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

router.post('/', async (req, res) => {
    const manejadorDeProductos = new ProductManager(path); 

    let producto = req.body;
    let statusInsert;
    
    statusInsert = await manejadorDeProductos.addProduct(producto.title, producto.description, producto.price, producto.status, producto.thumbnail, producto.code, producto.stock);

    if (statusInsert == -1){
        return res.status(400).send({status: 'error', error: 'Se produjo un error al crear el producto'})
    }
    return res.send({status: 'success', message:'Producto Creado correctamente'});
});


router.put('/:id', async (req, res) => {
    const manejadorDeProductos = new ProductManager(path); 
    const productID = req.params.id;
    let producto = req.body;
    let statusUpdate;
    
    statusUpdate = await manejadorDeProductos.updateProduct(productID, producto.title, producto.description, producto.price, producto.status, producto.thumbnail, producto.code, producto.stock);

    if (statusUpdate == -1){
        return res.status(400).send({status: 'error', error: 'Se produjo un error al modificar el producto'})
    } 
    
    if (statusUpdate == -2) {
        return res.status(400).send({status: 'error', error: 'No existe un producto con ese ID'})
    }

    return res.send({status: 'success', message:'Producto Modificado correctamente'});
});


router.get('/:id', async (req, res) => {
    const manejadorDeProductos = new ProductManager(path); 
    let idProdu = +req.params.id;
    let productByID = await manejadorDeProductos.getProductById(idProdu); // Usa await porque la función getProducts es asíncrona

    res.send(productByID);
});


router.delete('/:id', async (req, res) => {
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


module.exports = router;
//export default router;