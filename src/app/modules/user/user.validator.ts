import Joi from 'joi';


const fullNameSchema = Joi.object({
    firstName: Joi.string().trim().required().messages({
      'any.required': 'First name is required',
      'string.empty': 'First name cannot be empty',
    }),
    lastName: Joi.string().trim().required().messages({
      'any.required': 'Last name is required',
      'string.empty': 'Last name cannot be empty',
    }),
  });
  
  const addressSchema = Joi.object({
    street: Joi.string().required().messages({
      'any.required': 'Street name is required',
      'string.empty': 'Street name cannot be empty',
    }),
    city: Joi.string().required().messages({
      'any.required': 'City name is required',
      'string.empty': 'City name cannot be empty',
    }),
    country: Joi.string().required().messages({
      'any.required': 'Country name is required',
      'string.empty': 'Country name cannot be empty',
    }),
  });
  
  const userValidationSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    fullName: fullNameSchema.required(),
    age: Joi.number().integer().positive(),
    email: Joi.string().email().required(),
    isActive: Joi.boolean(),
    hobbies: Joi.array().items(Joi.string()),
    address: addressSchema.required(),
    orders: Joi.array().items(
      Joi.object({
        productName: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
      })
    ),
  });

  export default userValidationSchema;