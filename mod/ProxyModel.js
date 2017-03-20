let path = require('path');
let fs = require('fs');
let httpclient = require('./httpclient');


class ProxyModel {

  constructor(filepath) {

    _getInterfaces.call(this, filepath);

  }

  //get httpOption from interfaceId  
  getHttpOption(interfaceId) {

    let interfaceOption = this.interfaces.find((v) => {
      return v.id === interfaceId;
    })

    if (!interfaceOption) throw new Error('not find this interface!');

    let serverOption = this.servers.find((v) => {
      return v.id === interfaceOption.serverId;
    })

    if (!serverOption) throw new Error('not find this server!');

    let httpOption = {
      hostname: serverOption.hostname,
      port: serverOption.port,
      path: interfaceOption.path,
      method: interfaceOption.method,
      headers: interfaceOption.headers
    }

    return httpOption;

  }

  //launching a single request  
  async send(option, param = {}) {

    const optType = Object.prototype.toString.call(option);

    let opt;
    
    if (optType === '[object String]') {
      opt = this.getHttpOption(option);
    } else if (optType === '[object Object]') {
      opt = option;
    } else {
      throw ('option need interfaceId or httpOption!');
    }

    try {
      let data = await httpclient(opt, param);

      return data;
    } catch (error) {
      
      let data = {
        'statusCode': 500,
        'message': error
      };

      return data;

      console.log(error);
    }

  }

  //launching request with url
  async url(id, path = "") {
    let opt = this.getHttpOption(id);

    opt.path += path;

    try {
      let data = await this.send(opt);

      return data;
    } catch (error) {
      throw error;
    }
  }

  //launching multiple  requests
  async all(interfacesArr=[]) {

    if (Object.prototype.toString.call(interfacesArr) !== '[object Array]') {
      throw ('need interface array')
    }

    if (interfacesArr.length === 0) throw ('interfacesArr is empty!');

    let proxyModel = this;    
    let data = {};
    
    for (let i = 0; i < interfacesArr.length; i++) {
      let element = interfacesArr[i];
      
      try {
        data[element.id] = await proxyModel.send(element.id, element.param);
      } catch (error) {
        data[element.id] = {};

        console.log(error);
      }
      
    }

    return data;

  }

}


module.exports = ProxyModel;


//get interfaces from filepath
function _getInterfaces(filepath) {

  if (!filepath) throw 'Need a interface.json!';

  let interfaces;

  try {
    interfaces = fs.readFileSync(filepath, 'utf-8');
  } catch (error) {
    throw error;
  }

  try {
    let interfaceData = JSON.parse(interfaces);

    this.servers = interfaceData.servers
    this.interfaces = interfaceData.interfaces;

  } catch (error) {
    throw error;
  }

}