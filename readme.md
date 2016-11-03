# tos3 [![Build Status](https://travis-ci.org/bookyacom/tos3.svg?branch=master)](https://travis-ci.org/bookyacom/tos3) [![Dependency Status](https://gemnasium.com/badges/github.com/bookyacom/tos3.svg)](https://gemnasium.com/github.com/bookyacom/tos3)
> upload to s3 from external GET url

## Install
```sh
$ npm install --save tos3
```

## Usage
```js
var tos3 = require('tos3');
var url = 'http://www.cats.org.uk/uploads/branches/211/5507692-cat-m.jpg';
var uploader = tos3(config);

uploader(url)
  .then(function(url) {
    // new url
  });
```

## API
### config
Type: `Object`  
AWS config properties

#### config.ACCESS_KEY `required`
Type: `String`  
AWS S3 access key

#### config.SECRET_KEY `required`
Type: `String`  
AWS S3 secret key

#### config.BUCKET `required`
Type: `String`  
AWS S3 Bucket name

#### config.ACL `required`
Type: `String`  
AWS S3 ACL

### uploader(url, name, params)
#### url `required`
Type: `String`  
Url to query from

#### name
Type: `String`  
Default: `uuid.v1()`  
New name for the file or default to auto generate from uuid

#### params
Type: `Object`  
Default: `{}`  
Extra params to pass along S3 `upload` [params](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property)

## Related
- [AWS S3](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property)

## License
MIT © [Yu-Jin](https://github.com/yujinlim)

[travis-badge]: http://img.shields.io/travis//tos3.svg?style=flat-square
[travis-link]: https://travis-ci.org//tos3

[gemnasium-badge]: http://img.shields.io/gemnasium//tos3.svg?style=flat-square
[gemnasium-link]: https://gemnasium.com//tos3

[coveralls-badge]: http://img.shields.io/coveralls//tos3.svg?style=flat-square
[coveralls-link]: https://coveralls.io/r//tos3
