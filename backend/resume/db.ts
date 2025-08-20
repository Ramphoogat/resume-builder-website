import { SQLDatabase } from "encore.dev/storage/sqldb";

export const resumeDB = new SQLDatabase("resume", {
  migrations: "./migrations",
});
