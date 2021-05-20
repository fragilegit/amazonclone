const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');
const password_helper = require('../helpers/password');

const User = db.define('User', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: { type: DataTypes.STRING, required: true, unique: true },
    password: DataTypes.STRING,
    password_salt: { type: DataTypes.STRING, required: true }
});


User.authenticate = async (email, password, callback) => {
    const user = await User.findOne({ 
        where: { email: email } 
    });

    if (!user) {
        return callback(null, null);
    }
    
    password_helper.verify(password, user.password, (err, result) => {
        if (err) {
            return callback(err, null);
        }

        if (result === false) {
            return callback(err, null);
        }

        user.password = undefined;

        callback(err, user);
    });
}

User.fullName = () =>{
    return this.first_name+" "+this.last_name;
}
module.exports = User;