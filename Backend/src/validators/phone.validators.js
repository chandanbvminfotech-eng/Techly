import { baseProductSchema } from "./product.validators";

export const phoneSchema = baseProductSchemaProductSchema.keys({
  ram: Joi.string()
    .valid("2GB", "4GB", "6GB", "8GB", "12GB", "16GB")
    .required(),

  storage: Joi.string()
    .valid("32GB", "64GB", "128GB", "256GB", "512GB", "1TB")
    .required(),

  processor: Joi.string().required(),

  os: Joi.string().valid("android", "ios").required(),

  displaySize: Joi.number().required(),

  battery: Joi.number().required(),

  camera: Joi.string().required(),

  stock: Joi.number().min(0).required(),
});
