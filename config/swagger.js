const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "POS API",
      version: "1.0.0",
      description: "API documentation for POS system",
    },
    servers: [
      {
        url: "http://localhost:3000", // change to your server URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API routes
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
