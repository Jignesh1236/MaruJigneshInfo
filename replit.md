# Overview

This is a modern portfolio website for Jignesh D. Maru, a web developer from Vadodara, India. The application is built as a full-stack web application with a React frontend showcasing personal information, skills, experience, and contact details. The project uses a monorepo structure with shared schemas and includes database support through Drizzle ORM, though currently operates with in-memory storage for user management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming, supporting dark mode
- **Animations**: Framer Motion for smooth animations and transitions
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation via Hookform Resolvers

## Backend Architecture  
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Development**: TSX for TypeScript execution in development
- **Production**: ESBuild for server bundling
- **Storage**: Currently using in-memory storage with IStorage interface, designed to support database integration

## Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL (configured via Neon Database serverless)
- **Schema**: Shared schema definitions in TypeScript with Zod validation
- **Migrations**: Drizzle Kit for database migrations and schema management
- **Current State**: Application uses MemStorage class for user management, with database ready for integration

## Styling and Design System
- **Component Library**: Shadcn/ui with New York variant
- **CSS Framework**: Tailwind CSS with custom design tokens
- **Typography**: Inter font family for sans-serif, JetBrains Mono for monospace
- **Color System**: CSS custom properties with comprehensive design tokens
- **Responsive Design**: Mobile-first approach with breakpoint-aware components

## Development Environment
- **Bundler**: Vite with React plugin for frontend
- **TypeScript**: Strict mode enabled with path mapping
- **Hot Reload**: Vite HMR with error overlay for development
- **Code Quality**: PostCSS with Autoprefixer for CSS processing

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: React 18+ with React DOM, React Hook Form, TanStack Query
- **Express.js**: Web application framework for Node.js server
- **TypeScript**: Type system with strict configuration

## Database and ORM
- **Neon Database**: Serverless PostgreSQL database provider (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe ORM with PostgreSQL dialect
- **Drizzle Kit**: Database migration and schema management tool
- **Drizzle Zod**: Integration between Drizzle and Zod for validation

## UI and Styling
- **Radix UI**: Comprehensive collection of accessible UI primitives (40+ components)
- **Tailwind CSS**: Utility-first CSS framework
- **Class Variance Authority**: Type-safe variant generation for components
- **Framer Motion**: Animation library for React
- **Lucide React**: Icon library

## Development Tools
- **Vite**: Next-generation frontend build tool
- **ESBuild**: JavaScript/TypeScript bundler for production builds
- **TSX**: TypeScript execution engine for development
- **PostCSS**: CSS processing with Autoprefixer

## Specialized Libraries
- **Wouter**: Minimalist routing library for React
- **CMDK**: Command palette interface component
- **Date-fns**: Date utility library
- **Embla Carousel**: Carousel/slider component
- **Nanoid**: URL-safe unique string ID generator
- **CLSX + Tailwind Merge**: Utility for conditional CSS classes

## Session Management
- **Connect PG Simple**: PostgreSQL session store for Express sessions
- **Express Session**: Session middleware (implied by PG Simple usage)

## Replit Integration
- **Replit Vite Plugins**: Development environment integration including error modal and cartographer for development mode

## AI Chatbot Integration (August 21, 2025)
- **Shapes AI API**: Integrated Shapes.inc AI chatbot using "zerotwo-darling" shape
- **Chatbot Component**: Modern floating chatbot UI with animations using Framer Motion
- **Backend API Routes**: RESTful endpoints for chat functionality at `/api/chat`
- **Session Management**: In-memory storage for chat messages with session persistence
- **Context Integration**: AI assistant trained with comprehensive information about Jignesh's skills and portfolio
- **UI Features**: Floating chat button, minimize/maximize, message history, typing indicators

## Enhanced Features (August 21, 2025)
- **3D Elements**: CSS-based floating cubes animation in background using transforms and Framer Motion
- **Enhanced Animations**: Fade-in effects, stagger animations, hover effects, and glow effects throughout site
- **Loading Skeletons**: Professional skeleton components for better loading UX
- **Video Background Support**: Component infrastructure for dynamic video backgrounds
- **Analytics Backend**: Visitor tracking API endpoints (visitor counter UI removed per user preference)