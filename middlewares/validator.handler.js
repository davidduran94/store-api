const boom = require('@hapi/boom');

function validatorHandler(schema, props) {
  return (req, res, next) => {
    const data = req[props];
    const { error } = schema.validate(data);
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validatorHandler;
