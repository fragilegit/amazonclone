'use strict';

const LEN = 256;
const SALT_LEN = 64;
const ITERATIONS = 1000;
const DIGEST = 'sha256';


const crypto = require('crypto');


module.exports.hashPassword = (password, salt, callback) => {
    const len = LEN / 2;

    if (3 === arguments.length) {
        crypto.pbkdf2(password, salt, ITERATIONS, len, DIGEST, (err, derivedKey) => {
            if (err) {
                return callback(err);
            }

            return callback(null, derivedKey.toString('hex'));
        });
    } else {
        // console.log()
        // callback = salt;
        crypto.randomBytes(SALT_LEN / 2, (err, salt) => {
            if (err) {
                return callback(err);
            }

            salt = salt.toString('hex');
            crypto.pbkdf2(password, salt, ITERATIONS, len, DIGEST, (err, derivedKey) => {
                if (err) {
                    return callback(err);
                }
                callback(null, derivedKey.toString('hex'), salt)
            })
        })
    }

}

module.exports.verify = (password, hash, salt, callback) =>{
    this.hashPassword(password, salt, (err, hashedPassword)=>{
        if(err){
            return callback(err)
        }
        console.log('passed error')
        console.log(hashedPassword);
        console.log(hash);
        if(hashedPassword === hash){
            callback(null, true);
        }else{
            callback(null, true);
        }
    })
}
// .hash = hashPassword;