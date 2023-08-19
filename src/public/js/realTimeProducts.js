const socket = io(); // Conexión al servidor de websockets

socket.emit('aviso', 'Me enteré de la modificacion');

socket.on('changes', () => {
    // Cuando se elimina un producto, actualiza la lista de productos en la vista
    console.log('Evento productDeleted capturado');
    //console.log(data);
    location.reload();
});
