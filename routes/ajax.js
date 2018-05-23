var express = require('express');
var router = express.Router();
var userModel = require('../models/usermodel.js');
/* GET home page. */
router.post('/', function(req, res){
  //console.log(req.body.lines);
  var arrr = [], objArrs = [];
  for (var i = 0; i < req.body.lines.length; i++) {
    arrr.push(req.body.lines[i] * 1);
  }

  userModel.find({store_id:{$in : arrr}}).sort({"store_id" : -1}).exec(function(e,d){
    d.forEach(function(el){
      if(!objArrs[objArrs.length-1]|| el.store_id != objArrs[objArrs.length-1].store_id){
        objArrs.push({
          store_id : el.store_id,
          salesmax : el.sales,
          salesObjs : [{
            date: el.date.toJSON(),
            sales: el.sales
          }]
        });
      } else{
        if (el.sales > objArrs[objArrs.length-1].salesmax) {
          objArrs[objArrs.length-1].salesmax = el.sales;
        }
        objArrs[objArrs.length-1].salesObjs.push({
          date: el.date.toJSON(),
          sales: el.sales
        });
      }
    });

    res.send(objArrs);

  });



});

module.exports = router;
