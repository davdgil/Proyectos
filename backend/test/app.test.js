// tests/integrationTests.js
const request = require('supertest');
const app = require('../app'); // Ensure this points to your Express app

describe('User Registration and Login', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'JestTest@example.com',
        password: 'password123',
        city: 'Ciudad Metrópolis',
        role: 'admin'
      })
      .expect(201);

    expect(res.body).toHaveProperty('message', 'Nuevo usuario creado exitosamente');
  });

  let userToken = '';  // Variable to store the token

  it('should login the user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'JestTest@example.com',
        password: 'password123'
      })
      .expect(200);

    expect(res.body).toHaveProperty('token');
    userToken = res.body.token;  // Storing the token from login
  });

  it('should create a new commerce with a valid token', async () => {
    const commerceResponse = await request(app)
      .post('/api/commerce/createCommerce')
      .set('Authorization', `Bearer ${userToken}`) 
      .send({
        commerceName: "Example Store by Jest",
        email: "storeByJEST@example.com",
        phone: "654321232",
        cif: "02456785Z",
        address: "123 Main St"
      })
      .expect(201);  

    expect(commerceResponse.body).toHaveProperty('message', 'Comercio y comerciante creados con éxito');
    
  });
});

