var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(
    [
      {
        id: 1,
        name: "xouxou"
      },
      {
        id: 2,
        name: "xouxou2"
      }
    ]
  );
});

module.exports = router;
