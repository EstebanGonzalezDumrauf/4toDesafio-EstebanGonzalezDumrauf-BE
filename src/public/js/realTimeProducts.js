const socket = io(); // Conexión al servidor de websockets

socket.on('productCreated', () => {
    // Cuando se crea un nuevo producto, actualiza la lista de productos en la vista
    location.reload();
});

socket.on('productDeleted', () => {
    // Cuando se elimina un producto, actualiza la lista de productos en la vista
    location.reload();
});
