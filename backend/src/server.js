import db from "./database/database.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  db.authenticate()
  .then(() => {
  
    db.sync( { alter: true } );
    console.log("Database connected.");
    console.log(`Server running on port ${PORT}`);
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
})