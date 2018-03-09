/*
 * @Author: Nico 
 * @Date: 2018-03-08 16:16:23 
 * @Last Modified by: Nico
 * @Last Modified time: 2018-03-08 17:28:12
 */
const assert = require('assert');
const path = require('path');
const ProxyModel = require('../lib/ProxyModel');

describe('InterfaceProxy', () => {

  let pm = new ProxyModel(path.resolve(__dirname, '../interface.json'));

  it('singleRequest -> response', async() => {

    let response = await pm.send('getZhiHuData');

    assert.ok(response != null);
  });

  it('singleRequestExtend -> response', async() => {

    let response = await pm.send('getTaoBaoContent', null, { q: '卫衣', code: 'utf-8' })

    assert.ok(response != null);

  });

  it('mostRequestExtend -> response', async() => {

    let response = await pm.all([
      { 'id': 'getZhiHuData', 'param': {}, 'headers': { 'token': '123' } },
      { 'id': 'getuser', 'param': { 'name': 'l1eo', 'age': 26 }, 'headers': { 'token': '456' } },
      { 'id': 'getdata', 'param': { 'rows': 1 }, 'headers': { 'token': '789' } }
    ])

  })

})