var mongoose = require('mongoose');

var storeSchema = mongoose.Schema({
  store_id: Number,
  name: String,
  biz_cat1: String,
  biz_cat2: String
  },{
    collection : 'wanxiangstores'
  }
);


var wanxiangstores = module.exports = mongoose.model('wanxiangstores', storeSchema);
