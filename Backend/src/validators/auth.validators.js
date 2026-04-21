import Joi from "joi";
export const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
  }),

  email: Joi.string().trim().email().required().messages({
    "string.email": "Enter a valid email",
  }),

  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must include uppercase, number, and special character",
    }),

  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email field can't be empty",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password field can't be empty",
  }),
});
