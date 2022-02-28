//////  Importaciones
const express = require ('express')
const { Server: HttpServer } = require('http')
const { Server: socket } = require('socket.io')
const contenedorSQL = requirte('./contenedor.js')
const config = require('./config.js')

///-----------   Instancias
const app=express()
const HttpServer = new HttpServer(app)
const io = new socket(HttpServer)
const productosApi = contenedorSQL(config.mariaDb,'productos')
const mensajesApi = new contenedorSQL(config.sqlite3,'mensajes')

/// -----------   Configuracion de mensajes  ---------
io.on('connection', async socket => {
    console.log('Cliente nuevo conectado');
     /// Muestra inicial de productos
    socket.emit('productos',await productosApi.listarAll());
   /// Muestra incicial de mensajes
    socket.emit('mensajes',await mensajesApi.listarAll());
    // Actualiza Productos
    socket.on('update', async producto => {
        await productosApi.guardar(producto)   
        io.sockets.emit('productos',await productosApi.listarAll()); 
    })
    /// Actuazliza Mensanes
    socket.on('nuevomensaje', async mensaje => {
        mensaje.fyh=new Date().toLocaleString()
        await mensajesApi.guardar(mensaje) 
        io.sockets.emit('mensajes',await mensajesApi.listarAll());
    })
});

//---- Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(exress.static('public'))

/* ---------------------- Servidor ----------------------*/
const PORT = 8080;
const server = httpServer.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});
