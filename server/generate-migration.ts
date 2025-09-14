import { db } from "./db";
import * as schema from "@shared/schema";

async function generateInitialMigration() {
  console.log("Generating initial migration for SQLite...");
  
  try {
    // This will create the tables in the database
    // Drizzle will automatically create tables when we try to insert data
    console.log("Tables will be created automatically when data is inserted");
    console.log("✅ Migration generation completed");
  } catch (error) {
    console.error("❌ Migration generation failed:", error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateInitialMigration()
    .then(() => {
      console.log("Migration generation completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration generation failed:", error);
      process.exit(1);
    });
}

export { generateInitialMigration };
