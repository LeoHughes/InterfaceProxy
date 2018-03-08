const path = require('path')
const fs = require('fs')
const httpclient = require('./httpclient')


class ProxyModel {

  //将interface的配置挂载到ProxyModel对象上
  constructor(filepath) {

    if (!filepath) throw new Error('Need a interface.json!')

    let interfaces

    try {

      let { ext } = path.parse(filepath)

      if (ext === '.js' || ext === '.json') {

        if (ext === '.json') interfaces = fs.readFileSync(filepath, 'utf-8')

        if (ext === '.js') interfaces = require(filepath)

      } else {

        throw new Error('Only support .js or .json')

      }


    } catch (error) {

      throw error

    }

    try {

      let interfaceData = typeof interfaces === 'object' ? interfaces : JSON.parse(interfaces)

      this.servers = interfaceData.servers
      this.interfaces = interfaceData.interfaces

    } catch (error) {

      throw error

    }

  }

  /**
   * 根据interfaceId获取httpOption
   *
   * @param  {string} interfaceId 接口id
   */
  getHttpOption(interfaceId) {

    let interfaceOption = this.interfaces.find(v => {
      return v.id === interfaceId
    })

    if (!interfaceOption) throw new Error('not find this interface!')

    let serverOption = this.servers.find(v => {
      return v.id === interfaceOption.serverId
    })

    if (!serverOption) throw new Error('not find this server!')

    let httpOption = {
      id: interfaceOption.id,
      desc: interfaceOption.name,
      hostname: serverOption.hostname,
      port: serverOption.port,
      path: interfaceOption.path,
      method: interfaceOption.method,
      headers: interfaceOption.headers,
      timeOut: interfaceOption.timeOut || serverOption.timeOut
    }

    return httpOption

  }

  /**
   * 发起单个接口请求
   *
   * @param  {string | object} option 接口id | 接口请求的配置
   * @param  {object} param 需要发送到接口的数据
   * @param  {object} headers 额外的请求头
   */
  async send(option, param = {}, headers = {}) {

    const optType = Object.prototype.toString.call(option)

    let opt

    if (optType === '[object String]') {

      opt = this.getHttpOption(option)

    } else if (optType === '[object Object]') {

      opt = option

    } else {

      throw ('option need interfaceId or httpOption!')

    }

    try {

      let data = await httpclient(opt, param, headers)

      return data

    } catch (error) {

      let data = {
        'statusCode': 500,
        'message': error
      }

      return data

    }

  }

  /**
   * 拼接请求路径发起请求
   *
   * @param  {string} id 接口id
   * @param  {string | number} path 需要拼接的路径
   * @param  {object} param 需要发送到接口的数据
   * @param  {object} headers 额外的请求头
   */
  async url(id, path = "", param = {}, headers = {}) {
    let opt = this.getHttpOption(id)

    opt.path += path.toString()

    try {

      let data = await this.send(opt, {}, headers)

      return data

    } catch (error) {

      throw error

    }
  }

  /**
   * 根据配置数组发起多接口请求
   *
   * @param  {array} interfacesArr 接口配置数组
   */
  async all(interfacesArr = []) {

    if (Object.prototype.toString.call(interfacesArr) !== '[object Array]') {
      throw new Error('need interface array!')
    }

    if (interfacesArr.length === 0) throw new Error('interfacesArr is empty!')

    let proxyModel = this
    let data = {}

    let sendPromises = interfacesArr.map(element => {
      return httpclient(proxyModel.getHttpOption(element.id), element.param, element.headers)
    })

    data = await Promise.all(sendPromises)

    return data

  }

}


module.exports = ProxyModel