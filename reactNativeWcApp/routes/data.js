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

router.post('/write', function(req, res, next) {
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
    var filePath = PATH + type + '.json';
    fs.readFile(filePath, function(err, data) {
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
            title: title,
            id: guidGenerate(),
            time: new Date()
        };
        arr.splice(0, 0, obj);
        //2写入数据
        var newData =JSON.stringify(arr);
        fs.writeFile(filePath, newData, function(err) {
            if(err) {
                return res.send({
                    status: 0,
                    info: '写入数据失败'
                });
            }
            return res.send({
                status: 1,
                info: obj
            });
        });
    });    
});
function guidGenerate() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase()
}
module.exports = router;
