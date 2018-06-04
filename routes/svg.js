var express = require('express');

var router = express.Router();
var storelinks = require('../models/storelinks.js');
var storename = require('../models/storename.js');
var storeLength;
var storeObj = [];
var storeIdArray = [];
router.get('/', function(req, res) {
storeObj = [];
var promise1 = storename.find({});
promise1.then(function(d){
  storeLength = d.length;
  d.forEach(function(el){
    storeIdArray.push(el.store_id);
    storeObj.push({node: el.store_id,name:el.name, parents:[], children:[]});
  });
});
var promise2 = storelinks.aggregate([{$group:{"_id":"$from_node",children: {
      $push: {
        to_node: "$to_node",
        width: "$width"
      }}
    }}]);
promise2.then(function(d){
  d.forEach(function(el){
    var tempIndex = storeIdArray.findIndex(x => x == el._id );
    storeObj[tempIndex].children = el.children;
  });
});
storelinks.aggregate([{$group:{"_id":"$from_node",children: {
        $push: {
          to_node: "$to_node",
          width: "$width"
        }}
      }}]).exec(function(e,d){

      });
storelinks.aggregate([{$group:{"_id":"$to_node",parents: {
            $push: {
              from_node: "$from_node",
              width: "$width"
            }}
          }}]).exec(function(e,d){
            for (var i = 0; i < d.length; i++) {
              var tempIndex = storeIdArray.findIndex(x => x == d[i]._id )
              storeObj[tempIndex].parents = d[i].parents;
            }
            console.log(storeObj);
            res.render("displaysvg",{
              linkdata : storeObj
            });

          });

});
module.exports = router;
