const express = require("express")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./src/docs/swagger");

require('dotenv').config();

const app = express()
const dbConnect = require('./src/config/mongo')

//Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)
app.use(cors())
app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/api", require("./src/routes")) //Lee routes/index.js por defecto
//app.use(express.static("storage")) // http://localhost:3000/file.jpg

const port = process.env.PORT || 9000

app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
})

dbConnect()


module.exports = app;