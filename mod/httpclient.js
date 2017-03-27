let http = require('http');
let querystring = require('querystring');

module.exports = (httpOption, param) => {

  return new Promise(function (resolve, reject) {

    let data = [];

    let resContent = {
      'statusCode': '',
      'message': '',
      'content': ''
    }

    httpOption.headers["Content-Length"] = querystring.stringify(param).length;

    let req = http.request(httpOption, (res) => {

      let statusCode = res.statusCode.toString();

      console.log('---start---');
      console.log(`statusCode is ${statusCode}`);

      res.on('data', (chunk) => {
        data.push(chunk);
      })

      res.on('end', () => {
        console.log('---end---');

        resContent.statusCode = res.statusCode;
        resContent.message = res.statusMessage;        

        if (statusCode.indexOf(4) !== -1 || statusCode.indexOf(5) !== -1) {

          resolve(resContent);

        } else {

          try {

            resContent.content = JSON.parse(data.toString('utf-8'));

            resolve(resContent);

          } catch (error) {

            console.log(error);

            resContent.content = data.toString('utf-8');

            resContent.message = error;

            resolve(resContent);
            
          }

        }

      })

    });

    req.on('error', (e) => {
      console.log(e.message);
      reject(e.message);
    })

    if (param) {
      req.write(querystring.stringify(param));
    }

    req.end();

  })

}