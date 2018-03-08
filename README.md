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

```
nodejs >= 7.6.0
```

### How to use

1.在json文件或js中定义好请求的服务器地址以及接口相关配置   
2.实例化ProxyModel类然后调用


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

* option：[String | Object] 接口id（interfaceId）或者 完整的http请求参数(httpOption)
* param: [Object] 请求接口需要的相关参数
* headers: [Object] 额外的请求头设置


>***ProxyModel.url(id, path)***

```
根据接口id（interfaceId）和 path 重新拼接httpOption的path参数然后再请求
```

* id: [String] 接口id
* path: [String] 需要拼接的地址
* param: [Object] 请求接口需要的相关参数
* headers: [Object] 额外的请求头设置


>***ProxyModel.all(oprionArr)***

```
根据配置数组（interfaces）并发获取多接口数据
```

* oprionArr: [Array] 接口配置数组


### 详细调用及参数规范请查看app.js