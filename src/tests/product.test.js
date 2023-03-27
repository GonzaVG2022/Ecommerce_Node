const request = require('supertest');
const app = require('../app');
const ProductImg = require('../models/ProductImg');
require('../models')


let productId;
let token;
beforeAll(async() => {
   const credentials = {    
            email: 'test@gmail.com',
            password: 'test'       
   }
  const res = await request(app)
    .post(`/api/v1/users/login`)
    .send(credentials);
   token = res.body.token;
})
test('POST /products shoudl create one product', async() => {
    const product=
    {
        titel: 'MacBook Air 13.3" Laptop - Apple M1 chip',
        description: "It’s here. Our first chip designed specifically for Mac. Packed with an astonishing 16 billion transistors, the Apple M1 system on a chip (SoC) integrates the CPU, GPU, Neural Engine, I/O, and so much more onto a single tiny chip. With incredible performance, custom technologies, and industry-leading power efficiency, M1 is not just a next step for Mac — it’s another level entirely.",
        price: 100,
        categoryId: null
        
               
    }
    const res = await request(app)
    .post(`/api/v1/products`)
    .send(product)
    .set(`Authorization`, `Bearer ${token}`);
    productId = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.titel).toBe(product.titel)
});
test('GET /products should return all products', async() => {
    const res = await request(app).get(`/api/v1/products`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});
test('PUT /products/:id should update one product', async() => {
    const body = {
        titel : "SAMSUNG Galaxy Book Pro"
    }
    const res = await request(app)
    .put(`/api/v1/products/${productId}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.titel).toBe(body.titel);

});
test('POST /products/:id/images shoudl set product images', async() => {
    const image = await ProductImg.create({url:'holiiis', filename:'chau'});
    const res = await request(app)
    .post(`/api/v1/products/${productId}/images`)
    .send([image.id])
    .set(`Authorization`, `Bearer ${token}`);
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});
test('DELETE /products/:id should delete one product', async() => {
    const res = await request(app)
    .delete(`/api/v1/products/${productId}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});





