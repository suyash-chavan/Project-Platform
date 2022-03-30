require('dotenv').config();
require('express-async-errors');

const express = require('express');
const https = require("https");
const fs = require("fs");
const morgan = require('morgan');
const cors = require('cors');

const auth = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));

const options = {
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./cert.pem")
};

// routes
app.get('/', (req, res) => res.status(200).send('I am alive'));
app.use('/auth', auth);
app.use(error); // should be last

const port = process.env.PORT || 8000;
const proxy = process.env.PROXY;

app.listen(port, () => console.log(`Express listening on port ${port}!`));

https.createServer(options, app).listen(proxy);
