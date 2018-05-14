var mongoose = require('mongoose');

var wanxiangSchema = mongoose.Schema({
  store_id: Number,
  date:Date,
  Biz_cat1: String,
  Biz_cat2: String,
  first_date: Date,
  room: String,
  store_area:Number,
  floor: Number,
  sales: Number
  },{
    collection : 'wanxiangcheng'
  }
);
wanxiangSchema.statics.findByName = function(name,cb){
    this.find({Biz_cat1:new RegExp(name,'i')},cb)
}
wanxiangSchema.statics.findByStore = function(floor,cb){
    this.find({"store_id":floor},cb)
}


var wanxiangcheng = module.exports = mongoose.model('wanxiangcheng', wanxiangSchema);


// query/aggregate
