// ------------  Configuración inicial
const knex = require('knex')
const config = require('../src/config.js')

// ------------  Productos en MariaDB

try {
    // para traer la configuracion de conexion de MariaDb de config.js
    const mariaDbClient = knex(config.mariaDb)

    mariaDbClient.schema.createTable('productos', table => {
        table.increments('id')
        table.string('title',30).notnullable()
        table.float('price').notNullable()
        table.string('thumbnail',1024)
    })

    mariaDbClient.destroy
    console.log('Tabla de productos creada')

} catch (error) {
    console.log('error al crear tablea Productos')
    console.log(error)
}

// ------------  Mensajes en SQLite3

try {
    // para traer la configuracion de conexion de SQLite3 de config.js
    const sqliteClient = knex(config.sqlite3)

    sqliteClient.schema.createTable('mensajes', table => {
        table.increments('id')
        table.string('autor',30)
        table.string('texto',128)
        table.string('fyh',30)
    })

    mariaDbClient.destroy
    console.log('Tabla de productos mensajes')

} catch (error) {
    console.log('error al crear tablea Productos')
    console.log(error)
}