var mongoose = require('mongoose');

var storeLinkSchema = mongoose.Schema({
  from_node: Number,
  to_node: Number,
  width: Number
  },{
    collection : 'wanxiangstorelinks'
  }
);


var storelinks = module.exports = mongoose.model('storelinks', storeLinkSchema);
