process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let item = { name: "Oreos", price: 3.59 };

beforeEach(async () =>{
    items.push(item);
});

afterEach(async () => {
    items = [];
});

// test GET requests for all items
describe("GET /items", function() {
    test("Gets a list of items", async function() {
      const resp = await request(app).get(`/items`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({items: [item]});
    });
});

// test GET requests for one item
describe("GET /items/:name", function() {
    test("Gets a single item", async function() {
      const resp = await request(app).get(`/items/${item.name}`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({item: item});
    });
});

// test POST request
describe("POST /items", function() {
    test("make a post request to create new item", async function() {
      let juice = { name: "Orange Juice", price: 2.50 };
      const resp = await request(app).post(`/items`).send(juice);
      expect(resp.statusCode).toBe(200);
      expect(resp.body.item.name).toEqual("Orange Juice");
      expect(resp.body.item.price).toEqual(2.50);
      expect(resp.body).toEqual({item: juice})
    });
});

// test PATCH request
describe("PATCH /items", function() {
    test("Update an existed item", async function() {
      const resp = await request(app).patch(`/items/${item.name}`).send({name: "Oreo cookies"});

      expect(resp.statusCode).toBe(200);
      expect(resp.body.item.name).toEqual("Oreo cookies");
    });
});

// test delete request
describe("DELETE /items/:name", function() {
    test("Delete item", async function() {
      const resp = await request(app).delete(`/items/${item.name}`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({message: "Deleted"});
    });
});
