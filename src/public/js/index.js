const socket = io();
socket.emit('message', 'Hola, campeón');

socket.on('eventoParaSocketIndividual', data =>{
    console.log(data);
})

socket.on('eventoParatodosMenosElSocketActual', data =>{
    console.log(data);
})

socket.on('eventoParaTodos', data =>{
    console.log(data);
})