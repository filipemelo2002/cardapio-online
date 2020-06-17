import supertest from 'supertest';
import app from '../../src/app';

const admin = {
  name: 'Admin',
  email: 'admin@domain.com',
  password: '123456',
};

const token = {
  token: '',
};
describe('Testing the Category Controller functionalities', () => {
  const category = {
    id: 0,
    title: 'Pizzas',
  };

  it('Should authenticate the Admin', async () => {
    const response = await supertest(app)
      .post('/admins/login')
      .send(admin);
    expect(response.status).toBe(200);
    token.token = response.body.token;
  });

  it('Should be able to create a new Category', async () => {
    const response = await supertest(app)
      .post('/categories')
      .set('Authorization', `Bearer ${token.token}`)
      .send(category);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    category.id = response.body.id;
    token.token = response.header['refresh-token'];
  });
  it('Should be able to list all categories', async () => {
    const response = await supertest(app).get('/categories');
    expect(response.status).toBe(200);
  });

  it('Should be able to update Category', async () => {
    const response = await supertest(app)
      .put(`/categories/${category.id}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({ title: 'Pizzas Deliciosas' });
    expect(response.status).toBe(200);
    token.token = response.header['refresh-token'];
  });
});
