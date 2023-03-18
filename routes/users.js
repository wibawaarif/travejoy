var express = require('express');
var router = express.Router();
const Category = require('../models/Category')

/* GET users listing. */
router.post('/test', function(req, res, next) {
  const { name } = req.body

  const saveCategory = new Category({
    name,
  })

  saveCategory.save();

  return res.send(saveCategory);
});

module.exports = router;
