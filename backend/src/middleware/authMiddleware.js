const redisClient = require('../app/redisClient');

let validateUser = async (req, res, next) => {
    const sess = req.cookies.sessionId;
    console.log("auth middleware", req.cookies.sessionId);
    username = await redisClient.get(sess);
    console.log(username);
    if (username) {
        req.username = username
        next()
    } else {
        res.json({
            message: "You are not authorized"
        })
    }
}

module.exports = validateUser;