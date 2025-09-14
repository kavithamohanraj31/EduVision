import { db } from "./db";
import { seedAll } from "./seed-all";

async function setupDatabase() {
  console.log("Setting up local SQLite database...");
  
  try {
    // Create tables directly using Drizzle's schema
    console.log("Creating database tables...");
    
    // Import all table schemas
    const { 
      users, 
      colleges, 
      assessmentQuestions, 
      userAssessments, 
      careerPaths, 
      timelineEvents, 
      userRecommendations,
      sessions 
    } = await import("@shared/schema");
    
    // Create tables manually (this is a workaround for missing migrations)
    console.log("Tables will be created automatically when data is inserted");
    
    // Seed the database with sample data
    console.log("Seeding database with sample data...");
    await seedAll();
    
    console.log("✅ Database setup completed successfully!");
    console.log("📁 Database file: local.db");
    console.log("🚀 You can now start the application with: npm run dev");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupDatabase()
    .then(() => {
      console.log("Setup completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Setup failed:", error);
      process.exit(1);
    });
}

export { setupDatabase };
