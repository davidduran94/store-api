const boom = require('@hapi/boom');
const faker = require('faker');
class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const { size } = 100;
    const limit = size || 10;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  create() {
    return this.products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 2000);
    });
  }

  findOne(id) {
    const product = this.products.find((x) => x.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlocked) {
      throw boom.conflict('product id blocked');
    }
  }

  update(id, data) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const oldProd = this.products[index];
    this.products[index] = {
      ...oldProd,
      ...data,
    };
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductService;
