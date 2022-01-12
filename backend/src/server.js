const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mainRouter = require('./routes');
const passport = require('passport');
const cookieParser = require('cookie-parser');

dotenv.config();

const database = require('./database')


const port = process.env.PORT || 9001;

const server = express();

const whitelist = [
    "http://localhost:3000",
    "http://localhost:9001",
];

const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        } else {
            callback(new Error("CORS ISSUES"));
        }
    },
    credentials: true,
}

server.use(cors(corsOptions));
server.use(cookieParser());

server.use(express.json());
server.use("/idkyet", mainRouter)

database.sequelize.sync({force: false}).then(() => {
    server.listen(port, () => {
        console.log("server listening to", port)
    });
});