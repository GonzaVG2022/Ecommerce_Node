const app = require('../app');
const request = require('supertest');
const Product = require('../models/Product');
require('../models')

let token;
let cartId;

beforeAll(async() => {
    const credentials = {
        email: 'test@gmail.com',
        password: 'test'
    }
    const res = await request(app)
    .post(`/api/v1/users/login`)
    .send(credentials);
    token = res.body.token;
});

test('POST /carts shoudl create one product', async() => {
    const product= await Product.create(
    {
        titel: 'MacBook Air 13.3" Laptop - Apple M1 chip',
        description: "It’s here. Our first chip designed specifically for Mac. Packed with an astonishing 16 billion transistors, the Apple M1 system on a chip (SoC) integrates the CPU, GPU, Neural Engine, I/O, and so much more onto a single tiny chip. With incredible performance, custom technologies, and industry-leading power efficiency, M1 is not just a next step for Mac — it’s another level entirely.",
        price: 100,
                      
    })
    const cart = {
        quantity: 1,
        productId: product.id
    }
    const res = await request(app)
    .post(`/api/v1/carts`)
    .send(cart)
    .set(`Authorization`, `Bearer ${token}`);
    await product.destroy();
    cartId = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.quantity).toBe(cart.quantity)
});
test('GET /cart should return all categories', async() => {
    const res = await request(app)
    .get(`/api/v1/carts`)
    .set(`Authorization`, `Bearer ${token}`);;
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});
test('PUT /carts/:id should update one cart', async() => {
    const body = {
        quantity : 5
    }
    const res = await request(app)
    .put(`/api/v1/carts/${cartId}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(body.quantity);

});
test('DELETE /carts/:id should delete one cart', async() => {
    const res = await request(app)
    .delete(`/api/v1/carts/${cartId}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
})
