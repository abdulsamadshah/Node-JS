const Joi = require("joi");

const validatePersonalDetails = (data) => {
  const schema = Joi.object({
    FirstName: Joi.string().min(2).required(),
    LastName: Joi.string().min(2).required(),
    Email: Joi.string().email().required(),
    MobileNo: Joi.string().min(10).max(15).required(),
    Password: Joi.string().min(6).required(),
    ProfileImage: Joi.string().allow(null, '').optional(),
  });
  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    Email: Joi.string().email().required(),
    Password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports = { validatePersonalDetails, validateLogin };
