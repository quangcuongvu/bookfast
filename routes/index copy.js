var express = require('express');
var router = express.Router();
var bookModel=require('../model/book');
var KhongDau = require('khong-dau');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200'
});


/* GET home page. */
router.get('/', function(req, res, next) {
  var pageOptions = {
    page: parseInt(req.query.page, 10) || 1,
    limit: parseInt(req.query.limit, 10) || 24, 
  }
  if (pageOptions.page <0){
    pageOptions.page=1
  }

  var next=pageOptions.page +1 ;
  var previous=pageOptions.page-1;
  console.log(next);
  console.log(previous);

  bookModel.find()
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .exec(function(err, dulieu) {
      bookModel.count().exec(function (err, count) {
        var max_page=Math.ceil(count/pageOptions.limit);
        res.render('index', { title: 'Trang chủ',data:dulieu,currentpage:pageOptions.page,next:next,previous:previous,max_page:max_page });
        
      })
    });
});



router.get('/category/:category.html', function(req, res, next) {
  var category=req.params.category;
  var pageOptions = {
    page: parseInt(req.query.page, 10) || 1,
    limit: parseInt(req.query.limit, 10) || 24, 
  }
  if (pageOptions.page <0){
    pageOptions.page=1
  }

  var next=pageOptions.page +1 ;
  var previous=pageOptions.page-1;
  console.log(next);
  console.log(previous);

  bookModel.find({category: category})
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .exec(function(err, dulieu) {
      bookModel.find({category: category}).count().exec(function (err, count) {
        var max_page=Math.ceil(count/pageOptions.limit);
        res.render('category', { title: 'Danh mục sản phẩm',data:dulieu,currentpage:pageOptions.page,next:next,previous:previous,max_page:max_page });    
        
      })
});
 
    
  
});
router.get('/chi-tiet/*.:id_book.html', function(req, res, next) {
    var idsanpham = req.params.id_book
    bookModel.findOne({id_book: idsanpham}, function(err, data) {
      res.render('chi-tiet-san-pham',{title:'Trang chi tiết sản phẩm',data:data});
    });
  
});
router.get('/search/', function(req, res, next) {
  var searchText =req.query.searchText !== undefined ? req.query.searchText : searchText;
  var searchText=searchText.trim()
  var TextUnicode=KhongDau(searchText, ["chuyen", "url"]).toLowerCase()
  console.log(searchText)
  console.log(TextUnicode)
  
  bookModel.find({name_unicode: {$regex: TextUnicode}})
    .limit(24)
    .exec(function(err, dulieu) {
        res.render('search', { title: 'Tìm kiếm sản phẩm',data:dulieu});    
      })
});

module.exports = router;
