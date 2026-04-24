import Joi from "joi";

export const baseProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),

  description: Joi.string().min(10).required(),

  brand: Joi.string().required(),

  price: Joi.number().min(0).required(),

  stock: Joi.number().min(0).required(),

  type: Joi.string().valid("laptop", "phone").required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100),

  description: Joi.string().min(10),

  brand: Joi.string(),

  price: Joi.number().min(0),

  stock: Joi.number().min(0),

  ram: Joi.string(),

  storage: Joi.string(),

  processor: Joi.string(),

  os: Joi.string(),

  displaySize: Joi.number(),

  battery: Joi.number(),

  camera: Joi.string(),

  gpu: Joi.string(),

  ports: Joi.array().items(Joi.string()),

  connectivity: Joi.array().items(Joi.string()),
});

export const productQuerySchema = Joi.object({
  brand: Joi.string(),

  minPrice: Joi.number().min(0),

  maxPrice: Joi.number().min(0),

  page: Joi.number().min(1),

  limit: Joi.number().min(1).max(50),

  search: Joi.string(),

  sort: Joi.string().valid("price", "-price"),

  minRating: Joi.number().min(0).max(5),
});