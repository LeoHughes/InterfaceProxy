const path = require('path');
const ProxyModel = require('./mod/ProxyModel');

//根据接口配置文件 interface.json 地址初始化 ProxyModel
let ProxyTest = new ProxyModel(path.resolve(__dirname, './interface.json'));

//因为使用 async/await 所有获取接口数据操作要放在 async 方法下面
(async () => {

  //获取多个接口数据  
  let data1 = await ProxyTest.all([
    { 'id': 'getuser', 'param': { 'name': 'l1eo', 'age': 26 } },
    {'id': 'getdata', 'param': {'rows': 1}}
  ]);

  //获取单个接口数据  
  let data2 = await ProxyTest.send('getdata');

  console.log(data1);

  console.log(data2)
  
})()
