const express = require('express');
const { jsonReader, jsonWriter } = require('../utils');
const { validateRecruiterRegister, validateRecruiterLogin, hasValidationErrors } = require('../validate-request');

const router = express.Router();
const jsonFilePath = './server/recruiters.json';

router.post('/register', validateRecruiterRegister(), (req, res, next) => {
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

router.post('/login', validateRecruiterLogin(), (req, res, next) => {
  jsonReader(jsonFilePath, (err, recruiters) => {
    if (err) {
      next(err);
    }
    if (!hasValidationErrors(req, res)) {
      const recruiter = recruiters.find(recruiter => req.body.email === recruiter.email && req.body.password === recruiter.password);
      if (recruiter) {
        return res.json({message: 'login successful', user: recruiter});
      }
      next('login failed', err);
    }
  })
});

module.exports = router;
