module.exports = {
  project: "Interface-proxy",
  version: "1.0.0",
  servers: [{
      id: "baidu",
      name: "baidu",
      timeOut: 2000,
      protocol: 'http:',
      hostname: "www.baidu.com",
      port: 80
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
      id: "getBaiduHTML",
      name: "获取baidu首页html文档",
      path: "/",
      serverId: "baidu",
      method: "GET",
      headers: {
        "Content-Type": "text/html;charset=utf-8"
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