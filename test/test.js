/*
 * @Author: Nico 
 * @Date: 2018-03-08 16:16:23 
 * @Last Modified by: Nico
 * @Last Modified time: 2018-03-08 16:39:06
 */
const assert = require('assert');
const path = require('path');
const ProxyModel = require('../lib/ProxyModel');

describe('singleRequest', () => {

    let pm = new ProxyModel(path.resolve(__dirname, '../interface.json'));

    it('singleRequest --> response', async() => {

        let response = await pm.send('getZhiHuData');
        assert.ok(response != null && response.statusCode === 200);
    });

    it('singleRequestExtend --> response', async() => {

        let response = await pm.send('getZhiHuData', null, { token: '123456' })
        assert.ok(response != null && response.statusCode === 200);

    });

})