# InterfaceProxy

[![Build Status](https://www.travis-ci.org/LeoHughes/InterfaceProxy.svg?branch=master)](https://www.travis-ci.org/LeoHughes/InterfaceProxy)

```
 Need nodejs >= 7.6.0
```

### How to use

1.Define the requested server address and the interface-related configuration in the json file or js.

2.Instantiate the ProxyModel class and then call it.


```js
const path = require('path');
const InterfaceProxy = require('interfaceproxy');

let pm = new InterfaceProxy(path.resolve(__dirname, './interface.json'));

let pm = new InterfaceProxy(path.resolve(__dirname, './interface.js'));
```

### API

>***InterfaceProxy.getHttpOption(interfaceId)***

```
Obtain the corresponding http request option in interface.json based on the interface id
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

>***InterfaceProxy.send(option[,param])***

```
According to the option to initiate a single interface request
```

* option：[String | Object] Interface id or complete http request parameters (httpOption)
* param: [Object] Relevant parameters required for the request interface
* headers: [Object] Other headers


>***InterfaceProxy.url(id, path)***

```
Reconcatenate the httpOption path parameter according to the interface id and path and then request
```

* id: [String] Interface id
* path: [String] Need to splicing address
* param: [Object] Relevant parameters required by the request interface
* headers: [Object] Other headers


>***InterfaceProxy.all(oprionArr)***

```
Multi-interface data is obtained concurrently according to the configuration array
```

* oprionArr: [Array] Interface configuration array


### Interface Configuration Format Reference

```js
module.exports = {
  project: "Interface-proxy",
  version: "1.0.0",
  servers: [{ //Server address config
      id: "localhost",
      name: "localhost",
      timeOut: 2000, //The number of milliseconds the request times out
      hostname: "127.0.0.1",
      port: 3000
    }
  ],
  interfaces: [{ //Request interface address and related configuration
      id: "getuser",
      name: "获取用户信息",
      path: "/getuser",
      serverId: "localhost",
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    }
  ]
};

```