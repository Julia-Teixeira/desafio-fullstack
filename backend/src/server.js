import db from "./database/database.js";
import app from "./app.js";

db.authenticate()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    db.sync();
    console.log("Database connected.");
    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
