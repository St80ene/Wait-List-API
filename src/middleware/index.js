import Joi from 'joi';

const isValidRegister = Joi.object({
  full_name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  type: Joi.string().required(),
  asset_description: Joi.string().optional(),
});

const registerValidation = (req, res, next) => {
  const validation = isValidRegister.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      error: validation.error.details.map((error) =>
        error.message.replace(/"/g, '')
      ),
    });
  }

  if (
    validation.value.type === 'asset-lister' &&
    validation.value.asset_description === undefined
  ) {
    res
      .status(422)
      .json({
        status: false,
        message: 'asset description is required for asset listers',
      });
  }
  next();
};

export default registerValidation;
