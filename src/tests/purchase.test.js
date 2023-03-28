const request = require('supertest');
const app = require('../app');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
require('../models');

let token
let userId;

beforeAll(async() => {
    const credentials = {
        email: 'test@gmail.com',
        password: 'test'
    };
    const res = await request(app)
    .post(`/api/v1/users/login`)
        .send(credentials);
    token = res.body.token;
    userId = res.body.user.id;
});

test("POST /api/v1/purchases should add cart to shopping and remove cart", async() => {
    const product = await Product.create({
            titel: 'MacBook Air 13.3" Laptop - Apple M1 chip',
            description: "It’s here. Our first chip designed specifically for Mac. Packed with an astonishing 16 billion transistors, the Apple M1 system on a chip (SoC) integrates the CPU, GPU, Neural Engine, I/O, and so much more onto a single tiny chip. With incredible performance, custom technologies, and industry-leading power efficiency, M1 is not just a next step for Mac — it’s another level entirely.",
            price: 100,
            categoryId: null
         
    });
    await Cart.bulkCreate([
        {
            quantity: 1,
            productId: product.id,
            userId
        }
    ]);
    let cart = await Cart.findAll({ 
        attributes: [ 'quantity', 'userId', 'productId' ],
        raw: true
    });
    const res = await request(app)
        .post("/api/v1/purchases")
        .send(cart)
        .set('Authorization', `Bearer ${token}`);    
    await product.destroy();
    await Cart.destroy({ where: { userId } });
    cart = await Cart.findAll();
    expect(res.status).toBe(200);
    expect(cart).toHaveLength(0);
});

test("GET /purchases should return all the purchases", async() => {
    const res = await request(app)
        .get("/api/v1/purchases")
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});