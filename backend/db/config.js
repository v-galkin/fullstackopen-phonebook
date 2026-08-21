require('dotenv').config()

const dbConfig = {
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    cluster: process.env.MONGODB_CLUSTER,
    dbName: process.env.MONGODB_DBNAME,
    options: process.env.MONGODB_OPTIONS    
}

const MONGDB_URI = `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.cluster}/${dbConfig.dbName}${dbConfig.options}`

module.exports = MONGDB_URI