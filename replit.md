# Digital Career Guidance Platform

## Overview

This is a comprehensive digital career guidance platform designed specifically for students transitioning from Class 10 and 12 in India. The platform addresses the critical gap in educational awareness by providing personalized career counseling, college recommendations, and pathway mapping to increase enrollment in government degree colleges.

The application features an AI-powered assessment system, comprehensive college directory with location-based search, visual career path mapping, and personalized recommendations to help students make informed decisions about their academic and professional futures.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design system and CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **Authentication**: Integrated with Replit Auth system for seamless user authentication

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL using Neon serverless database
- **Session Management**: Express sessions with PostgreSQL store for persistent user sessions
- **API Design**: RESTful API with structured error handling and request logging middleware

### Database Design
- **Core Tables**: Users, colleges, assessment questions, user assessments, career paths, timeline events, user recommendations
- **Relationships**: Proper foreign key relationships between users and their assessments, recommendations, and activity
- **Schema**: Strongly typed schema with Zod validation for data integrity
- **Migration System**: Drizzle Kit for database migrations and schema management

### Authentication System
- **Provider**: Replit Auth with OpenID Connect (OIDC) integration
- **Security**: Secure session management with HTTP-only cookies and CSRF protection
- **User Data**: Profile information synchronized with Replit user accounts
- **Authorization**: Role-based access control for protected routes and resources

### AI Integration
- **Provider**: Google Gemini AI for natural language processing and recommendations
- **Assessment Analysis**: AI-powered evaluation of student responses to generate personalized stream recommendations
- **Career Guidance**: Intelligent matching of student profiles with suitable career paths and educational opportunities
- **Content Generation**: Dynamic generation of personalized advice and next steps based on user data

### Component Architecture
- **Design System**: Consistent component library with variants and size options
- **Reusability**: Modular components for assessment quizzes, college cards, career path visualizations
- **Accessibility**: ARIA-compliant components with keyboard navigation and screen reader support
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## External Dependencies

### Core Infrastructure
- **Database**: Neon PostgreSQL serverless database for scalable data storage
- **Authentication**: Replit Auth service for user management and SSO
- **Hosting**: Designed for Replit hosting environment with development tooling integration

### AI and Machine Learning
- **Google Gemini AI**: Primary AI service for assessment analysis and personalized recommendations
- **Natural Language Processing**: Used for analyzing student responses and generating career guidance

### UI and Design
- **Radix UI**: Headless UI primitives for accessible component foundation
- **Lucide React**: Icon library for consistent visual elements
- **Google Fonts**: Custom font integration for typography system
- **Tailwind CSS**: Utility-first CSS framework for styling

### Development Tools
- **Vite**: Fast build tool with hot module replacement for development
- **TypeScript**: Type safety across frontend and backend
- **Drizzle Kit**: Database toolkit for migrations and schema management
- **ESBuild**: Fast JavaScript bundler for production builds

### API Integrations
- **Assessment System**: Custom quiz engine with weighted scoring algorithms
- **College Directory**: Integration with government college databases and location services
- **Timeline Events**: Academic calendar integration for admission deadlines and important dates
- **Recommendation Engine**: AI-powered matching system for courses and career paths