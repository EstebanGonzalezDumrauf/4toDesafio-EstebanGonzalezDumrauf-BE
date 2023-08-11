const {
    Router
} = require('express');
// const express = require('express');
const CartManager = require('../cartManager');

const router = Router();

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
const pathcarrito = 'carrito.json' // Debes proporcionar la ruta correcta donde se guardará el archivo JSON

function convertirArreglo(arreglo) {
    const resultado = [];

    // Crear un objeto para contar la cantidad de veces que aparece cada valor
    const contador = {};

    // Contar la cantidad de veces que aparece cada valor en el arreglo
    for (const valor of arreglo) {
        if (contador[valor]) {
            contador[valor]++;
        } else {
            contador[valor] = 1;
        }
    }

    // Crear objetos en el formato {valor, cantidad} y agregarlos al resultado
    for (const valor in contador) {
        resultado.push({
            product: parseInt(valor),
            quantity: contador[valor]
        });
    }

    return resultado;
}






router.post('/', async (req, res) => {
    const manejadorCarrito = new CartManager(pathcarrito);

    let carrito = [];

    carrito = req.body.products;
    //carrito.quantity = 1;

    //const arregloOriginal = [1, 2, 4];

    const nuevoArreglo = convertirArreglo(carrito);
    
    //console.log(nuevoArreglo);



    let statusInsert;

    statusInsert = await manejadorCarrito.addCart(nuevoArreglo);

    if (statusInsert == -1) {
        return res.status(400).send({
            status: 'error',
            error: 'Se produjo un error al crear el carrito de compras'
        })
    }
    return res.send({
        status: 'success',
        message: 'Carrito Creado correctamente'
    });
});


router.get('/:cid', async (req, res) => {
    const manejadorCarrito = new CartManager(pathcarrito);
    let cidCart = +req.params.cid;
    let cartByCID = await manejadorCarrito.getCartByCId(cidCart); // Usa await porque la función getProducts es asíncrona

    if (cartByCID === -2) {
        return res.status(400).send({
            status: 'error',
            error: 'El CID no corresponde a un carrito válido'
        })

    }

    if (cartByCID === -1) {
        return res.status(400).send({
            status: 'error',
            error: 'Se produjo un error al obtener el carrito'
        })
    }

    res.send(cartByCID);
});


router.post('/:cid/product/:pid', async (req, res) => {
    const manejadorCarrito = new CartManager(pathcarrito);

    let idProdu = +req.params.pid;
    let idCart = +req.params.cid;
    let quantity = 1;
    let statusInsert;

    statusInsert = await manejadorCarrito.addProductToCart(idCart, idProdu, quantity);

    if (statusInsert == -1) {
        return res.status(400).send({
            status: 'error',
            error: 'Se produjo un error al crear el carrito de compras'
        })
    }

    if (statusInsert == -2) {
        return res.status(400).send({
            status: 'error',
            error: 'No existe un carrito con ese cid'
        })
    }

    return res.send({
        status: 'success',
        message: 'Carrito cargado correctamente con el nuevo producto'
    });
});


module.exports = router;