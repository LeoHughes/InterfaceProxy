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
let ProxyTest = new ProxyModel(path.resolve(__dirname, './interface.json'));
```