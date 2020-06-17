import supertest from 'supertest';
import app from '../../src/app';

describe('Testing the Admin Controller Functionalities', () => {
  const admin = {
    name: 'Admin',
    email: 'admin@domain.com',
    password: '123456',
  };

  const token = {
    token: '',
  };
  it('Should be able to create a new Admin', async () => {
    const response = await supertest(app).post('/admins').send(admin);

    expect(response.status).toBe(400);
  });

  it('Should be able to Sign In', async () => {
    const response = await supertest(app)
      .post('/admins/login')
      .send(admin);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    token.token = response.body.token;
  });

  it('Should be able to list all Admins', async () => {
    const response = await supertest(app)
      .get('/admins')
      .set('Authorization', `Bearer ${token.token}`);
    expect(response.status).toBe(200);
  });
});
