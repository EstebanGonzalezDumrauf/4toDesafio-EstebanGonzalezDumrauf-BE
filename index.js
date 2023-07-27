const ManagerProductos = require("./productManager");

async function main() {
    try {
        //Se creará una instancia de la clase “ProductManager”
        const manejadorDeProductos = new ManagerProductos();

        // //Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
        // let products = await manejadorDeProductos.getProducts();
        // console.log(products);

        // //Se llamará al método “addProduct” cargandose 3 productos correctamente
        // manejadorDeProductos.addProduct("Jabon Natura", "Jabon para cuerpo y manos", 125, "/img/limpieza/jabon01.jpg", "AB-100", 50);
        // manejadorDeProductos.addProduct("Shampoo Clear", "Shampoo anticaspa", 740, "/img/cuidado/shampoo01.jpg", "SH-200", 20);
        // manejadorDeProductos.addProduct("Colgate Triple Accion", "Pasta dental", 600, "/img/cuidado/shampoo01.jpg", "SH-201", 100);

        // //Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
        // manejadorDeProductos.addProduct("Colgate Triple Accion", "Pasta dental", 600, "/img/cuidado/shampoo01.jpg", "SH-201", 100);

        // //Se llamará al método “addProduct” con uno de los campos vacíos, debe arrojar un error.
        // manejadorDeProductos.addProduct("Equate Enjuague bucal", "", 510, "/img/cuidado/foto12.jpg", "EN-602", 15);

        // //Se llamará al metodo "getProducts()" debiendo aparecer los productos agregados
        // products = await manejadorDeProductos.getProducts();
        // console.log(products);

        // //Se llamará al método “addProduct” con un elemento mas.
        // manejadorDeProductos.addProduct("Equate Enjuague bucal", "Enjuague Bucal Sabor Menta", 510, "/img/cuidado/foto12.jpg", "EN-602", 15);

        //Se llamará al metodo "getProductById" devuelva el producto en caso de encontrarlo
        let productoSelected = await manejadorDeProductos.getProductById(2);
        console.log(productoSelected);

        // En caso que no exista debe devolver un error
        productoSelected = await manejadorDeProductos.getProductById(20);
        console.log(productoSelected);

    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();

// Se creará una instancia de la clase “ProductManager”
// const manejadorDeProductos = new ManagerProductos();

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []

// const products = await manejadorDeProductos.getProducts();
// console.log(products);
// console.log(manejadorDeProductos.getProducts());

// //Se cargan 3 productos correctamente
// manejadorDeProductos.addProduct("Jabon Natura", "Jabon para cuerpo y manos", 125, "/img/limpieza/jabon01.jpg", "AB-100", 50);
// manejadorDeProductos.addProduct("Shampoo Clear", "Shampoo anticaspa", 740, "/img/cuidado/shampoo01.jpg", "SH-200", 20);
// manejadorDeProductos.addProduct("Colgate Triple Accion", "Pasta dental", 600, "/img/cuidado/shampoo01.jpg", "SH-201", 100);

// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
// manejadorDeProductos.addProduct("Colgate Triple Accion", "Pasta dental", 600, "/img/cuidado/shampoo01.jpg", "SH-201", 100);

// Se llamará al método “addProduct” con uno de los campos vacíos, debe arrojar un error.
// manejadorDeProductos.addProduct("Equate Enjuague bucal", "", 510, "/img/cuidado/foto12.jpg", "EN-602", 15);

// Muestra los 3 productos agregados
// products = await manejadorDeProductos.getProducts();
// console.log(products);
// console.log(manejadorDeProductos.getProducts());

// //Se evaluará que getProductById devuelva el producto en caso de encontrarlo
//console.log(manejadorDeProductos.getProductById(2)); 

// //Se evaluará que getProductById devuelva error si no encuentra el producto
// manejadorDeProductos.getProductById(11);

// // manejadorDeProductos.deleteProduct(2);
// // //Muestra los 3 productos agregados
// // console.log(manejadorDeProductos.getProducts());

//manejadorDeProductos.updateProduct(2,'', 'Shampoo Anticaspa Hombre', 750, '', 15)
// manejadorDeProductos.getProductById(2);

//manejadorDeProductos.deleteProduct(2);