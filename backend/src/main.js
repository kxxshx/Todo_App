const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const session = require('express-session');
const taskRoutes = require('./routes/todoRoutes')
const userRoutes = require('./routes/userRoutes');
const cookieParser = require("cookie-parser");
const cors = require('cors');

global.pool = require('./database/mysqlCon');
app.use(cors(
    {
        origin: "http://localhost:4200",
        credentials: true,
    }
))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cookieParser());

app.use(session({
    // store: new RedisStore({ client: redisClient }),
    secret: 'Sshhh!Secret!',
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: false, //if true:only transmit cookie over https
        httpOnly: true,//if true:prevents client side JS from reading the cookie
        maxAge: 1000 * 60 * 30 //session max age in milliseconds
    }
}
))

// listen for requests
app.use("/", taskRoutes)
app.use("/", userRoutes)


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});