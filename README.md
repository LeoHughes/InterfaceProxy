# InterfaceProxy
```
|-- README.md
|-- package.json
|-- interface.json	# 接口配置文件
|-- mod           	# 工具源文件
	|-- ProxyModel.js 
	|-- httpclient.js
|-- app.js		# 启动文件
```

### How to use

```js
const path = require('path');
const ProxyModel = require('./mod/ProxyModel');

//根据接口配置文件 interface.json 地址初始化 ProxyModel
let pm = new ProxyModel(path.resolve(__dirname, './interface.json'));
```

### API

>***ProxyModel.getHttpOption(interfaceId)***

```
根据接口id（interfaceId）获得interface.json中相对应的http请求选项（httpOption）
```

```js
let opt = pm.getHttpOption('getZhiHuData')

//{
//  hostname: 'news-at.zhihu.com',
//  port: 80,
//  path: '/api/4/news/latest',
//  method: 'GET',
//  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } 
//}

```

>***ProxyModel.send(option[,param])***

```
根据option发起单个接口的请求
```

* option：<String | Object> 接口id（interfaceId）或者 完整的http请求参数（httpOption）
