# Assessment System Setup Guide

This guide explains how to set up and use the comprehensive assessment system with college and scholarship recommendations.

## Features

- **Comprehensive Assessment Questions**: 20+ questions covering aptitude, interests, and personality
- **Stream Recommendations**: AI-powered analysis to recommend Science, Commerce, Arts, or Vocational streams
- **College Recommendations**: Government colleges filtered by recommended stream and courses
- **Scholarship Recommendations**: Financial aid opportunities based on user profile
- **Course Recommendations**: Specific degree programs aligned with user interests

## Setup Instructions

### 1. Seed the Database

First, populate the database with sample questions and CSV data:

```bash
# Seed all data (questions + CSV data)
npm run seed:all

# Or seed individually:
npm run seed:questions  # Assessment questions only
npm run seed:csv        # CSV data (colleges, courses, scholarships) only
```

### 2. Start the Application

```bash
npm run dev
```

### 3. Access the Assessment

1. Navigate to `/assessment` in your browser
2. Sign in to save your progress and get personalized recommendations
3. Answer all 20+ assessment questions
4. View your personalized results including:
   - Recommended stream with confidence score
   - Aptitude scores across all streams
   - Personality traits and interests
   - Recommended colleges with cutoff and fee information
   - Available scholarships with eligibility criteria
   - Suggested courses matching your profile

## Assessment Questions

The system includes questions in three categories:

### Aptitude Questions (8 questions)
- Mathematical reasoning and problem-solving
- Logical sequence completion
- Basic calculations and analysis
- Science-related problem solving

### Interest Questions (8 questions)
- Preferred activities and subjects
- Career path preferences
- Learning style preferences
- Problem-solving approaches

### Personality Questions (6 questions)
- Work style preferences
- Motivation factors
- Challenge handling approaches
- Learning environment preferences

## Data Sources

### Colleges Dataset (`client/public/colleges_dataset.csv`)
- 20+ government colleges in Tamil Nadu
- Course offerings, cutoffs, fees, and scholarship availability
- Location and contact information

### Courses Dataset (`client/public/courses_dataset.csv`)
- 20+ degree programs across all streams
- Career paths and job opportunities
- Industry areas and skill requirements

### Scholarships Dataset (`client/public/scholarships_dataset.csv`)
- 20+ scholarship programs
- Eligibility criteria and amounts
- Application deadlines and categories

## API Endpoints

### Assessment
- `GET /api/assessment/questions` - Fetch assessment questions
- `POST /api/assessment/submit` - Submit answer (authenticated)
- `GET /api/assessment/results` - Get analysis results (authenticated)

### Recommendations
- `POST /api/recommendations/colleges` - Get college recommendations (authenticated)
- `POST /api/recommendations/scholarships` - Get scholarship recommendations (authenticated)
- `POST /api/recommendations/courses` - Get course recommendations (authenticated)

## Customization

### Adding New Questions

Edit `server/seed-assessment-questions.ts` to add more questions:

```typescript
{
  id: "new_question_id",
  category: "aptitude", // or "interest", "personality"
  question: "Your question here?",
  options: [
    { text: "Option 1", weight: 10, stream: "science" },
    { text: "Option 2", weight: 5, stream: "commerce" },
    // ...
  ],
  stream: "science" // optional, for stream-specific questions
}
```

### Updating CSV Data

Replace the CSV files in `client/public/` with your own data:
- `colleges_dataset.csv`
- `courses_dataset.csv` 
- `scholarships_dataset.csv`

Then run `npm run seed:csv` to update the database.

### Modifying Recommendation Logic

Edit the recommendation functions in `server/routes.ts`:
- College filtering logic in `/api/recommendations/colleges`
- Scholarship eligibility in `/api/recommendations/scholarships`
- Course matching in `/api/recommendations/courses`

## Troubleshooting

### Database Issues
- Ensure database is running and accessible
- Run `npm run db:push` to sync schema
- Check database connection in `server/db.ts`

### Seeding Issues
- Verify CSV files exist in `client/public/`
- Check file permissions and paths
- Review console output for error messages

### Assessment Not Working
- Ensure user is authenticated
- Check that questions are seeded in database
- Verify API endpoints are responding

## File Structure

```
server/
├── seed-assessment-questions.ts  # Assessment questions seeding
├── seed-csv-data.ts             # CSV data seeding
├── seed-all.ts                  # Combined seeding script
└── routes.ts                    # API routes with recommendations

client/
├── public/
│   ├── colleges_dataset.csv     # College data
│   ├── courses_dataset.csv      # Course data
│   └── scholarships_dataset.csv # Scholarship data
└── src/pages/
    └── assessment.tsx           # Assessment UI with results
```

## Next Steps

1. Customize questions for your specific use case
2. Add more colleges and courses to the CSV files
3. Enhance recommendation algorithms
4. Add more detailed eligibility checking for scholarships
5. Implement user progress saving and resume functionality
