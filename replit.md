# Overview

This is a full-stack web application built with React and Express that features a browser-based dinosaur runner game. The application uses a modern tech stack with TypeScript, Tailwind CSS for styling, and a comprehensive UI component library based on Radix UI. The backend is set up with Express and includes database integration using Drizzle ORM with PostgreSQL support.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for build tooling
- **Styling**: Tailwind CSS with a custom design system using CSS variables for theming
- **Component Library**: Comprehensive UI components built on top of Radix UI primitives
- **State Management**: Zustand for client-side state management with separate stores for game logic and audio
- **3D Graphics**: React Three Fiber ecosystem with Drei and post-processing support
- **Build System**: Vite with custom configuration supporting GLSL shaders and large asset files

## Game Engine
- **Architecture**: Object-oriented game engine with separate classes for Player, Ground, InputHandler, and main Game controller
- **Rendering**: HTML5 Canvas-based 2D rendering with manual game loop management
- **Physics**: Custom gravity and collision detection system
- **Input**: Keyboard input handling with space bar controls
- **Animation**: Frame-based animation system with deltaTime calculations

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Storage Layer**: Abstracted storage interface with both in-memory and database implementations
- **API Structure**: RESTful API design with `/api` prefix for all endpoints
- **Development**: Hot module replacement with Vite integration in development mode

## Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Type-safe schema definitions shared between client and server
- **Migrations**: Database migration support via Drizzle Kit
- **Validation**: Zod integration for runtime type validation
- **Fallback**: In-memory storage implementation for development/testing

## Authentication & Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **User Schema**: Basic user model with username/password fields
- **Security**: Password hashing and session-based authentication ready to implement

# External Dependencies

## Database Services
- **PostgreSQL**: Primary database using Neon Database serverless PostgreSQL
- **Environment**: DATABASE_URL environment variable for connection string

## UI and Styling
- **Radix UI**: Complete suite of accessible UI primitives including dialogs, dropdowns, forms, and navigation
- **Tailwind CSS**: Utility-first CSS framework with PostCSS and Autoprefixer
- **Lucide Icons**: Icon library for consistent iconography
- **Inter Font**: Web font via Fontsource for typography

## Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds
- **TSX**: TypeScript execution for development server
- **Vite**: Modern build tool with HMR and plugin ecosystem

## Game Development
- **Canvas API**: Native HTML5 Canvas for 2D game rendering
- **RequestAnimationFrame**: Browser API for smooth animation loops
- **Web Audio API**: Ready for audio implementation with Zustand audio store

## Query and Data Fetching
- **TanStack Query**: Server state management and caching for API calls
- **Fetch API**: Native browser API for HTTP requests with custom wrapper functions