const path = require('path');
const ProxyModel = require('./lib/ProxyModel');

//根据接口配置文件 interface.json 地址初始化 ProxyModel
let pm = new ProxyModel(path.resolve(__dirname, './interface.json'));
// let pm = new ProxyModel(path.resolve(__dirname, './interface.js'));

//因为使用 async/await 所有获取接口数据操作要放在 async 方法下面

(async() => {

    //单个请求  
    let zhihuData1 = await pm.send('getZhiHuData')

    //单个请求并设置额外请求头
    let zhihuData2 = await pm.send('getZhiHuData', null, { token: '123456' })

    //单个拼接路径请求
    let zhihuContent = await pm.url('getZhiHuContent', zhihuData1.content.stories[0].id, null, { token: '123456' })

    //多请求并分别设置额外请求头  
    let localdata = await pm.all([
        { 'id': 'getZhiHuData', 'param': {}, 'headers': { 'token': '123' } },
        { 'id': 'getuser', 'param': { 'name': 'l1eo', 'age': 26 }, 'headers': { 'token': '456' } },
        { 'id': 'getdata', 'param': { 'rows': 1 }, 'headers': { 'token': '789' } }
    ])

    console.log(zhihuData1)

    console.log(zhihuData2)

    console.log(zhihuContent)

    console.log(localdata)

})()