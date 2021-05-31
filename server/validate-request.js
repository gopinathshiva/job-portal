const { body, validationResult } = require('express-validator')

exports.validate = () => {
  return [
    body('name', `Name doesn't exists`).exists(),
    body('description').optional(),
    body('author', 'Author doesn\'t exists').exists(),
    body('count', 'Count doesn\'t exists').isInt(),
  ];
}

exports.validateEmployeeRegister = () => {
  return [
    body('email', `email doesn't exists`).isEmail().normalizeEmail().exists(),
    body('password').isLength({ min: 3 }),
    body('githubUsername').optional(),
    body('skills', 'skills doesn\'t exists').exists(),
  ];
}

exports.validateEmployeeLogin = () => {
  return [
    body('email', `email doesn't exists`).isEmail().normalizeEmail().exists(),
    body('password').isLength({ min: 3 }),
  ];
}

exports.validateRecruiterRegister = () => {
  return [
    body('email', `email doesn't exists`).isEmail().normalizeEmail().exists(),
    body('password').isLength({ min: 3 }),
  ];
}

exports.validateRecruiterLogin = () => {
  return [
    body('email', `email doesn't exists`).isEmail().normalizeEmail().exists(),
    body('password').isLength({ min: 3 }),
  ];
}

exports.validateJob = () => {
  return [
    body('requirements').exists(),
    body('skills').exists(),
    body('companyName').exists(),
    body('contactInfo').exists(),
    body('minSalaryPerHr').isInt(),
    body('postedBy').isEmail().normalizeEmail().exists(),
  ];
}

exports.hasValidationErrors = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({error: errors.array()});
  } else {
    return false;
  }
}
