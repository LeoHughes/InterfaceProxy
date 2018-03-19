# InterfaceProxy

[![Build Status](https://www.travis-ci.org/LeoHughes/InterfaceProxy.svg?branch=master)](https://www.travis-ci.org/LeoHughes/InterfaceProxy)
[![npm version](https://badge.fury.io/js/interfaceproxy.svg)](https://badge.fury.io/js/interfaceproxy)


[![NPM](https://nodei.co/npm/interfaceproxy.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/interfaceproxy/)

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

//let pm = new InterfaceProxy(path.resolve(__dirname, './interface.js'));
```

### API

>***InterfaceProxy.mount(filePath)***

```
Mount a new configuration based on the file path and add it to the instantiated InterfaceProxy object
```

>***InterfaceProxy.getHttpOption(interfaceId)***

```
Obtain the corresponding http request option in interface.json based on the interface id
```

>***InterfaceProxy.request(url)***

```
Request initiated based on url address
```

```js
  let resData = await pm.request('http://www.baidu.com')
```

* url：[String] Url address


>***InterfaceProxy.send(option[,param])***

```
According to the option to initiate a single interface request
```

* option：[String | Object] Interface id or complete http request parameters (httpOption)
* param: [Object] Relevant parameters required for the request interface
* headers: [Object] Other headers

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
* type:[String] See promise.all and promise.race

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