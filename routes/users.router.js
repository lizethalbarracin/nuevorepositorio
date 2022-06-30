const express = require('express');
const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {createUserSchema,updateUserSchema,getUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get('/', (req,res) => {
  const { limit,offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No hay parametros');
  }
});

router.get('/', async (req,res) => {
  const Users = await service.find();
  res.json(Users);
});

router.get('/:id',
  validatorHandler(getUserSchema,'params'),
  async (req,res,next) => {
    try {
      const { id } = req.params;
      const User = await service.findOne(id);
      res.json(User);
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  });

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try{
      const { id } = req.params;
      const body = req.body;
      const User = await service.update(id, body);
      res.json(User);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  });

module.exports=router;