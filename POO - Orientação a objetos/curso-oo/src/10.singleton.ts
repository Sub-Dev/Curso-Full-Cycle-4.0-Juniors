class Database {
private static database: Database;
private constructor() {
  console.log("Database connected.....");
}
public static getInstance(): Database {
  if (!Database.database) {
    Database.database = new Database();
  }
  return Database.database;
}
public runQuery(query: string): void {
  console.log(`Running query: ${query}`);
}
}

const database = Database.getInstance();
database.runQuery("SELECT * FROM users");
const database2 = Database.getInstance();
database2.runQuery("SELECT * FROM users");

export {}