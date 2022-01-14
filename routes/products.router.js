const express = require('express');
const faker = require('faker');
const ProductService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/product.schema');

const router = express.Router();
const productsService = new ProductService();

router.get('/', async (req, res) => {
  const products = await productsService.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productsService.findOne(id);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', validatorHandler(createProductSchema, 'body'), (req, res) => {
  const body = req.body;
  console.log(body);
  res.status(201).json({
    message: 'created',
    data: body,
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'updated',
    data: id,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'patched',
    data: id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    data: id,
  });
});

module.exports = router;
