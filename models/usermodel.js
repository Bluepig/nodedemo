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
wanxiangSchema.statics.findByName = function(name,cb){
    this.find({Biz_cat2:new RegExp(name,'i')},cb)
}
wanxiangSchema.statics.findByStore = function(floor,cb){
    this.find({"store_id":floor},cb)
}


var wanxiangcheng = module.exports = mongoose.model('wanxiangcheng', wanxiangSchema);

// wanxiangcheng.findByName('其他配饰',function(err,persons){
//   console.log("---");
//   for (var i = 0; i < 5; i++) {
//     console.log(persons[i]);
//   }
// });
// query/aggregate
