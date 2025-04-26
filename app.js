const express = require('express');
const cors = require('cors');
require('dotenv').config()

// get the PORT from the .env
const PORT = process.env.PORT || 7000;

// initialize the express app
const app = express()
app.use(cors())
app.listen(PORT, () => {
    console.log(`API running on PORT ${PORT}`);
}).on('error', (err) => {
    console.error("Error at server startup:", err.message);
    process.exit(1);
});
