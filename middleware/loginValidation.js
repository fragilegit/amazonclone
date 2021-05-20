const { check, validationResult, body } = require('express-validator');

const validation = (req,res,next)=>{
    const { name, email, password, password_confirmation } = req.body
    console.log(name)
    const val_errors = validationResult(req);
    if (!val_errors.isEmpty()) {
        console.log(val_errors);
        return res.status(422).json({ errors: val_errors.array() });
    }
    console.log(val_errors);
    console.log('middleware dwaagggg');
    req.patsy= "I love Patrice Roberts";
    next();
   
}


module.exports = validation;