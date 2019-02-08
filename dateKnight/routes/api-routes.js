const dateSelections = require('../models/dateSelections')

module.exports = function (app) {

    app.get('/results', function (req, res) {
      dateSelections.find({}, {sort:{$natural:-1}})
        .then(function (data) {
          res.json(data);
        })
        .catch(function (err) {
          res.json(err);
        });
    });

    app.post('/date', function (req, res) {
        dateSelections.create(req.body)
          .then(function (data) {
            res.json(data);
          })
          .catch(function (err) {
            res.json(err);
          });
    });

    app.get('/history', function (req, res) {
      dateSelections.find()
        .then(function (data) {
          res.json(data);
        })
        .catch(function (err) {
          res.json(err);
        });
    });
}