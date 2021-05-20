const user = require('../../models/user');
const User = require('../../models/user_test');

exports.index = (req, res) => {
    let user = req.user
    // full_name: user.first_name+" "+user.last_name
    res.render('dashboard/index', { title: 'Dashboard', layout: 'dashboard', full_name: user.first_name+" "+user.last_name});
}

