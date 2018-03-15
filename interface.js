module.exports = {
  project: "Interface-proxy",
  version: "1.0.0",
  servers: [{
      id: "localhost",
      name: "localhost",
      timeOut: 2000,
      protocol: 'http:',
      hostname: "127.0.0.1",
      port: 3000
    },
    {
      id: "zhihu",
      name: "知乎",
      timeOut: 5000,
      hostname: "news-at.zhihu.com",
      port: 80
    }
  ],
  interfaces: [{
      id: "getuser",
      name: "获取用户信息",
      path: "/getuser",
      serverId: "localhost",
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      param: {
        name: "",
        age: ""
      }
    },
    {
      id: "getdata",
      name: "获取数据列表",
      path: "/getdata",
      serverId: "localhost",
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      param: {
        rows: ""
      }
    },
    {
      id: "getZhiHuData",
      name: "获取知乎日报最新消息",
      path: "/api/4/news/latest",
      serverId: "zhihu",
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      param: {},
      timeOut: 6000
    },
    {
      id: "getZhiHuContent",
      name: "获取知乎日报最新消息详情",
      path: "/api/4/news/",
      serverId: "zhihu",
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      param: {
        id: ""
      }
    }
  ]
};