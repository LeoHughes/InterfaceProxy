const path = require('path');
const ProxyModel = require('./lib/ProxyModel');

//根据接口配置文件 interface.json 地址初始化 ProxyModel
let pm = new ProxyModel(path.resolve(__dirname, './interface.json'));
// let pm = new ProxyModel(path.resolve(__dirname, './interface.js'));

//因为使用 async/await 所有获取接口数据操作要放在 async 方法下面

(async() => {

  //单个请求  
  let baiduHTML = await pm.send('getBaiduHTML')

  //单个请求并设置额外请求头
  let zhihuData = await pm.send('getZhiHuData', null, { token: '123456' })

  //根据url地址请求
  let baiduHTML2 = await pm.request('http://www.baidu.com')

  //根据httpoption发送请求
  let baiduHTML3 = await pm.send({
    protocol: 'http:',
    hostname: "192.168.1.57",
    name: '测试超时请求',
    port: 80,
    path: "/",
    method: "GET",
    headers: {
      "Content-Type": "text/html;charset=utf-8"
    }
  })

  //单个拼接路径请求
  let zhihuContent = await pm.url('getZhiHuContent', zhihuData.content.stories[0].id, null, { token: '123456' })

  //多请求并分别设置额外请求头  
  let multiData = await pm.all([
    { 'id': 'getZhiHuData', 'param': {}, 'headers': { 'token': '123' } },
    { 'id': 'getBaiduHTML', 'param': { 'name': '1eo', 'age': 26 }, 'headers': { 'token': '456' } }
  ])

  // console.log(baiduHTML)

  // console.log(zhihuData)

  // console.log(baiduHTML2)

  // console.log(baiduHTML3)

  // console.log(zhihuContent)

  // console.log(multiData)

})()