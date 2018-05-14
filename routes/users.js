var express = require('express');
// var tools = require('../public/javascripts/tools.js');
var router = express.Router();
var userModel = require('../models/usermodel.js');
var storeIds;
var floorNums;
var thisFloorIDs = [];
function sortID(a,b) {
  if (a._id < b._id )
  return -1;
  if (a._id  > b._id )
  return 1;
  return 0;
}

router.get('/list', function(req, res) {
  // userModel.find().sort("store_id").distinct('store_id').toArray(function (err, result){
  userModel.aggregate([
    {$sort:{"store_id":1}},
    {$group:{"_id":"$store_id"}}
  ]
).exec(function ( e, d ){
  storeIds = d;
  storeIds.sort(sortID);
});

userModel.aggregate([
  {$sort:{"floor":1}},
  {$group:{"_id":"$floor"}}
]
).exec(function ( e, d ){
  floorNums = d;
  floorNums.sort(sortID);
});

res.render('userlist',{
  title: "Wanxiangcheng Data Visualizations",
  wanxiangcheng: storeIds,
  floorNums : floorNums
})
});

var haha = [];
router.post('/list', function(req, res){
  if (!req.body.floor) {
    userModel.find({"store_id":req.body.store_name }).exec(function(e,d){
      var thisStoreSales = [];
      for (var i = 0; i < d.length; i++) {
        var tempObj = {
          date: d[i].date.toJSON(),
          sales: d[i].sales
        };
        thisStoreSales.push(tempObj);
      }
      res.render('userlist',{
        wanxiangcheng: storeIds,
        floorNums : floorNums,
        oneStoreAllJson: thisStoreSales
      })
    })
  } else{

    userModel.find({"floor":req.body.floor }).sort({"store_id" : -1}).exec(function(e,d){
      console.log(d);
      var tempId = [];
      var objArrs = [];
      for (var i = 0; i < d.length; i++) {
        if (tempId.length <= 0) {
          tempId.push(d[i].store_id);
          var temp = {
            store_id : d[i].store_id,
            salesObjs : []
          };
          var tempObj = {
            date: d[i].date.toJSON(),
            sales: d[i].sales
          };
          temp.salesObjs.push(tempObj);
          objArrs.push(temp);
        }
        else{
          if (d[i].store_id == tempId[tempId.length-1]) {
            var tempObj = {
              date: d[i].date.toJSON(),
              sales: d[i].sales
            };
            objArrs[objArrs.length-1].salesObjs.push(tempObj);
          }
          else{
            var temp = {
              store_id : d[i].store_id,
              salesObjs : []
            };
            var tempObj = {
              date: d[i].date.toJSON(),
              sales: d[i].sales
            };
            tempId.push(d[i].store_id);
            temp.salesObjs.push(tempObj);
            objArrs.push(temp);
          }
        }


      }
      console.log(objArrs.length);
      res.render('userlist',{
        wanxiangcheng: storeIds,
        floorNums : floorNums,
        thisFloorData: objArrs

      })
    });





  }

});

module.exports = router;
