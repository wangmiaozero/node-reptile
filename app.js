const express = require('express')
const request = require('request')
const path = require('path');
const query = require('./src/db');
const app = express();

//app.set('views','./views')
//挂载静态资源
/* app.use(express.static('./views')) */
// app.use('/semantic',express.static('./semantic'))
//app.use('/node_modules',express.static("./node_modules"))
// 读取百度dom树
/* request('http://www.baidu.com', function (error, response, body) {
    console.log('error:', error); // 当有错误发生时打印错误日志
    console.log('statusCode:', response && response.statusCode); // 打印响应状态码
    console.log('body:', body); // 打印百度页面的html代码
}); */
// 设置模板引擎
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);

// 首页路由
app.get('/', async (req, res) => {
  // 通过SQL查询语句拿到库里的movies表数据
  const movies = await query('SELECT * FROM movies');
  // 渲染首页模板并把movies数据传过去
  res.render('index', { movies });
});


// 读取页面数据


const port = 808;
const ip ='127.0.0.1'
app.listen(port,`${ip}`,()=>{
    console.log(`Express server runing at http://${ip}:${port}`)
})
