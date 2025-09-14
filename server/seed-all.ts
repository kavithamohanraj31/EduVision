import { seedAssessmentQuestions } from "./seed-assessment-questions";
import { seedCSVData } from "./seed-csv-data";

async function seedAll() {
  console.log("Starting complete database seeding...");
  
  try {
    // Seed assessment questions
    await seedAssessmentQuestions();
    
    // Seed CSV data (colleges and career paths)
    await seedCSVData();
    
    console.log("All data seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedAll()
    .then(() => {
      console.log("Database seeding completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Database seeding failed:", error);
      process.exit(1);
    });
}

export { seedAll };
