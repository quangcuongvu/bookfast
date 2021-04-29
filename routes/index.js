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
        var max_page=Math.floor(count/pageOptions.limit)-1;
        res.render('index', { title: 'Trang chủ',data:dulieu,currentpage:pageOptions.page,next:next,previous:previous,max_page:max_page });
        
      })
    });
});



router.get('/category/*.:cat_id.html', function(req, res, next) {
  var category=req.params.cat_id;
  const page= parseInt(req.query.page, 10) || 1;
  const limit= parseInt(req.query.limit, 10) || 24;

  if (page <0){
    page=1
  }
  const page_next=page+1;
  const page_previous=page-1;
  const startIndex=(page-1)*limit;
  const endIndex=page*limit;

  bookModel.find({cat_id: category},(error,data)=>{
    if(error){
      console.log(error)
    }else
    {
      max_page=Math.ceil(data.length/limit);
      console.log(max_page)
      const dulieu=data.slice(startIndex,endIndex)
      res.render('category', { title: 'Danh mục sản phẩm',data:dulieu,currentpage:page,next:page_next,previous:page_previous,max_page:max_page });   
    }

    
  });

});

router.get('/author/:author_unicode.html', function(req, res, next) {
  var author=req.params.author_unicode;
  const page= parseInt(req.query.page, 10) || 1;
  const limit= parseInt(req.query.limit, 10) || 24;

  if (page <0){
    page=1
  }
  const page_next=page+1;
  const page_previous=page-1;
  const startIndex=(page-1)*limit;
  const endIndex=page*limit;

  bookModel.find({author_unicode: author},(error,data)=>{
    if(error){
      console.log(error)
    }else
    {
      max_page=Math.ceil(data.length/limit);
      console.log(max_page)
      const dulieu=data.slice(startIndex,endIndex)
      res.render('author', { title: 'Tác giả',data:dulieu,currentpage:page,next:page_next,previous:page_previous,max_page:max_page });   
    }

   
  });

});

router.get('/chi-tiet/*.:id_book.html', function(req, res, next) {
    var idsanpham = req.params.id_book;
    bookModel.findOne({id_book: idsanpham}, function(err, data) {
      
      res.render('sp-chi-tiet',{title:'Trang chi tiết sản phẩm',data:data});
    });
  
});


router.get('/search/', function(req, res, next) {
  var searchText =req.query.searchText !== undefined ? req.query.searchText : searchText;
  var searchText=searchText.trim()
  var searchText=searchText
  var TextUnicode=KhongDau(searchText, ["chuyen", "url"]).toLowerCase()
  console.log(searchText)
  console.log(TextUnicode)
  
  bookModel.find({
    $or:[
        {name_unicode: {$regex: TextUnicode}},
        {author_unicode: {$regex: TextUnicode}},
        
        ]})
    .sort('price_book')
    .limit(24)
    .exec(function(err, dulieu) {
      
        res.render('search', { title: 'Tìm kiếm sản phẩm',data:dulieu});   
      })
});

module.exports = router;
