# InterfaceProxy

[![Build Status](https://www.travis-ci.org/LeoHughes/InterfaceProxy.svg?branch=master)](https://www.travis-ci.org/LeoHughes/InterfaceProxy)
[![npm version](https://badge.fury.io/js/interfaceproxy.svg)](https://badge.fury.io/js/interfaceproxy)
[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)


[![NPM](https://nodei.co/npm/interfaceproxy.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/interfaceproxy/)

```
 Need nodejs >= 7.6.0
```

### How to use

1.在json文件或js中定义请求的服务器地址和与接口相关的配置

2.实例化ProxyModel类，然后调用


```js
const path = require('path');
const InterfaceProxy = require('interfaceproxy');

let pm = new InterfaceProxy(path.resolve(__dirname, './interface.json'));

//let pm = new InterfaceProxy(path.resolve(__dirname, './interface.js'));
```

### API

>***InterfaceProxy.mount(filePath)***

```
根据文件路径挂载新配置，并将其添加到实例化的InterfaceProxy对象中
```

>***InterfaceProxy.getHttpOption(interfaceId)***

```
根据接口ID在配置文件中获取相应的http请求选项
```

>***InterfaceProxy.request(url)***

```
根据URL地址发起的请求
```

```js
  let resData = await pm.request('http://www.baidu.com')
```

* url：[String] Url address


>***InterfaceProxy.send(option[,param])***

```
根据参数发起单个请求
```

* option：[String | Object] 接口ID或完整的http请求参数（httpOption）
* param: [Object] 请求接口所需的相关参数
* headers: [Object] 额外的headers参数

```js
  let resData = await pm.send('getBaiduHTML')

  let resData = await pm.send('getZhiHuData', null, { token: '123456' })

  let resData = await pm.send({
    protocol: 'http:',
    hostname: "www.baidu.com",
    port: 80,
    path: "/",
    method: "GET",
    headers: {
      "Content-Type": "text/html;charset=utf-8"
    }
  })
```

>***InterfaceProxy.url(id, path)***

```
根据接口ID和路径拼接httpOption路径参数，然后请求
```

* id: [String] 接口id
* path: [String] 需要拼接的地址
* param: [Object] 请求接口所需的相关参数
* headers: [Object] 额外的headers参数


>***InterfaceProxy.all(oprionArr)***

```
根据配置数组同时获得多接口数据
```

* oprionArr: [Array] 接口配置数组
* type:[String] all:promise.all,race:promise.race

```js
  let multiData = await pm.all([
    { 'id': 'getZhiHuData', 'param': {}, 'headers': { 'token': '123' } },
    { 'id': 'getBaiduHTML', 'param': { 'name': '1eo', 'age': 26 }, 'headers': { 'token': '456' } }
  ])
```

### Interface Configuration Format Reference

```js
module.exports = {
  project: "Interface-proxy",
  version: "1.0.0",
  servers: [{ //Server address config
      id: "localhost",
      name: "localhost",
      timeOut: 2000, //The number of milliseconds the request times out
      protocol: 'http:',
      hostname: "127.0.0.1",
      port: 3000
    }
  ],
  interfaces: [{ //Request interface address and related configuration
      id: "test",
      name: "testPath",
      path: "/test",
      serverId: "localhost",
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    }
  ]
};

```
