import { db } from "./sequelizeConfig.js";

// Sync all models with the database
const dbSync = () => {
  db.sync({ alter: true })
    .then(() => {
      console.log("Database synced");
    })
    .catch((error) => {
      console.error("Error syncing database:", error);
    });
};

dbSync();
