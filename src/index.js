// importamos las librerías requeridas
const path = require("path");
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


global.io = io;


io.on('connection', (socket) => {
    console.log('nuevo usuario conectado');
});



// Especificamos el puerto en una varibale port, incorporamos cors, express 
// y la ruta a los archivo estáticos (la carpeta public)
app.set("port", 3000);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "./public")));


// define a root route
// Indica el directorio donde se encuentran los archivos de las vistas ('views')
app.set('views', path.join(__dirname, './public/views'))


// Indica el motor de plantilla que se utiliza, en este ejemplo se utiliza 'pug'
app.set('view engine', 'pug');

app.get("/", (req, res) => {
    res.render("index");
});


// Require employee routes
const userControl = require('./routes/usuario.routes')
const controlControl = require('./routes/control.routes')
// using as middleware
app.use('/app', userControl)
app.use('/app', controlControl)



// Iniciamos el servidor en el puerto establecido por la variable port (3000)
server.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto: ' + app.get('port'));
})
