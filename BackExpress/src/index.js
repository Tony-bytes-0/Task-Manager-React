import app from "./app.js";
import "dotenv/config";

app.listen(process.env.SERVER_PORT);
console.info(
  `Server is running on http://127.0.0.1:${process.env.SERVER_PORT}/api`
);
