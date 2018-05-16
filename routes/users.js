var express = require('express');
// var tools = require('../public/javascripts/tools.js');
var router = express.Router();
var userModel = require('../models/usermodel.js');
var storeIds;
var floorNums;
var biz1s, biz2s;
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

userModel.aggregate([
  {$sort:{"Biz_cat1":1}},
  {$group:{"_id":"$Biz_cat1"}}
]
).exec(function ( e, d ){
  biz1s = d;
});


userModel.aggregate([
  {$sort:{"Biz_cat2":1}},
  {$group:{"_id":"$Biz_cat2"}}
]
).exec(function ( e, d ){
  biz2s = d;
});

res.render('userlist',{
  title: "Wanxiangcheng Data Visualizations",
  wanxiangcheng: storeIds,
  floorNums : floorNums,
  biz1s : biz1s,
  biz2s : biz2s
})
});

var haha = [];
router.post('/list', function(req, res){

  if (req.body.store_name) {
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
        oneStoreAllJson: thisStoreSales,
        biz1s : biz1s,
        biz2s : biz2s
      })
    })
  } else{
    console.log("ths is req.body");
    console.log(req.body);
    var dic = {};
      if (req.body.floor) {
        dic["floor"] = req.body.floor;
      }
      if (req.body.Biz_cat1) {
        dic["Biz_cat1"] = req.body.Biz_cat1;
      }
      if (req.body.Biz_cat2) {
        dic["Biz_cat2"] = req.body.Biz_cat2;
      }

      console.log(dic)
    userModel.find(dic).sort({"store_id" : -1}).exec(function(e,d){

      var salesMax = 0;
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
          if (d[i].sales > salesMax) {
            salesMax = d[i].sales;
          }
        }
        else{
          if (d[i].store_id == tempId[tempId.length-1]) {
            if (d[i].sales > salesMax) {
              salesMax = d[i].sales;
            }
            var tempObj = {
              date: d[i].date.toJSON(),
              sales: d[i].sales
            };
            objArrs[objArrs.length-1].salesObjs.push(tempObj);
          }
          else{
            if (d[i].sales > salesMax) {
              salesMax = d[i].sales;
            }
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

      res.render('userlist',{
        wanxiangcheng: storeIds,
        floorNums : floorNums,
        thisFloorData: objArrs,
        thisMax : salesMax,
        biz1s : biz1s,
        biz2s : biz2s

      })
    });





  }

});

module.exports = router;
