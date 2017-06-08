const path = require('path');
const ProxyModel = require('./mod/ProxyModel');

//根据接口配置文件 interface.json 地址初始化 ProxyModel
let pm = new ProxyModel(path.resolve(__dirname, './interface.json'));

//因为使用 async/await 所有获取接口数据操作要放在 async 方法下面

(async() => {

  //获取单个接口数据  
  let zhihuData = await pm.send('getZhiHuData')

  let zhihuContent = await pm.url('getZhiHuContent', zhihuData.content.stories[0].id)

  //获取多个接口数据  
  let localdata = await pm.all([
    { 'id': 'getuser', 'param': { 'name': 'l1eo', 'age': 26 } },
    { 'id': 'getdata', 'param': { 'rows': 1 } }
  ])

  console.log(zhihuData)

  console.log(zhihuContent)

  console.log(localdata)

})()