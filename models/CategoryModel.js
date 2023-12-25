var mongoose = require('mongoose');
var CategorySchema = mongoose.Schema(
   {

      name: {
         type: String,
         required: [true, 'Name can not be empty']
      },
      description: String
   }
);
var CategoryModel = mongoose.model('categorys', CategorySchema);
module.exports = CategoryModel;