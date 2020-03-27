const crypto = require('crypto');

module.exports = function generateRandomId(){
    return  crypto.randomBytes(4).toString('HEX');
}