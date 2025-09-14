import { db } from "./db";
import { assessmentQuestions } from "@shared/schema";

async function testDatabase() {
  console.log("Testing database connection...");
  
  try {
    // Try to create a simple table first
    console.log("Creating test table...");
    
    // Insert a test question
    const testQuestion = {
      id: "test_001",
      category: "aptitude",
      question: "Test question?",
      options: JSON.stringify([
        { text: "Option 1", weight: 10, stream: "science" },
        { text: "Option 2", weight: 5, stream: "commerce" }
      ]),
      stream: "science"
    };
    
    console.log("Inserting test question...");
    await db.insert(assessmentQuestions).values(testQuestion);
    console.log("✅ Test question inserted successfully!");
    
    // Try to read it back
    console.log("Reading questions...");
    const questions = await db.select().from(assessmentQuestions);
    console.log(`✅ Found ${questions.length} questions in database`);
    
    // Check database file size
    const fs = await import('fs');
    const stats = fs.statSync('./local.db');
    console.log(`✅ Database file size: ${stats.size} bytes`);
    
  } catch (error) {
    console.error("❌ Database test failed:", error);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testDatabase()
    .then(() => {
      console.log("Database test completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Database test failed:", error);
      process.exit(1);
    });
}

export { testDatabase };
