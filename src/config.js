export default {
    sqlite3: {
        client: 'better-sqlite3',
        connection: {
            filename: './DB/ecommerce.sqlite'
        },
        useNullAsDefult: true
    },
    mariadb: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'mario',
            password: 'mario',
            database: 'ecommerce'
        }
    }

}