require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})
const express = require('express');
const cors = require('cors')
const sequelize = require("./src/config")
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = require('./src/docs/swaggerDefenition.js');
const router = require('./src/routes')
const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js', './src/models/*.js'],
};
const swaggerSpecs = swaggerJsdoc(options);


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));



const PORT = process.env.PORT || 8022;
const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        // await beforeAfter()


        // if (process.env.NODE_ENV !== 'test') {
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        // }


    } catch (e) {
        console.log(e);
    }
}

start()


module.exports = app
