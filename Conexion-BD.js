import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const port = 5502;

// Conexión a la base de datos
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tiendita'
});

// Verifico la conexión de la base de datos
conexion.connect(function(error) {
    if (error) {
        throw error;
    } else {
        console.log('Conexion correcta');
    }
});

// Inicia el servidor
app.listen(port, function() {
    console.log(`Server is running on port ${port} http://localhost:${port}`);
});


// Se muestra un mensaje en la página principal
app.get("/", function(req, res) {
    res.send("Bienvenidos a mi API");
});

// Rutas para productos

//GET
app.get("/productos", (req, res) => {
    const query = 'SELECT * FROM productos';
    conexion.query(query, (error, results) => {
        if (error) {
            res.status(500).send("ERROR AL RECIBIR DATOS");
            return;
        }
        res.status(200).json(results);
    });
});


//POST
app.post("/productos", (req, res) => {
    const { id, nombre, precio } = req.body;
    const query = `INSERT INTO productos (id, nombre, precio) VALUES ('${id}', '${nombre}', '${precio}')`;
    conexion.query(query, (error, results) => {
        if (error) {
            res.status(500).json("ERROR AL INSERTAR DATOS");
            return;
        }
        res.status(200).json(`Datos insertados correctamente con el ID ${results.insertId}`);
    });
});

// Rutas para empleados

//GET
app.get("/empleados", (req, res) => {
    const query = 'SELECT * FROM empleados';
    conexion.query(query, (error, results) => {
        if (error) {
            res.status(500).send("ERROR AL RECIBIR DATOS");
            return;
        }
        res.status(200).json(results);
    });
});


//POST
app.post("/empleados", (req, res) => {
    const { id, nombre, puesto } = req.body;
    const query = `INSERT INTO empleados (id, nombre, puesto) VALUES ('${id}', '${nombre}', '${puesto}')`;
    conexion.query(query, (error, results) => {
        if (error) {
            res.status(500).json("ERROR AL INSERTAR DATOS");
            return;
        }
        res.status(200).json(`Datos insertados correctamente con el ID ${results.insertId}`);
    });
});

