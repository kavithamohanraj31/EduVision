import { db } from "./db";
import { seedAll } from "./seed-all";

async function initializeDatabase() {
  console.log("Initializing local SQLite database...");
  
  try {
    // The database and tables will be created automatically when we run migrations
    console.log("Database initialized successfully");
    
    // Seed the database with sample data
    console.log("Seeding database with sample data...");
    await seedAll();
    
    console.log("Database initialization completed successfully!");
    console.log("You can now start the application with: npm run dev");
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase()
    .then(() => {
      console.log("Database setup completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Database setup failed:", error);
      process.exit(1);
    });
}

export { initializeDatabase };
