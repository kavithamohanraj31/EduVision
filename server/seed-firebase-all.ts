import { seedAssessmentQuestions } from './seed-firebase-assessment-questions';
import { seedCSVData } from './seed-firebase-csv-data';

async function seedAll() {
  try {
    console.log('🌱 Starting Firebase seeding process...');
    
    await seedAssessmentQuestions();
    await seedCSVData();
    
    console.log('🎉 All Firebase data seeded successfully!');
  } catch (error) {
    console.error('💥 Firebase seeding failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedAll();
}
