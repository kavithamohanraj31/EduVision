import { db } from "./db";
import { assessmentQuestions } from "@shared/schema";

const sampleQuestions = [
  // Aptitude Questions
  {
    id: "apt_001",
    category: "aptitude",
    question: "You are given a sequence: 2, 4, 8, 16, ?. What comes next?",
    options: [
      { text: "24", weight: 0, stream: "arts" },
      { text: "32", weight: 10, stream: "science" },
      { text: "20", weight: 2, stream: "commerce" },
      { text: "18", weight: 1, stream: "vocational" }
    ],
    stream: "science"
  },
  {
    id: "apt_002", 
    category: "aptitude",
    question: "If a train travels 120 km in 2 hours, what is its speed?",
    options: [
      { text: "60 km/h", weight: 10, stream: "science" },
      { text: "240 km/h", weight: 0, stream: "arts" },
      { text: "40 km/h", weight: 2, stream: "commerce" },
      { text: "80 km/h", weight: 5, stream: "vocational" }
    ],
    stream: "science"
  },
  {
    id: "apt_003",
    category: "aptitude", 
    question: "Which number should replace the question mark: 3, 6, 12, 24, ?",
    options: [
      { text: "36", weight: 0, stream: "arts" },
      { text: "48", weight: 10, stream: "science" },
      { text: "30", weight: 2, stream: "commerce" },
      { text: "42", weight: 3, stream: "vocational" }
    ],
    stream: "science"
  },
  {
    id: "apt_004",
    category: "aptitude",
    question: "If 5 machines can produce 100 items in 10 hours, how many items can 8 machines produce in 6 hours?",
    options: [
      { text: "96 items", weight: 10, stream: "science" },
      { text: "120 items", weight: 5, stream: "commerce" },
      { text: "80 items", weight: 2, stream: "arts" },
      { text: "150 items", weight: 0, stream: "vocational" }
    ],
    stream: "science"
  },
  {
    id: "apt_005",
    category: "aptitude",
    question: "What is the next number in the series: 1, 4, 9, 16, 25, ?",
    options: [
      { text: "30", weight: 0, stream: "arts" },
      { text: "36", weight: 10, stream: "science" },
      { text: "32", weight: 2, stream: "commerce" },
      { text: "28", weight: 1, stream: "vocational" }
    ],
    stream: "science"
  },

  // Interest Questions
  {
    id: "int_001",
    category: "interest",
    question: "What type of activities do you enjoy most?",
    options: [
      { text: "Conducting experiments and solving problems", weight: 10, stream: "science" },
      { text: "Managing money and analyzing data", weight: 10, stream: "commerce" },
      { text: "Reading literature and expressing creativity", weight: 10, stream: "arts" },
      { text: "Working with hands and practical skills", weight: 10, stream: "vocational" }
    ]
  },
  {
    id: "int_002",
    category: "interest", 
    question: "Which subject fascinates you the most?",
    options: [
      { text: "Mathematics and Physics", weight: 10, stream: "science" },
      { text: "Economics and Business Studies", weight: 10, stream: "commerce" },
      { text: "History and Literature", weight: 10, stream: "arts" },
      { text: "Technical and Vocational Skills", weight: 10, stream: "vocational" }
    ]
  },
  {
    id: "int_003",
    category: "interest",
    question: "What would you prefer to do in your free time?",
    options: [
      { text: "Read scientific journals and research papers", weight: 10, stream: "science" },
      { text: "Analyze market trends and financial news", weight: 10, stream: "commerce" },
      { text: "Write stories or create art", weight: 10, stream: "arts" },
      { text: "Build or repair things", weight: 10, stream: "vocational" }
    ]
  },
  {
    id: "int_004",
    category: "interest",
    question: "Which career path appeals to you most?",
    options: [
      { text: "Doctor, Engineer, or Scientist", weight: 10, stream: "science" },
      { text: "Accountant, Banker, or Business Manager", weight: 10, stream: "commerce" },
      { text: "Writer, Teacher, or Artist", weight: 10, stream: "arts" },
      { text: "Technician, Mechanic, or Craftsman", weight: 10, stream: "vocational" }
    ]
  },
  {
    id: "int_005",
    category: "interest",
    question: "What type of problems do you like to solve?",
    options: [
      { text: "Mathematical and scientific problems", weight: 10, stream: "science" },
      { text: "Business and financial challenges", weight: 10, stream: "commerce" },
      { text: "Creative and artistic challenges", weight: 10, stream: "arts" },
      { text: "Practical and technical problems", weight: 10, stream: "vocational" }
    ]
  },

  // Personality Questions
  {
    id: "per_001",
    category: "personality",
    question: "How do you prefer to work?",
    options: [
      { text: "Independently with detailed research", weight: 10, stream: "science" },
      { text: "In teams with clear objectives", weight: 8, stream: "commerce" },
      { text: "Creatively with freedom to express", weight: 10, stream: "arts" },
      { text: "Hands-on with practical results", weight: 10, stream: "vocational" }
    ]
  },
  {
    id: "per_002",
    category: "personality",
    question: "What motivates you most?",
    options: [
      { text: "Discovery and innovation", weight: 10, stream: "science" },
      { text: "Success and achievement", weight: 10, stream: "commerce" },
      { text: "Self-expression and creativity", weight: 10, stream: "arts" },
      { text: "Mastery of practical skills", weight: 10, stream: "vocational" }
    ]
  },
  {
    id: "per_003",
    category: "personality",
    question: "How do you handle challenges?",
    options: [
      { text: "Analyze systematically and find solutions", weight: 10, stream: "science" },
      { text: "Plan strategically and execute efficiently", weight: 10, stream: "commerce" },
      { text: "Think creatively and find unique approaches", weight: 10, stream: "arts" },
      { text: "Tackle practically and learn by doing", weight: 10, stream: "vocational" }
    ]
  },
  {
    id: "per_004",
    category: "personality",
    question: "What type of environment do you thrive in?",
    options: [
      { text: "Laboratory or research setting", weight: 10, stream: "science" },
      { text: "Office or corporate environment", weight: 10, stream: "commerce" },
      { text: "Creative studio or cultural setting", weight: 10, stream: "arts" },
      { text: "Workshop or field environment", weight: 10, stream: "vocational" }
    ]
  },
  {
    id: "per_005",
    category: "personality",
    question: "How do you prefer to learn?",
    options: [
      { text: "Through experimentation and analysis", weight: 10, stream: "science" },
      { text: "Through case studies and practical examples", weight: 10, stream: "commerce" },
      { text: "Through discussion and creative exploration", weight: 10, stream: "arts" },
      { text: "Through hands-on practice and demonstration", weight: 10, stream: "vocational" }
    ]
  },

  // Additional Science Stream Questions
  {
    id: "sci_001",
    category: "aptitude",
    question: "Which of these is a renewable energy source?",
    options: [
      { text: "Solar energy", weight: 10, stream: "science" },
      { text: "Coal", weight: 0, stream: "arts" },
      { text: "Natural gas", weight: 2, stream: "commerce" },
      { text: "Nuclear energy", weight: 5, stream: "vocational" }
    ],
    stream: "science"
  },
  {
    id: "sci_002",
    category: "interest",
    question: "What aspect of technology interests you most?",
    options: [
      { text: "Programming and software development", weight: 10, stream: "science" },
      { text: "Digital marketing and e-commerce", weight: 8, stream: "commerce" },
      { text: "Digital art and multimedia", weight: 6, stream: "arts" },
      { text: "Hardware maintenance and repair", weight: 8, stream: "vocational" }
    ],
    stream: "science"
  },

  // Additional Commerce Stream Questions
  {
    id: "com_001",
    category: "aptitude",
    question: "If a product costs ₹100 and is sold at ₹120, what is the profit percentage?",
    options: [
      { text: "15%", weight: 0, stream: "science" },
      { text: "20%", weight: 10, stream: "commerce" },
      { text: "25%", weight: 2, stream: "arts" },
      { text: "12%", weight: 1, stream: "vocational" }
    ],
    stream: "commerce"
  },
  {
    id: "com_002",
    category: "interest",
    question: "What business activity interests you most?",
    options: [
      { text: "Financial analysis and investment", weight: 10, stream: "commerce" },
      { text: "Scientific research and development", weight: 2, stream: "science" },
      { text: "Creative writing and content creation", weight: 3, stream: "arts" },
      { text: "Technical support and maintenance", weight: 4, stream: "vocational" }
    ],
    stream: "commerce"
  },

  // Additional Arts Stream Questions
  {
    id: "art_001",
    category: "interest",
    question: "Which form of expression appeals to you most?",
    options: [
      { text: "Writing and literature", weight: 10, stream: "arts" },
      { text: "Visual arts and design", weight: 10, stream: "arts" },
      { text: "Performing arts and drama", weight: 10, stream: "arts" },
      { text: "Music and composition", weight: 10, stream: "arts" }
    ],
    stream: "arts"
  },
  {
    id: "art_002",
    category: "personality",
    question: "How do you express your creativity?",
    options: [
      { text: "Through writing and storytelling", weight: 10, stream: "arts" },
      { text: "Through visual design and art", weight: 10, stream: "arts" },
      { text: "Through performance and presentation", weight: 10, stream: "arts" },
      { text: "Through music and sound", weight: 10, stream: "arts" }
    ],
    stream: "arts"
  },

  // Additional Vocational Stream Questions
  {
    id: "voc_001",
    category: "interest",
    question: "What practical skill would you like to master?",
    options: [
      { text: "Automotive repair and maintenance", weight: 10, stream: "vocational" },
      { text: "Electrical work and electronics", weight: 10, stream: "vocational" },
      { text: "Carpentry and woodworking", weight: 10, stream: "vocational" },
      { text: "Culinary arts and food service", weight: 10, stream: "vocational" }
    ],
    stream: "vocational"
  },
  {
    id: "voc_002",
    category: "personality",
    question: "What type of work environment do you prefer?",
    options: [
      { text: "Workshop or garage", weight: 10, stream: "vocational" },
      { text: "Laboratory", weight: 3, stream: "science" },
      { text: "Office", weight: 2, stream: "commerce" },
      { text: "Studio", weight: 4, stream: "arts" }
    ],
    stream: "vocational"
  }
];

export async function seedAssessmentQuestions() {
  console.log("Seeding assessment questions...");
  
  try {
    // Clear existing questions
    await db.delete(assessmentQuestions);
    
    // Insert new questions
    for (const question of sampleQuestions) {
      // Convert options array to JSON string for SQLite
      const processedQuestion = {
        ...question,
        options: JSON.stringify(question.options),
      };
      await db.insert(assessmentQuestions).values(processedQuestion);
    }
    
    console.log(`Successfully seeded ${sampleQuestions.length} assessment questions`);
  } catch (error) {
    console.error("Error seeding assessment questions:", error);
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
    .catch((error) => {
      console.error("Assessment questions seeding failed:", error);
      process.exit(1);
    });
}
