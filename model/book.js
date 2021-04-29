const mongoose = require('mongoose');

const book = new mongoose.Schema({
    cat_id:{type:Number}, 
    id_book: {type:Number}, 
    name_book: {type:String},
    name_unicode: {type:String},
    price_book: {type:Number},
    list_price: {type:Number},
    discount_rate: {type:Number},
    link_book: {type:String},
    img_book: {type:String},
    category: {type:String},
    category_unicode:{type:String},
    name_author:{type:String},
    name_auhtor:{type:String},
    author_unicode:{type:String},
    id_author:{type:Number},
    source:{type:String},
    source_id:{type:String},
    short_description:{type:String},
    description:{type:String},
    list_produce_fahasa:{type:Array},
    list_produce_lazada:{type:Array}

// },{collection:'books_meger2'});
},{collection:'gopnhom'});
module.exports=mongoose.model('book', book);
