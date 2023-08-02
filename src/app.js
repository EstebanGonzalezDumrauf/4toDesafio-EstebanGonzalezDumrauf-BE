import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Servidor funcional');
})

app.get('/products', (req, res) => {
    res.send('Listado de Productos');
})