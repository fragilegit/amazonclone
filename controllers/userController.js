const User = require('../models/user');

exports.user_list = (req, res) => {    
    User.findAll()
        .then(users => {
        console.log(users)
        res.sendStatus(200);
        })
        .catch(err => console.log(err));
    
    // res.send('respond with a resource');
    res.send('NOT IMPLEMENTED: User List');
}