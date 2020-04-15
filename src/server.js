require('dotenv').config()
const app = require('./app')
const knex = require('knex')

const {PORT, DATABASE_URL} = require('./config');

const db= knex({
    client:'pg',
    connection: DB_URL
})
app.set('db', db)


app.listen(PORT ,()=>{
console.log(`Server is listening on ${PORT}`)
})