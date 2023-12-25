var mongoose = require('mongoose');
var ToySchema = mongoose.Schema(
   {

      name: {
         type: String,
         required: [true, 'Name can not be empty']
      },
      image: String,
     _national:String, 
      price:String,
      description:String,
      category:{
         type : mongoose.Schema.Types.ObjectId,
         ref: 'categorys'
      }
   }
);
var ToyModel = mongoose.model('toys', ToySchema);
module.exports = ToyModel;