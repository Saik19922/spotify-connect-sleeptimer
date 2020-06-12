var express = require('express');
var cors = require('cors')
var router = express.Router();

/* GET users listing. */
router.get('/', cors(), function (req, res, next) {
  //res.send('respond with a resource');

  // Arbitrary test data
  res.json([{
    id: 1,
    username: "samsepi01"
  },
  {
    id: 1,
    username: "D0loresH4ze"
  }]);
});

module.exports = router;
