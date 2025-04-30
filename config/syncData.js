const {db} = require('./sequelizeConfig')
const users = require('../models/Users');    
const Task = require('../models/Task');    

// Sync all models with the database
db.sync({ force: false })
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
