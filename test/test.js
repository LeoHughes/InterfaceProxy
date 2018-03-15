const assert = require('assert');
const path = require('path');
const ProxyModel = require('../lib/ProxyModel');

describe('InterfaceProxy', () => {

  let pm = new ProxyModel(path.resolve(__dirname, '../interface.json'))

  it('singleURLRequest -> response', async() => {

    let response = await pm.request('http://www.baidu.com')

    assert.ok(response != null)
  });

  it('singleRequest -> response', async() => {

    let response = await pm.send('getZhiHuData')

    assert.ok(response != null)
  });

  it('singleRequestExtend -> response', async() => {

    let response = await pm.send('getZhiHuData', null, { token: '123456' })

    assert.ok(response != null)

  });

  it('mostRequestExtendByAll -> response', async() => {

    let response = await pm.all([
      { 'id': 'getZhiHuData', 'param': {}, 'headers': { 'token': '123' } },
      { 'id': 'getBaiduHTML', 'param': { 'name': 'l1eo', 'age': 26 }, 'headers': { 'token': '456' } }
    ])

    assert.ok(response != null)

  })

  it('mostRequestExtendByRace -> response', async() => {

    let response = await pm.all([
      { 'id': 'getZhiHuData', 'param': {}, 'headers': { 'token': '123' } },
      { 'id': 'getBaiduHTML', 'param': { 'name': 'l1eo', 'age': 26 }, 'headers': { 'token': '456' } }
    ], 'race')

    assert.ok(response != null)

  })

})