// ------------  Configuración inicial
const knex = require('knex')
const config = require('../src/config.js')

// Defino clase contendor que recibe como parametro el archivo configuracion knex y la tabla
const tabla='productos'
class Contenedor {
  constructor(config,productos) {
    this.config = config;
  }

// ListarAll 
  async listarAll() {
    knex.from('autos').select('*')
    .then((rows)=>{
        for (const row of rows) {
            console.log(`${row['id']}, ${row['marca']}, ${row['modelo']}`);
        }
        console.table(rows)
    })
    .catch((error)=>{
        console.error(
            {
                codigo: `${error.errno}|${error.code}`,
                msg: error.sqlMessage
            }
        )
    })
    .finally(()=>{
        knex.destroy();
    }); 
  }
    

// Guardar
  async guardar() {
  knex('productos').insert(producto)
    .then(()=>{
        console.log('Registro insertado');
    })
    .catch((error)=>{
        console.error(
            {
                codigo: `${error.errno}|${error.code}`,
                msg: error.sqlMessage
            }
        )
    })
    .finally(()=>{
        knex.destroy();
    });
  }

}

module.exports = Contenedor