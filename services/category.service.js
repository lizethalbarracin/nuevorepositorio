const faker = require('faker');
const boom = require('@hapi/boom');

class CategoriesService {

  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        image: faker.image.imageUrl(),
      });
    }
  }

  async create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.categories.push(newCategory);
    return newCategory;
  }

  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.categories);
      }, 5000);
    })
  }

  async findOne(id) {
    const category = this.categories.find(item => item.id === id);
    if (!category) {
      throw boom.notFound('category nor found');
    }
    // if(category.isBlock){
    //   throw boom.conflict('category is block ');
    // }
    return category;
  }

  async update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('category nor found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    };
    return this.categories[index];
  }

  async delete(id) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('category nor found');
    }
    this.categories.splice(index, 1);
    return {
      id
    };
  }

}

module.exports = CategoriesService;
