const assert = require('assert');
const path = require('path');
const ProxyModel = require('../lib/ProxyModel');

describe('InterfaceProxy', () => {

  let pm = new ProxyModel(path.resolve(__dirname, '../interface.json'))

  it('singleRequest -> response', async() => {

    let response = await pm.send('getZhiHuData')

    assert.ok(response != null)
  });

  it('singleRequestExtend -> response', async() => {

    let response = await pm.send('getTaoBaoContent', null, { q: '卫衣', code: 'utf-8' })

    assert.ok(response != null)

  });

  it('mostRequestExtendByAll -> response', async() => {

    let response = await pm.all([
      { 'id': 'getZhiHuData', 'param': {}, 'headers': { 'token': '123' } },
      { 'id': 'getuser', 'param': { 'name': 'l1eo', 'age': 26 }, 'headers': { 'token': '456' } },
      { 'id': 'getdata', 'param': { 'rows': 1 }, 'headers': { 'token': '789' } }
    ])

    assert.ok(response != null)

  })

  it('mostRequestExtendByRace -> response', async() => {

    let response = await pm.all([
      { 'id': 'getZhiHuData', 'param': {}, 'headers': { 'token': '123' } },
      { 'id': 'getuser', 'param': { 'name': 'l1eo', 'age': 26 }, 'headers': { 'token': '456' } },
      { 'id': 'getdata', 'param': { 'rows': 1 }, 'headers': { 'token': '789' } }
    ], 'race')

    assert.ok(response != null)

  })

})