const { log } = require('console');
const fs = require('fs');

class cartManager {

    constructor(path) {
        this.carts = [];
        this.path = path;
    };

    carritosAlmacenados = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                if (data.length === 0) {
                    return [];
                } else {
                    const listadoCarritos = JSON.parse(data);
                    return listadoCarritos;
                }
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error al leer el archivo:', error.message);
            return []; // En caso de error, puedes retornar un array vacío o null
        }
    }

    addCart = async (arrayCart) => {
        const carrito = {
            arrayCart
        }

        const valorrecuperado = await this.carritosAlmacenados();
        //console.log(valorrecuperado);

        if (valorrecuperado.length === 0) {
            carrito.id = 1;
        } else {
            carrito.id = valorrecuperado[valorrecuperado.length - 1].id + 1;
        }

        if (arrayCart === "" || arrayCart === undefined) {
            console.error("Error. El campo Stock no tiene informacion.");
            return -1;
        }

        valorrecuperado.push(carrito);
        await fs.promises.writeFile(this.path, JSON.stringify(valorrecuperado))
    };

}

module.exports = cartManager;