const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Job
      .find()
      .sort({ date: -1 })
      .then(dbModel => res.json({ jobs: dbModel }))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Job
      .findById(req.params.id)
      .then(dbModel => res.json({ job: dbModel }))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Job
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Job
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUid: function(req, res) {
    db.Job
      .find({uid: req.params.uid})
      .sort({ date: -1 })
      .then(dbModel => res.json({ jobs: dbModel }))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Job
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
