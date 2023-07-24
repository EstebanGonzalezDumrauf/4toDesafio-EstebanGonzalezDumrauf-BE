class ProductManager {

    constructor() {
        this.products = [];
    };

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const producto = {
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock
        }

        if (this.products.length === 0) {
            producto.id = 1;
        } else {
            producto.id = this.products[this.products.length - 1].id + 1;
        }

        if (title === "") {
            console.error("Error. El campo titulo no tiene informacion.");
            return;
        }

        if (description === "") {
            console.error("Error. El campo descripción no tiene informacion.");
            return;
        }

        if (price === "") {
            console.error("Error. El campo precio no tiene informacion.");
            return;
        }

        if (thumbnail === "") {
            console.error("Error. El campo ruta de la Imagen no tiene informacion.");
            return;
        }

        if (stock === "") {
            console.error("Error. El campo Stock no tiene informacion.");
            return;
        }

        const codeIndex = this.products.findIndex(e=>e.code === code);
        if (codeIndex !== -1) {
            console.error("Codigo Ya existente");
            return;
        }

        this.products.push(producto);
    };

    getProducts = () => {
        return this.products;
    };

    getProductById = (id) => {
        const codeIndex = this.products.findIndex(e=>e.id === id);
        if (codeIndex === -1) {
            console.error("Producto con ID:" + id + " not Found");
        } else {
            console.log(this.products[codeIndex]);        
        }
        return;
    };
}

//Se creará una instancia de la clase “ProductManager”
const manejadorDeProductos = new ProductManager();

//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(manejadorDeProductos.getProducts());

//Se cargan 3 productos correctamente
manejadorDeProductos.addProduct("Jabon Natura", "Jabon para cuerpo y manos", 125, "/img/limpieza/jabon01.jpg", "AB-100", 50);
manejadorDeProductos.addProduct("Shampoo Clear", "Shampoo anticaspa", 740, "/img/cuidado/shampoo01.jpg", "SH-200", 20);
manejadorDeProductos.addProduct("Colgate Triple Accion", "Pasta dental", 600, "/img/cuidado/shampoo01.jpg", "SH-201", 100);

//Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
manejadorDeProductos.addProduct("Colgate Triple Accion", "Pasta dental", 600, "/img/cuidado/shampoo01.jpg", "SH-201", 100);

//Se llamará al método “addProduct” con uno de los campos vacíos, debe arrojar un error.
manejadorDeProductos.addProduct("Equate Enjuague bucal", "", 510, "/img/cuidado/foto12.jpg", "EN-602", 15);

//Muestra los 3 productos agregados
console.log(manejadorDeProductos.getProducts());

//Se evaluará que getProductById devuelva el producto en caso de encontrarlo
manejadorDeProductos.getProductById(2);

//Se evaluará que getProductById devuelva error si no encuentra el producto
manejadorDeProductos.getProductById(11);

