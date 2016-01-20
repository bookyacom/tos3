'use strict';

const AWS = require('aws-sdk');
const got = require('got');
const uuid = require('uuid');
const assert = require('assert');
const fileType = require('file-type');
const objectAssign = require('object-assign');

module.exports = function(config){
  assert(config && config.ACCESS_KEY && config.SECRET_KEY && config.BUCKET && config.ACL, 'required property are not available');

  AWS.config.update({
    accessKeyId: config.ACCESS_KEY,
    secretAccessKey: config.SECRET_KEY
  });

  const s3 = new AWS.S3();

  return function(url, name, params) {
    assert(url, 'url is required');

    // get default name from uuid
    name = name || uuid.v1();

    // allow user to pass along extra aws params
    params = objectAssign({}, params, {
      Bucket: config.BUCKET,
      ACL: config.ACL
    });

    return got(url, { encoding: null })
      .then(function(res) {
        let chuck = res.body;
        assert(chuck, 'no return value from URL');

        let type = fileType(new Buffer(chuck));
        assert(type, 'buffer object type is unable to identify');

        params = objectAssign(params, {
          Key: `${name}.${type.ext}`,
          Body: chuck,
          ContentType: type.mime,
        });

        return new Promise(function(resolve, reject) {
          s3.upload(params, function(err, data) {
            if (err) {
               return reject(err);
            }
            resolve(data.Location);
          });
        });
      });
  };
};
