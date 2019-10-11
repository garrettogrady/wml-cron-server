const express = require('express');
const app = express();
const port = 3001;

var redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);

app.get('/raises',  async (req, res) => {
    const hitch = await getAsync('hitch');
    const graze = await getAsync('graze');
    const miso = await getAsync('miso');

    const raises = [hitch, graze, miso];

    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    console.log(raises);

    return res.send(raises);
});

app.listen(port, () => console.log(`example app listening on port ${port}!`))
