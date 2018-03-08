/*
 * @Author: Nico 
 * @Date: 2018-03-08 16:16:23 
 * @Last Modified by: Nico
 * @Last Modified time: 2018-03-08 16:58:38
 */
const assert = require('assert');
const path = require('path');
const ProxyModel = require('../lib/ProxyModel');

describe('singleRequest', () => {

    let pm = new ProxyModel(path.resolve(__dirname, '../interface.json'));

    it('singleRequest -> response', async() => {

        let response = await pm.send('getZhiHuData');
        console.log(response)
        assert.ok(response != null);
    });

    it('singleRequestExtend -> response', async() => {

        let response = await pm.send('getZhiHuData', null, { token: '1234567' })
        console.log(response)
        assert.ok(response != null);

    });

})