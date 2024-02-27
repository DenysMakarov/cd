const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API with Swagger',
        version: '1.0.0',
        description: 'This is a simple CRUD API application made with Express and documented with Swagger',
    },
    servers: [
        {
            url: 'http://localhost:8002',
            description: 'Development User Service',
        },
    ],
};

module.exports = swaggerDefinition;
