var express = require('express');
var router = express.Router();
var fs = require('fs');
var PATH = './public/data/';

/* GET home page. */
router.get('/read', function(req, res, next) {
    var type = req.param('type') || '';
    fs.readFile(PATH + type+ '.json', function(err,data){
        if(err) {
            return res.send({
                status: 0,
                info: '读取数据出现异常'
            });
        }
        var COUNT = 50;
        var obj = [];
        try {
            obj = JSON.parse(data.toString());
        }catch(e) {
            obj = [];
        }
        
        if(obj.length > COUNT) {
            obj = obj.slice(0, COUNT);
        }
        return res.send({
            status: 1,
            data: obj
        });
    });
});

//数据存储模块

router.get('/write', (req, res, next) => {
    // 文件名
    var type = req.param('type') || '';
    // 关键字段
    var url = req.param('url') || '';
    var title = req.param('title') || '';
    var img = req.param('img') || '';
    if(!type || !url || !title ||!img) {
        return res.send({
            status: 0,
            info: '提交的字段不全'
        })
    }
    //1读取文件
    fs.readFile(PATH + type + '.json', function(err,data) {
        if(err) {
            return res.send({
                status: 0,
                info: '读取数据失败'
            })
        }
        var arr = JSON.parse(data.toString());
        var obj = {
            img: img,
            url: url,
            title,
            id: ,
            time: new Date()
        }
    })
})

function guidGenerate() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c))
}
module.exports = router;