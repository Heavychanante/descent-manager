var crypto = require('crypto');
var config = require('./environment');

module.exports.encrypt = function(text){
  var cipher = crypto.createCipher(config.algorithm,config.secrets.encryptionPassword);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}

module.exports.decrypt = function(text){
  var decipher = crypto.createDecipher(config.algorithm,config.secrets.encryptionPassword);
  var decrypted = decipher.update(text,'hex','utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
