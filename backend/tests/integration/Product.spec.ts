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

const category = {
  id: 5,
};

describe('Testing the Product Controller functionalities', () => {
  const product = {
    id: 0,
    title: 'Pizza TESTE',
    image: 'pizza.jpg',
    category: category.id,
    ingredients: [
      {
        title: 'Brigadeiro',
      },
      {
        title: 'Brigadeiro + Sorvete',
      },
    ],
    sizes: [
      {
        title: 'Média',
        price: 13.0,
      },
      {
        title: 'Grande',
        price: 18.0,
      },
    ],
  };
  it('Should authenticate the Admin', async () => {
    const response = await supertest(app)
      .post('/admins/login')
      .send(admin);
    expect(response.status).toBe(200);
    token.token = response.body.token;
  });

  it('Should be able to create a new Product', async () => {
    const response = await supertest(app)
      .post('/products')
      .set('Authorization', `Bearer ${token.token}`)
      .send(product);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    product.id = response.body.id;
    token.token = response.header['refresh-token'];
  });

  it('Should be able to list all products', async () => {
    const response = await supertest(app).get('/products');
    expect(response.status).toBe(200);
  });

  // it('Should be able to update a Product', async () => {
  //   const response = await supertest(app)
  //     .put(`/products/${product.id}`)
  //     .set('Authorization', `Bearer ${token.token}`)
  //     .send({
  //       title: 'Pizza',
  //       image: 'pizza.jpg',
  //       price: 15.5,
  //       ingredients: [
  //         {
  //           id: 1,
  //           title: 'Mussarela Italiana',
  //           price: null,
  //           productId: 3,
  //         },
  //         {
  //           id: 2,
  //           title: 'Calabresa',
  //           price: null,
  //           productId: 3,
  //         },
  //       ],
  //       sizes: [
  //         {
  //           id: 1,
  //           title: 'Pequena',
  //           price: 10,
  //           productId: 3,
  //         },
  //       ],
  //     });

  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty('id');
  //   token.token = response.header['refresh-token'];
  // });

  // it('Should be able to delete Product', async () => {
  //   const response = await supertest(app)
  //     .delete(`/products/${product.id}`)
  //     .set('Authorization', `Bearer ${token.token}`);
  //   expect(response.status).toBe(201);
  // });
});
