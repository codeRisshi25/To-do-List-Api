import { db } from "./sequelizeConfig.js";

// Sync all models with the database
export const dbSync = () => {
  db.sync({ force: false })
    .then(() => {
      console.log("Database synced");
    })
    .catch((error) => {
      console.error("Error syncing database:", error);
    });
};
