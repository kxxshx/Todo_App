let validateSignUp = async (req, res, next) => {
    // email already exists or not
    // password is between 8 to 32 chars
    let email = req.body.email;
    let password = req.body.password;
    let errors = [];
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')

    if (!(regex.test(email))) {
        errors.push("Please enter valid Email")
    }

    if (password.length < 8 || password.length > 32) {
        errors.push("Password length must be between 8 and 32 characters");
    }

    let user = await pool.query('select * from Users where email = ? ', [email]);

    if (user && user.length) {
        errors.push('Email already exists');
    }

    if (errors.length) {
        res.json({
            message: "Invalid data", errors
        })
    } else {
        next();
    }
}

module.exports = validateSignUp;