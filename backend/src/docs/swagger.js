const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Tracks - Express API with Swagger (OpenAPI 3.0)",
      version: "0.1.0",
      description:
        "This is a CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "u-tad",
        url: "https://u-tad.com",
        email: "david.gil@u-tad.com",
      },
    },
    servers: [
      {
        url: "http://localhost:9000/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
        schemas: {
          User: {
            type: "object",
            properties: {
              id: {
                type: "string",
                format: "uuid",
                description: "Identificador único para el usuario generado automáticamente por uuidv4."
              },
              email: {
                type: "string",
                format: "email",
                description: "Correo electrónico del usuario. Debe ser único."
              },
              password: {
                type: "string",
                format: "password",
                description: "Contraseña del usuario. No se devolverá en las respuestas de la API."
              },
              role: {
                type: "string",
                enum: ["admin", "comerciante", "usuario", "anonimo"],
                default: "usuario",
                description: "El rol del usuario dentro del sistema. Por defecto es 'usuario'."
              },
              city: {
                type: "string",
                description: "Ciudad de residencia del usuario."
              },
              interests: {
                type: "string",
                items: {
                  type: "string"
                },
                description: "Lista de intereses del usuario."
              },
              isActive: {
                type: "boolean"

              }
            },
            required: ["email", "password", "city"],
            example: {
              email: "usuario@example.com",
              password: "password123",
              role: "admin",
              city: "Ciudad Metrópolis",
              interests: "hamburguesas",
              isActive: true

            }
          },
          Commerce: {
            type: "object",
            required: ["commerceName", "email", "cif", "address"],
            properties: {
              commerceName: {
                type: "string",
                description: "Nombre del comercio."
              },
              email: {
                type: "string",
                format: "email",
                description: "Correo electrónico del comercio. Debe ser único."
              },
              phone: {
                type: "string",
                description: "Teléfono de contacto del comercio."
              },
              cif: {
                type: "string",
                description: "CIF del comercio. Debe ser único."
              },
              address: {
                type: "string",
                description: "Dirección física del comercio."
              },
              merchant: {
                type: "string",
                description: "Identificador único del comerciante asociado a este comercio."
              }
            },
            required: ["commerceName", "email", "phone", "cif", "address"],
            example: {
              commerceName: "comercioDePrueba@gmail.com",
              email: "comercioDePrueba@example.com",
              phone: "654324123",
              cif: "0278987Z",
              address: "C/mirador de montepinar"
            }
          },
          WebPage: {
            type: "object",
            required: ["commerceId", "commerceName", "title", "description", "city", "address", "photos"],
            properties: {
              commerceId: {
                type: "string",
                description: "El identificador del comercio asociado a esta página web."
              },
              commerceName: {
                type: "string",
                description: "Nombre del comercio."
              },
              title: {
                type: "string",
                description: "Título de la página web."
              },
              description: {
                type: "string",
                description: "Descripción de la página web."
              },
              city: {
                type: "string",
                description: "Ciudad en la que se encuentra el comercio."
              },
              address: {
                type: "string",
                description: "Dirección del comercio."
              },
              likes: {
                type: "integer",
                default: 0,
                description: "Número de 'me gusta' de la página."
              },
              dislikes: {
                type: "integer",
                default: 0,
                description: "Número de 'no me gusta' de la página."
              },
              reviews: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    userId: {
                      type: "string",
                      description: "Identificador del usuario que realiza la reseña."
                    },
                    comment: {
                      type: "string",
                      description: "Comentario de la reseña."
                    },
                    rating: {
                      type: "integer",
                      description: "Calificación dada por el usuario."
                    }
                  }
                },
                description: "Lista de reseñas de la página."
              },
              photos: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    url: {
                      type: "string",
                      description: "URL de la imagen."
                    },
                    description: {
                      type: "string",
                      description: "Descripción de la imagen."
                    }
                  }
                },
                description: "Imágenes asociadas a la página web."
              }
            }
          }
          
          
        }
    }
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
