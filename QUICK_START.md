# Quick Start Guide - Local SQLite Database

This guide will help you set up the EduAdvisorX application with a local SQLite database.

## 🚀 Quick Setup (3 steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database
```bash
npm run db:init
```

### 3. Start Application
```bash
npm run dev
```

That's it! The application will be running at `http://localhost:5000`

## 📋 What the Setup Does

The `npm run db:init` command will:
- ✅ Create a local SQLite database file (`local.db`)
- ✅ Create all necessary tables automatically
- ✅ Seed the database with 20+ assessment questions
- ✅ Load college data from CSV files
- ✅ Load course and scholarship data
- ✅ Set up the complete assessment system

## 🎯 Test the Assessment

1. Go to `http://localhost:5000/assessment`
2. Sign in to save your progress
3. Answer the assessment questions
4. View your personalized results including:
   - Recommended stream (Science/Commerce/Arts/Vocational)
   - College recommendations
   - Scholarship opportunities
   - Course suggestions

## 📁 Database Files

- **Database**: `local.db` (created in project root)
- **CSV Data**: `client/public/*.csv`
- **Schema**: `shared/schema.ts`

## 🔧 Available Commands

```bash
# Database
npm run db:init      # Initialize database with sample data
npm run db:push      # Generate schema migrations
npm run db:generate  # Generate initial migration

# Seeding
npm run seed:all     # Seed all data
npm run seed:questions  # Assessment questions only
npm run seed:csv     # CSV data only

# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

## 🐛 Troubleshooting

### Database Already Exists
```bash
rm local.db
npm run db:init
```

### Permission Issues
```bash
# Windows
icacls local.db /grant Everyone:F

# Mac/Linux
chmod 644 local.db
```

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000
npm run dev
```

## 📊 What's Included

### Assessment Questions (20+)
- **Aptitude**: Math, logic, problem-solving
- **Interests**: Subject preferences, career paths
- **Personality**: Work style, motivation, learning

### College Data (20+ colleges)
- Government colleges in Tamil Nadu
- Course offerings and cutoffs
- Fee structure and facilities
- Scholarship availability

### Course Data (20+ programs)
- B.Sc, B.Com, B.A, B.Tech programs
- Career paths and job opportunities
- Industry areas and skills required

### Scholarship Data (20+ scholarships)
- Merit-based, need-based, category-based
- Eligibility criteria and amounts
- Application deadlines

## 🎨 Features

- **Personalized Assessment**: AI-powered stream recommendation
- **College Matching**: Filter colleges by recommended stream
- **Scholarship Finder**: Find relevant financial aid
- **Course Suggestions**: Degree programs matching your profile
- **Beautiful UI**: Modern, responsive design
- **Local Database**: No external dependencies

## 🔄 Next Steps

1. **Customize Questions**: Edit `server/seed-assessment-questions.ts`
2. **Add More Colleges**: Update CSV files in `client/public/`
3. **Modify Recommendations**: Edit logic in `server/routes.ts`
4. **Deploy**: Include `local.db` in your deployment

## 📞 Support

If you encounter any issues:
1. Check the console output for error messages
2. Ensure all dependencies are installed
3. Try deleting `local.db` and running `npm run db:init` again
4. Check file permissions on the database file

The application is now ready to use with a completely local database setup!
