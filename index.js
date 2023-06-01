require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const cloudinary = require('cloudinary');

const connect = require('./utils/db/connect.js');

const platesRouter = require('./routes/plates.routes.js')
const ingredientsRouter = require('./routes/ingredients.routes.js')
const userRouter = require('./routes/user.routes.js');
const userDataRouter = require('./routes/userData.routes.js');

const DB_URL = process.env.DB_URL;

connect();

const PORT = process.env.PORT || 3000;
const server = express();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET
});

//JSWBTKN
server.set("secretKey", "moneHeistApi");

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(express.static(path.join(__dirname, 'public')));

//Passport
require('./utils/authentication/passport.js');

server.use(session({
    secret: "Hola mundo",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    },
    store: MongoStore.create({
        mongoUrl: DB_URL
    })

}));

server.use(passport.initialize());
server.use(passport.session());

server.get('/', (req,res) => {
    res.json("Bienvenido a ComidaPorRaciones!");
});

server.use('/user', userRouter);
server.use('/user-data', userDataRouter);
server.use('/plates', platesRouter);
server.use('/ingredients', ingredientsRouter);


server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Unexpected error');
});

server.listen(PORT, () => {
    console.log(`El servidor está ecuchando en http://localhost:${PORT}`);
});

module.exports = server;