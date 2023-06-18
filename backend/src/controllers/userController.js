const redisClient = require('../app/redisClient');

//create a login endpoint
exports.login = (async (req, res, next) => {
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;
    const sess = req.sessionID;
    // console.log(sess);

    await redisClient.set(`${sess}`, `${email}`);
    value = await (redisClient.get(`${sess}`))
    // console.log(value);


    if (email && password) {
        query = `SELECT * FROM Users WHERE email = "${value}"`;
        pool.query(query, function (error, results) {
            // If there is an issue with the query, output the error
            console.log(results)
            if (error) {
                res.json({ message: "Some error occured" });
            }
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                if (email === results[0].email && password === results[0].password) {
                    res.json({
                        status: true,
                        data: {
                            session: sess
                        }
                    })
                }
            } else {
                res.json({ message: 'Incorrect Username and/or Password!' });
            }
        });
    } else {
        res.json({ message: "Please enter Username and Password!" });
    }
    res.cookie('sessionId', `${sess}`)
})

//create a signup endpoint
exports.signup = (async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const sess = req.sessionID;
    console.log(username);
    var sql1 = `INSERT INTO Users (name , email , password) VALUES ('${username}','${email}','${password}')`;
    pool.query(sql1, async function (err, result) {
        if (err) {
            res.json({ message: "User Already Exists" })
        }
        else {
            console.log("Entry created");
            res.cookie('sessionId', `${sess}`);
            await redisClient.set(`${sess}`, `${email}`);
            res.status(200)
            res.json({
                data: {
                    username: username,
                    email: email,
                }
            })
        };
    })
})

//Logout 
exports.logout = (req, res) => {
    console.log('dddddddd')
    console.log(req.cookies)
    if (req.cookies.sessionId) {
        delete req.cookies.sessionId;
        // 1. destroy session via expess session
        req.session.destroy();
        // 2. delete key from redis
        redisClient.del(`${req.cookies.sessionId}`, function (err, response) {
            if (response == 1) {
                console.log("Deleted Successfully!")
            } else {
                console.log("Cannot delete")
            }
        })
        res.json({ result: 'SUCCESS' });
    } else {
        res.json({ result: 'ERROR', message: 'User is not logged in.' });
    }
};


