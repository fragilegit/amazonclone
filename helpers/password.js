'use strict';

const bcrypt = require('bcryptjs');

module.exports.verify = async (password, hash, callback) =>{
    const is_valid = await bcrypt.compare(password, hash);

    return callback(null, is_valid);   
}