const mongoose = require('mongoose');

const book = new mongoose.Schema({ 
    id_book: {type:Number}, 
    name_book: {type:String},
    name_unicode: {type:String},
    link_book: {type:String},
    img_book: {type:String},
    price_book: {type:Number},
    list_price: {type:Number},
    discount_rate: {type:Number},
    category: {type:String},
    category_unicode:{type:String},
    cat_id:{type:Number},
    name_author:{type:String},
    author_unicode:{type:String},
    id_author:{type:Number},
    source:{type:String},
    source_id:{type:String},
    short_description:{type:String},
    description:{type:String}
},{collection:'books'});

module.exports=mongoose.model('book', book);
