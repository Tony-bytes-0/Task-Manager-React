import { Low, JSONFile } from "lowdb";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

let db = null;

// creating path for database
const __dirname = dirname(fileURLToPath(import.meta.url));

export async function createConnection() {
  // path for db.json
  const file = join(__dirname, "../db.json");

  // database
  const adapter = new JSONFile(file);
  db = new Low(adapter);

  await db.read();

  db.data ||= { tasks: [] };

  await db.write();
}

export const getConnection = () => db;
