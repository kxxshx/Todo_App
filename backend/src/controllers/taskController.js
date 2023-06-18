const redisClient = require('../app/redisClient');
const moment = require("moment")

//Fetching all Todos
exports.getTodos = (async (req, res) => {
    const id = req.query.id;
    console.log("Cookies :", req.cookies.sessionId);
    if (id) {
        console.log(id)
        pool.query('select * from Tasks where task_complete_at IS NULL and task_id=? ', [id],
            function (error, results) {
                if (error) {
                    res.json({ error: error })
                } else {
                    res.json({ data: results })
                };
            });
    }
    else {
        pool.query('SELECT * FROM Tasks where task_complete_at IS NULL and created_by=?',
            [req.username], (err, rows) => {
                if (!err){
                    // console.log(rows)
                    res.json({ data: rows });
                }else
                    res.json({ error: err });
            })
    }

});

//Inserting new Todos
exports.addTodos = (async (req, res) => {
    // Validate request
    if (!req.body.task_desc || !req.body.task_name) {
        res.json({
            message: "Todo description and/or name can not be empty"
        });
    }
    else {
        console.log("Cookies :", req.cookies.sessionId);
        console.log(req.username);
        // let date = new Date()
        // let day = date.getDate();
        // let month = date.getMonth() + 1;
        // let year = date.getFullYear();
        // let create_at = `${year}-${month}-${day}`;
        // console.log(create_at)

        pool.query("INSERT INTO Tasks(created_by, task_name, task_desc ) values (?,?,?)",
            [req.username, req.body.task_name, req.body.task_desc],
            function (error, results) {
                if (error) {
                    res.json({ message: error })
                } else {
                    res.json({
                        data: {
                            task_id: results.insertId,
                        },
                        message: 'New todo has been created successfully.'
                    })
                };
            });
    }
})

//Updating a ToDo by id
exports.updateTodos = ((req, res, next) => {
    if (!req.body.task_id) {
        return res.status(400).send({
            message: "No ToDo Id found"
        })
    }
    console.log(req.body.task_id);
    console.log(req.body.task_desc);
    console.log(req.username);
    pool.query('UPDATE `Tasks` SET `task_name`=?,`task_desc`=? where `task_id`=? and  `created_by` = ?',
        [req.body.task_name, req.body.task_desc, req.body.task_id, req.username],
        function (error, results, fields) {
            if (error) {
                res.json({ message: 'Cannot update task' })
            } else {
                res.json({
                    data: results,
                    message: "todo has been updated successfully"
                })
            };
        })
});

//Deleting a Todo by id
exports.deleteTodos = ((req, res) => {
    console.log(req.body);
    pool.query('DELETE FROM `Tasks` WHERE `task_id`=? and `created_by`=?',
        [req.body.task_id, req.username], function (error, results) {
            if (error) {
                res.json({ message: "Cannot delete task" });
            }
            else {
                res.json({ message: 'Todo has been deleted!' })
            };
        });
});

// Completing a Todo
exports.completeTodos = ((req, res) => {
    // let date = new Date().toJSON().slice(0, 10); //moment()
    // console.log(date);

    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    // prints date & time in YYYY-MM-DD format
    console.log(year + "-" + month + "-" + date+ " " + hours + ":" + minutes + ":" + seconds);
    let complete_at = year+"-"+month+"-"+date+ " " + hours + ":" + minutes + ":" + seconds
    // let date = moment().format("MMM Do YY");
    // console.log("comp>>>",date);
    pool.query('UPDATE `Tasks` SET  `task_complete_at`=? where `task_id`=? and `created_by`=?',
        [complete_at,req.body.task_id, req.username], function (error, results) {
            console.log("complete>>>>>",results);
            if (error) {
                res.json({ message: error });
            }
            else {
                res.json({ message: 'Todo has been completed!' })
            };
        });
})

//Showing completed Todos
exports.showCompleted = ((req, res) => {
    pool.query('Select task_id ,task_name , task_desc , task_complete_at from Tasks where task_complete_at IS NOT NULL and created_by=?', [req.username],
        function (error, results) {
            if (error) {
                res.json({ message: "Cannot show complete task" });
            }
            else {
                res.json({
                    data: results,
                    message: 'Completed Todo shown!'
                })
            }
        }
    )
}) 