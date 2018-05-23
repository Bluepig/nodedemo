var express = require('express');

var router = express.Router();
var userModel = require('../models/usermodel.js');
var storename = require('../models/storename.js');


var biz1s, biz2s;
var thisFloorIDs = [];
// create an array to store

var biz2ar  ;
var storeArray = [];
var biz1ar ;

function sortID(a,b) {
  if (a._id < b._id )
  return -1;
  if (a._id  > b._id )
  return 1;
  return 0;
}
function sortID2(a,b) {
  if (a.store_id < b.store_id )
  return -1;
  if (a.store_id  > b.store_id )
  return 1;
  return 0;
}

router.get('/', function(req, res) {
  userModel.aggregate([
    {$sort:{"store_id":1}},
    {
      $group:{"_id":"$store_id"
    }}
  ]
).exec(function ( e, d ){
  storeIds = d;
  //storeIds.sort(sortID);
});
biz2ar= [];
storename.aggregate([
  {$sort:{"biz_cat2":1}},
  {$group:{"_id":"$biz_cat2"}}
]
).exec(function ( e, d ){
  biz2s = d;
  for (var i = 0; i < biz2s.length; i++) {
    biz2ar.push({biz_cat2:biz2s[i]._id, children:[]});
  }

});

biz1ar= [];
storename.aggregate([
  {$sort:{"biz_cat1":1}},
  {$group:{"_id":"$biz_cat1"}}
]
).exec(function (e, d){
  biz1s = d;
  for (var i = 0; i < biz1s.length; i++) {
    biz1ar.push({biz_cat1:biz1s[i]._id, children:[]});
  }
});

storename.find({}).exec(function(e,users){
  users.forEach(function(el){
    biz1ar.forEach(function(ee){
      if(el.biz_cat1 == ee.biz_cat1 && !ee.children.includes(el.biz_cat2)){
        ee.children.push(el.biz_cat2);
      }
    });
    biz2ar.forEach(function(ll){
      if (el.biz_cat2 == ll.biz_cat2 && !ll.children.includes({name:el.name, store_id:el.store_id})){
        ll.children.push({name:el.name, store_id:el.store_id});
      }
    });
  });
  for (var i = 0; i < biz1ar.length; i++) {
    biz1ar[i].name1 = "heading" + i;
    biz1ar[i].name2 = "collapse" + i;
  }



  res.render('userlist',{
    title: "Wanxiangcheng Data Visualizations",
    biz1ar : biz1ar,
    biz2ar : biz2ar
  })
});





});
module.exports = router;
