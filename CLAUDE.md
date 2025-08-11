# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ResQGo is an emergency ambulance booking system built with a microservices architecture:
- **Main Service** (Spring Boot, Port 8080): Core booking and user management
- **Feedback Service** (Spring Boot, Port 9090): Feedback management microservice  
- **Frontend** (React + Vite, Port 5173): Single-page application

## Essential Development Commands

### Starting All Services
```bash
# Automated startup (macOS/Linux)
make run-all        # Starts all services in tmux
# OR
./start-services.sh # Alternative startup script

# Manual startup
cd ResQGo && mvn spring-boot:run           # Main service (8080)
cd feedback-service && mvn spring-boot:run # Feedback service (9090)
cd frontend-vite && npm run dev            # Frontend (5173)
```

### Building and Testing
```bash
# Frontend
cd frontend-vite
npm install         # Install dependencies
npm run build       # Production build
npm run lint        # Run ESLint

# Backend Services
cd ResQGo
mvn clean install   # Build with tests
mvn test           # Run tests only

cd feedback-service
mvn clean install   # Build with tests
mvn test           # Run tests only
```

### Database Setup
```bash
# MySQL database: final_project
mysql -u root -proot21 -e "CREATE DATABASE IF NOT EXISTS final_project"
# Tables auto-created by Hibernate on first run
```

## Architecture and Code Structure

### Service Communication Pattern
```
Frontend (React) 
    ↓ JWT Auth
Main Service (8080) ←→ Feedback Service (9090)
    ↓                     ↓
    MySQL Database (final_project)
```

### Backend Architecture (Both Services)
- **Controller Layer**: REST endpoints with @RestController
- **Service Layer**: Business logic with @Service interfaces and implementations
- **DAO Layer**: Data access with Spring Data JPA repositories
- **DTO Pattern**: Separate request/response DTOs for API communication
- **Security**: JWT-based authentication (currently using NoOpPasswordEncoder - needs BCrypt)
- **Exception Handling**: Global exception handler with custom exceptions

### Frontend Architecture
- **Pages**: Route components in `src/pages/` (Dashboard, Forms, etc.)
- **Components**: Reusable UI in `src/components/` (admin/, layout/, ui/)
- **Services**: API communication layer in `src/services/`
- **Routing**: React Router v7 with role-based navigation
- **State**: Local component state (no global state management yet)
- **Styling**: Tailwind CSS + Bootstrap hybrid

### Key API Patterns
```java
// Authentication endpoint pattern
POST /auth/login → JWT token response

// CRUD endpoint patterns (Main Service)
GET/POST/PUT/DELETE /api/{entity}
Entities: users, bookings, ambulances, organizations, locations

// Feedback Service
GET/POST/PUT/DELETE /api/feedback
```

### Database Entities and Relationships
- **User** → Organization (ManyToOne)
- **Booking** → User, Ambulance, Locations (ManyToOne)
- **Ambulance** → Driver, Organization (OneToOne, ManyToOne)
- **Feedback** → User, Booking (ManyToOne)

## Critical Security Considerations

**WARNING**: Current codebase has security issues that must be fixed before production:
1. **Password Encoding**: Replace NoOpPasswordEncoder with BCryptPasswordEncoder
2. **JWT Secret**: Move hardcoded secret to environment variables
3. **Authorization**: Implement proper role-based access control
4. **API Security**: Secure all endpoints with authentication

## Development Workflow

### Making Changes
1. Backend changes auto-reload with Spring DevTools
2. Frontend has hot module replacement via Vite
3. Monitor services: `tmux attach -t resqgo`

### Testing APIs
- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- Default admin: `admin@resqgo.com` / `admin123`

### Common Tasks

**Add a new API endpoint:**
1. Create DTO classes in `dto/` package
2. Add repository method in DAO layer
3. Implement service logic in Service layer
4. Create controller endpoint with proper annotations
5. Test via Swagger UI

**Add a new React component:**
1. Check existing components for patterns
2. Use existing UI components from `src/components/ui/`
3. Follow Tailwind + Bootstrap hybrid styling approach
4. Connect to backend via axios in `src/services/`

**Database changes:**
1. Modify entity classes with JPA annotations
2. Hibernate auto-updates schema (dev mode)
3. For production, generate migration scripts

## Important Configuration Files

- `ResQGo/src/main/resources/application.properties`: Main service config
- `feedback-service/src/main/resources/application.properties`: Feedback service config
- `frontend-vite/vite.config.js`: Frontend build configuration
- `frontend-vite/.env`: Environment variables (create from .env.example)

## Known Issues and TODOs

1. **Security**: Password encoding, JWT externalization, endpoint security
2. **Testing**: Minimal test coverage - needs comprehensive test suite
3. **API Consistency**: Mixed URL patterns need standardization
4. **Error Handling**: Improve validation and error messages
5. **Performance**: Add pagination, caching, and query optimization