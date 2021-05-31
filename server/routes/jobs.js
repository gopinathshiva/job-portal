const express = require('express');
const { jsonReader, jsonWriter, getUniqueId } = require('../utils');
const { validateJob, hasValidationErrors } = require('../validate-request');

const router = express.Router();
const jsonFilePath = './server/jobs.json';

router.post('/', validateJob(), (req, res, next) => {
  jsonReader(jsonFilePath, (err, jobs) => {
    if (err) {
      next(err);
    }
    if (!hasValidationErrors(req, res)) {
      const job = {
        ...req.body,
        id: getUniqueId(),
        appliedBy: [],
      };
      jobs.push(job);
      jsonWriter(jsonFilePath, jobs, (err) => {
        if(!err){
          res.json({message: `successfully created new job`});
        }
      });
    }
  })
});

router.get('/', (req, res, next) => {
  jsonReader(jsonFilePath, (err, jobs) => {
    if (err) {
      next(err);
    }
    let finalJobs = [];
    if (req.query.skills) {
      finalJobs = jobs.filter(job => job.skills.indexOf(req.query.skills) >= 0);
    } else if (req.query.minSalaryPerHr) {
      finalJobs = jobs.filter(job => job.minSalaryPerHr >= req.query.minSalaryPerHr);
    } else {
      finalJobs = jobs;
    }
    return res.json({jobs: finalJobs, message: `successfully fetched jobs`, count: finalJobs.length});
  })
});

router.get('/postedBy/:id', (req, res, next) => {
  jsonReader(jsonFilePath, (err, jobs) => {
    if (err) {
      next(err);
    }
    const finalJobs = jobs.filter(job => job.postedBy === req.params.id);
    return res.json({jobs: finalJobs, message: `successfully fetched posted jobs`, count: finalJobs.length});
  })
});

router.get('/appliedBy/:id', (req, res, next) => {
  jsonReader(jsonFilePath, (err, jobs) => {
    if (err) {
      next(err);
    }
    const finalJobs = jobs.filter(job => job.appliedBy.indexOf(req.params.id) >= 0);
    return res.json({jobs: finalJobs, message: `successfully fetched applied jobs`, count: finalJobs.length});
  })
});

router.get('/apply/:jobId/:mailId', (req, res, next) => {
  jsonReader(jsonFilePath, (err, jobs) => {
    if (err) {
      next(err);
    }
    const tobeAppliedJobIndex = jobs.findIndex(job => job.id === req.params.jobId);
    if (!tobeAppliedJobIndex < 0) {
      return next(`job not found`);
    }
    else if (jobs[tobeAppliedJobIndex].appliedBy.indexOf(req.params.mailId) >= 0) {
      return next(`job already applied`);
    }
    jobs[tobeAppliedJobIndex].appliedBy.push(req.params.mailId);
    jsonWriter(jsonFilePath, jobs, (err) => {
      if(!err){
        return res.json({message: `successfully applied job `});
      }
      return next('error while updating job');
    });
  })
});

module.exports = router;
