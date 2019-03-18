
var http=require("http");
const express = require('express');
const path = require('path');
var app = require('express')();
app.use("/", express.static(path.join(__dirname, "./public")));

app.get('/pages/:id',function(req,res){
	var number = req.params.id;
	console.log(number);
	
    if(number == 1){
        const fs = require('fs');
        var  config = require('./story.json');
	    res.send('<html lang="te" dir="ltr"><head><meta charset="utf-8"><title>Story book</title><style>img {margin: auto;display: block;}.ali {text-align: center;} h3 {text-align:center}button {float: right;font-size: 20;}</style> </head><body><h3>' +config.title_en+ '</h3><br><img  src = '+'/'+config.cover_image+' height=300px; width="300px"><br><h3>'+ config.title+'</h3><button><a href="'+(number - 1 + 2)+'">Nextpage</a></button></body></html>');
	}
	else if(number >= 2){
		const fs = require('fs');
        let data = fs.readFileSync('story.json', (err) => {if (err) throw err;});
        let data1 = JSON.parse(data);
        var pages = data1.pages;
        var currentPage = pages[number -2];
        if(pages[number - 2] == null){
            res.send('<html lang="te" dir="ltr"><head><meta charset="utf-8">  <style> button {font-size: 30;}*{ margin: 0px; padding: 0px;}body{width: 550px;height: 400px;}.n1{ position: relative;top: 250px;left: 600px;}</style></head><body><div><div class="n1"><h1>THE END</h1><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><button style="float:left"><a href="'+(number - 1)+'">Previous Page</a></button></div></body></html>');
        }
	    res.send('<html lang="te" dir="ltr"><head><meta charset="utf-8"><title>Story book</title><style>button {font-size: 20;}img {margin: auto;display: block;}.ali {text-align: center;} h3{text-align:center}</style> </head><body><h3>'+currentPage.english+'</h3><br><img  src = '+'/'+currentPage.image+' height=300px; width="300px"><br><h3>'+ currentPage.telugu+'</h3><button style="float:left"><a href="'+(number - 1)+'">Previous Page</a></button><button style="float: right"><a href="'+(number - 1 + 2)+'">Nextpage</a></button></body></html>');
    }
});
app.listen(3000, function() {
    console.log("Server start");
});