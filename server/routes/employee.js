const express = require('express');
const { jsonReader, jsonWriter } = require('../utils');
const { validateEmployeeRegister, validateEmployeeLogin, hasValidationErrors } = require('../validate-request');

const router = express.Router();
const jsonFilePath = './server/employees.json';

router.post('/register', validateEmployeeRegister(), (req, res, next) => {
  jsonReader(jsonFilePath, (err, employees) => {
    if (err) {
      next(err);
    }
    if (!hasValidationErrors(req, res)) {
      employees.push(req.body);
      jsonWriter(jsonFilePath, employees, (err) => {
        if(!err){
          res.json({message: `successfully registered`});
        }
      });
    }
  })
});

router.post('/login', validateEmployeeLogin(), (req, res, next) => {
  jsonReader(jsonFilePath, (err, employees) => {
    if (err) {
      next(err);
    }
    if (!hasValidationErrors(req, res)) {
      const employee = employees.find(employee => req.body.email === employee.email && req.body.password === employee.password);
      if (employee) {
        return res.json({message: 'login successful', user: employee});
      }
      next('login failed', err);
    }
  })
});

router.get('/profile/:id', (req, res, next) => {
  jsonReader(jsonFilePath, (err, employees) => {
    if (err) {
      next(err);
    }
    const employeeInfo = employees.find(employee => req.params.id === employee.email);
    if (!employeeInfo) {
      return next(`employee details not found`);
    }
    return res.json({employee: employeeInfo, message: `fetched employee details`});
  })
});

module.exports = router;
