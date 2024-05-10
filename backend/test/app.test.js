// tests/integrationTests.js
const request = require('supertest');
const app = require('../app'); // Ensure this points to your Express app

describe('Creacion de admin, login, creacion de comercio, registro de comercio, incio de sesion de comerciante, creacion de pagina web', () => {


  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'JestTest@example.com',
        password: 'password123',
        city: 'Madrid',
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

  it('should create a new commerce ', async () => {
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
let userId = '';

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'storeByJEST@example.com',
        password: 'password123',
        city: 'Madrid',
      })
      .expect(201);

    expect(res.body).toHaveProperty('message', 'Usuario comerciante actualizado con éxito');
    userId = res.body._id;
  });

  it('should login the merchant and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'storeByJEST@example.com',
        password: 'password123'
      })
      .expect(200);

    expect(res.body).toHaveProperty('token');
    userToken = res.body.token;  
  });

  it('should create a new web page without images', async () => {

    const pageRes = await request(app)
      .post('/api/webPage/upload-images')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        merchantId: userId, 
        commerceName: 'Example Store by Jest',
        title: 'New Web Page',
        description: 'This is a test web page',
        city: 'Ciudad Metrópolis',
        address: '123 Main St',
        photos: [
          { url: 'https://placekitten.com/200/300', description: 'A cute kitten' },
          { url: 'https://placeimg.com/640/480/any', description: 'Random image' }
      ]
      });
  
    expect(pageRes.status).toBe(201);
    expect(pageRes.body).toHaveProperty('message', 'Web page created successfully');
    expect(pageRes.body.webpage).toBeDefined();
    expect(pageRes.body.webpage.photos).toHaveLength(0); // Verify that no images were added
});
  

});

