var mongoose = require('mongoose');

var wanxiangSchema = mongoose.Schema({
  store_id: Number,
  date:Date,
  Biz_cat1: String,
  Biz_cat2: String,
  first_date: Date,
  room: String,
  store_area:Number,
  floor: String,
  sales: Number
  },{
    collection : 'wanxiangcheng'
  }
);

var wanxiangcheng = module.exports = mongoose.model('wanxiangcheng', wanxiangSchema);

// query/aggregate
