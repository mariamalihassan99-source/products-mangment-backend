 const mongoose = require('mongoose');

 const productSchema = new mongoose.Schema({
   title: {
     type: String,
     required: true,
     trim: true
   },
   price: {
     type: Number,
     required: true,
     min: 0.1
   },
   description: {
     type: String,
     maxlength: 500
   },
   category: {
     type: String,
     required: true,
     enum:["electronics", "food", "clothing", "furniture", "other"]
   },
   quantity: {
     type: Number,
     required: true,
     min: 0
   },
   totalProducts: {
     type: Number,
     default: 0
   } ,
   totalValue: {
     type: Number,
     default: 0
   } , 
   stockItems: {
     type: Number,
     min:[3, 'Low stock threshold is 3']
   }
 } , { timestamps: true } );

 const Product = mongoose.model('Product', productSchema);

 module.exports = Product;