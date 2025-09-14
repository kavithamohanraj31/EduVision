import { db } from './firebase';

const sampleQuestions = [
  // Academic Performance Questions
  {
    id: 'academic_1',
    question: 'What is your current academic performance?',
    category: 'academic',
    stream: 'all',
    options: [
      { value: 'excellent', text: 'Excellent (90%+)', score: { academic: 5, analytical: 4 } },
      { value: 'very_good', text: 'Very Good (80-89%)', score: { academic: 4, analytical: 3 } },
      { value: 'good', text: 'Good (70-79%)', score: { academic: 3, analytical: 2 } },
      { value: 'average', text: 'Average (60-69%)', score: { academic: 2, analytical: 1 } },
      { value: 'below_average', text: 'Below Average (<60%)', score: { academic: 1, analytical: 1 } }
    ],
    type: 'single_choice',
    required: true
  },
  {
    id: 'academic_2',
    question: 'Which subjects do you enjoy the most?',
    category: 'academic',
    stream: 'all',
    options: [
      { value: 'mathematics', text: 'Mathematics', score: { analytical: 5, logical: 5, science: 4 } },
      { value: 'science', text: 'Science (Physics, Chemistry, Biology)', score: { science: 5, analytical: 4, research: 3 } },
      { value: 'languages', text: 'Languages (English, Literature)', score: { communication: 5, creative: 4, social: 3 } },
      { value: 'social_studies', text: 'Social Studies (History, Geography, Civics)', score: { social: 5, communication: 4, analytical: 3 } },
      { value: 'commerce', text: 'Commerce (Economics, Business Studies)', score: { business: 5, analytical: 4, communication: 3 } },
      { value: 'arts', text: 'Arts (Fine Arts, Music, Drama)', score: { creative: 5, artistic: 5, communication: 3 } }
    ],
    type: 'multiple_choice',
    required: true
  }
];

export async function seedAssessmentQuestions() {
  try {
    console.log('🌱 Seeding assessment questions to Firebase...');
    const questionsRef = db.collection('assessmentQuestions');
    
    for (const question of sampleQuestions) {
      await questionsRef.add({
        ...question,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    console.log('✅ Assessment questions seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding assessment questions:', error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedAssessmentQuestions()
    .then(() => {
      console.log("Assessment questions seeding completed");
      process.exit(0);
    })
    .catch(error => {
      console.error("Assessment questions seeding failed:", error);
      process.exit(1);
    });
}