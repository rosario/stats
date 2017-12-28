const express    = require('express')
const bodyParser = require('body-parser');
const _          = require("lodash");
const app        = express()

const {postHandler, getHandler}  = require("./handlers")

app.use(bodyParser.json());

app.listen(3000, () => console.log('Example app listening on port 3000!'));

app.post('/courses/:courseId', (req, res) => {
  const userId = req.headers["x-user-id"];
  const courseId = req.params.courseId
  const stats = req.body;

  console.log(courseId, userId, stats);
  postHandler(courseId, userId, req.body )

  res.sendStatus(200);
});


app.get('/courses/:courseId', (req, res) => {
    const userId = req.headers["x-user-id"];
    const courseId = req.params.courseId

    let stats = getHandler(courseId, userId);
    res.status(200).send(stats);
});


