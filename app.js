const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const ip = '54.167.194.202';
const port = 3000;

// Configuración de middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de conexión a MySQL con un pool
let pool = mysql.createPool({
    host: "practica.c920g66kq4od.us-east-1.rds.amazonaws.com",
    database: "banco_db",
    user: "admin",
    password: "samuel123",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Manejo de la solicitud POST del formulario
app.post('/submit-form', (req, res) => {
    const { numeroCuenta, nombreCliente, saldo, tipoCuenta } = req.body;

    const query = 'INSERT INTO donacion (nombres, apellidos, correo, telefono, seleccion_objetos , comentario) VALUES (?, ?, ?, ?, ?, ?)';
    pool.query(query, [nombres, apellidos, correo, telefono, seleccion_objetos , comentario], (err, result) => {
        if (err) {
            console.error('Error al insertar datos: ' + err.stack);
            return res.status(500).send('Ocurrió un error al procesar tu donacion.');
        }
        // Enviar una respuesta de éxito
        res.status(200).send('donacion registrada exitosamente');
    });
});

// Página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'donacion.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://${ip}:${port}`);
});