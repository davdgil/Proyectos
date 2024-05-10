const request = require('supertest');
const app = require('../app');

describe('Creacion de admin, login, creacion de comercio, registro de comercio, incio de sesion de comerciante, creacion de pagina web', () => {

    let userToken = '';

    it('should login the user and return a token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'JestTest@example.com',
          password: 'password123'
        })
        .expect(200);
  
      expect(res.body).toHaveProperty('token');
      userToken = res.body.token; 
    });

    it('should delete a commerce by email', async () => {
        const emailToDelete = 'storeByJEST@example.com';
        const res = await request(app)
          .delete(`/api/commerce/deleteCommerceByEmail/${emailToDelete}`)
          .set('Authorization', `Bearer ${userToken}`) 
          .expect(200);  
  
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toEqual('Comercio y comerciante con email storeByJEST@example.com han sido borrados.');  
      });

      it('should delete a web page by commerce name', async () => {
        const commerceNameToDelete = 'Example Store by Jest'; 
        const res = await request(app)
          .delete(`/api/webPage/deleteByCommerceName/${commerceNameToDelete}`)
          .set('Authorization', `Bearer ${userToken}`)  
          .expect(200);  
  
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toEqual('Web page eliminada'); 
      });

      it('should delete a user by email', async () => {
        const emailToDelete = 'JestTest@example.com';  // The email of the user to delete
        const res = await request(app)
          .delete(`/api/user/deleteByEmail/${emailToDelete}`)
          .set('Authorization', `Bearer ${userToken}`)  // Use the token for authentication
          .expect(200);  // Expecting HTTP 200 OK if the deletion is successful
  
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toEqual('Usuario y cualquier comercio asociado eliminados con éxito.');  // Adjust the expected message as per your API response
      });


});
