const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { db } = require("./config/sequelizeConfig")
const users = require('./models/Users')

// get the PORT from the .env
const PORT = process.env.PORT || 7000;

// initialize the express app
const app = express()
app.use(cors())


const createUser = async() => {
    try {
        const user = await users.create({
            username:'john doe',
            password: '123pass',
        });
        console.log('user created',user);
        
    }catch(err) {
        console.log("error while creating user : ",err);
        
    }
}

createUser();






app.listen(PORT, () => {
    console.log(`API running on PORT ${PORT}`);
}).on('error', (err) => {
    console.error("Error at server startup:", err.message);
    process.exit(1);
});
