const { log } = require('console');
const fs = require('fs');

class ProductManager {

    #path = "";

    constructor() {
        this.products = [];
        this.path = "BD.json";
    };



    addProduct = async (title, description, price, thumbnail, code, stock) => {
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

        const codeIndex = this.products.findIndex(e => e.code === code);
        if (codeIndex !== -1) {
            console.error("Codigo Ya existente");
            return;
        }

        this.products.push(producto);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    };


    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const listadoProductos = JSON.parse(data);
                //console.log(listadoProductos);
                return listadoProductos;
            } else {
                // Si el archivo no existe, retornar un array vacío o null
                return [];
            }
        } catch (error) {
            console.error('Error al leer el archivo:', error.message);
            // En caso de error, puedes retornar un array vacío o null
            return [];
        }
    };

    getProductById = async (id) => {
        let listadoProductos = [];
        try {
            if (fs.existsSync(this.path)) {
                const byIDdata = await fs.promises.readFile(this.path, 'utf-8');
                listadoProductos = JSON.parse(byIDdata);
                //console.log(listadoProductos);
            }
        } catch (error) {
            console.error('Error al leer el archivo:', error.message);
            // En caso de error, puedes retornar un array vacío o null
            return [];
        }
        const codeIndex = listadoProductos.findIndex(e => e.id === id);
        console.log(codeIndex);
        if (codeIndex === -1) {
            console.error("Producto con ID:" + id + " not Found");
        } else {
            console.log (listadoProductos[codeIndex]);
            return listadoProductos[codeIndex];
        }
    };


    updateProduct = async (id, newTitle, newDescription, newPrice, newThumbnail, newStock) => {
        let listadoProductos = [];
        try {
            if (fs.existsSync(this.path)) {
                const byIDdata = await fs.promises.readFile(this.path, 'utf-8');
                listadoProductos = JSON.parse(byIDdata);
                console.log(listadoProductos);
            }
        } catch (error) {
            console.error('Error al leer el archivo:', error.message);
            // En caso de error, puedes retornar un array vacío o null
            return [];
        }

        const codeIndex = listadoProductos.findIndex(e => e.id === id);
        console.log(codeIndex);
        if (codeIndex === -1) {
            console.error("Producto con ID:" + id + " not Found");
        } else {
            if (newTitle !== '') {
                listadoProductos[codeIndex].title = newTitle;
            }
            if (newDescription !== '') {
                listadoProductos[codeIndex].description = newDescription;
            }
            if (newPrice !== '') {
                listadoProductos[codeIndex].price = newPrice;
            }
            if (newThumbnail !== '') {
                listadoProductos[codeIndex].thumbnail = newThumbnail;
            }
            // if (newCode !== ''){
            //     this.products[id].code = newCode;
            // }
            if (newStock !== '') {
                listadoProductos[codeIndex].stock = newStock;
            }
            console.log(listadoProductos);
            await fs.promises.writeFile(this.path, JSON.stringify(listadoProductos))
        }
        return;
    }

    deleteProduct = async (id) => {
        let listadoProductos = [];
        try {
            if (fs.existsSync(this.path)) {
                const byIDdata = await fs.promises.readFile(this.path, 'utf-8');
                listadoProductos = JSON.parse(byIDdata);
                console.log(listadoProductos);
            }
        } catch (error) {
            console.error('Error al leer el archivo:', error.message);
            // En caso de error, puedes retornar un array vacío o null
            return [];
        }

        const codeIndexDelete = listadoProductos.findIndex(e => e.id === id);
        if (codeIndexDelete === -1) {
            console.error("Producto con ID:" + id + " not Found");
        } else {
            listadoProductos.splice(codeIndexDelete, 1);
            console.log(listadoProductos);
            await fs.promises.writeFile(this.path, JSON.stringify(listadoProductos))
        }
        return;
    }
}

//Se creará una instancia de la clase “ProductManager”
const manejadorDeProductos = new ProductManager();

//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
//console.log(manejadorDeProductos.getProducts());

// // //Se cargan 3 productos correctamente
// manejadorDeProductos.addProduct("Jabon Natura", "Jabon para cuerpo y manos", 125, "/img/limpieza/jabon01.jpg", "AB-100", 50);
// manejadorDeProductos.addProduct("Shampoo Clear", "Shampoo anticaspa", 740, "/img/cuidado/shampoo01.jpg", "SH-200", 20);
// manejadorDeProductos.addProduct("Colgate Triple Accion", "Pasta dental", 600, "/img/cuidado/shampoo01.jpg", "SH-201", 100);

// //Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
// manejadorDeProductos.addProduct("Colgate Triple Accion", "Pasta dental", 600, "/img/cuidado/shampoo01.jpg", "SH-201", 100);

// //Se llamará al método “addProduct” con uno de los campos vacíos, debe arrojar un error.
// manejadorDeProductos.addProduct("Equate Enjuague bucal", "", 510, "/img/cuidado/foto12.jpg", "EN-602", 15);

//Muestra los 3 productos agregados
//console.log(manejadorDeProductos.getProducts());

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

