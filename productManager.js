const { log } = require('console');
const fs = require('fs');

class ProductManager {

    constructor(path) {
        this.products = [];
        this.path = path;
        //this.products = this.productosAlmacenados();
    };

    productosAlmacenados = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                if (data.length === 0) {
                    return [];
                } else {
                    const listadoProductos = JSON.parse(data);
                    //console.log(listadoProductos);
                    return listadoProductos;
                }
            } else {
                // Si el archivo no existe, retornar un array vacío o null
                return [];
            }
        } catch (error) {
            console.error('Error al leer el archivo:', error.message);
            // En caso de error, puedes retornar un array vacío o null
            return [];
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const producto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        const valorrecuperado = await this.productosAlmacenados();
        console.log(valorrecuperado);

        if (valorrecuperado.length === 0) {
            producto.id = 1;
        } else {
            producto.id = valorrecuperado[valorrecuperado.length - 1].id + 1;
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

        const codeIndex = valorrecuperado.findIndex(e => e.code === code);
        if (codeIndex !== -1) {
            console.error("Codigo Ya existente");
            return;
        }

        valorrecuperado.push(producto);
        await fs.promises.writeFile(this.path, JSON.stringify(valorrecuperado))
    };


    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                if (data.length === 0) {
                    return [];
                } else {
                    const listadoProductos = JSON.parse(data);
                    //console.log(listadoProductos);
                    return listadoProductos;
                }
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
        let listadoProductosID = [];
        try {
            if (fs.existsSync(this.path)) {
                const byIDdata = await fs.promises.readFile(this.path, 'utf-8');
                listadoProductosID = JSON.parse(byIDdata);
            }
        } catch (error) {
            console.error('Error al leer el archivo:', error.message);
            // En caso de error, puedes retornar un array vacío o null
            return [];
        }
        const codeIndex = listadoProductosID.findIndex(e => e.id === id);
        if (codeIndex === -1) {
            return ("Producto con ID:" + id + " not Found");
            //return [];
        } else {
            return listadoProductosID[codeIndex];
        }
    };


    updateProduct = async (id, newTitle, newDescription, newPrice, newThumbnail, newCode, newStock) => {
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
        //console.log(codeIndex);
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
            if (newCode !== '') {
                const codeExisIndex = listadoProductos.findIndex(ex => ex.code === newCode);
                if (codeExisIndex !== -1) {
                    console.error("Codigo Ya existente");
                    return;
                }
                listadoProductos[codeIndex].code = newCode;
            }
            if (newStock !== '') {
                listadoProductos[codeIndex].stock = newStock;
            }
            //console.log(listadoProductos);
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
                //console.log(listadoProductos);
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
            //console.log(listadoProductos);
            await fs.promises.writeFile(this.path, JSON.stringify(listadoProductos))
        }
        return;
    }
}

module.exports = ProductManager;