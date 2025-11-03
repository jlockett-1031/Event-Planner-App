# Host a Move - Event Planning Platform

## Overview

Host a Move is a social event planning application that helps users organize gatherings (birthdays, graduations, baby showers, holidays, etc.) with features like guest management, RSVP tracking, potluck coordination, gift registries, music playlists, and photo albums. The platform emphasizes a warm, social-first design aesthetic inspired by modern event planning tools like Partiful and Eventbrite.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component System**: 
- shadcn/ui component library based on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Component architecture follows the "new-york" shadcn style variant
- Mobile-first responsive design approach

**Design System**:
- Custom color theming using CSS variables (HSL color space)
- Typography system using DM Sans/Inter for headings and system fonts for body text
- Spacing follows Tailwind's 4px-based scale (2, 4, 6, 8, 12, 16 units)
- Gradient backgrounds for headers using CSS custom properties

**State Management**:
- TanStack React Query (formerly React Query) for server state management
- Local component state using React hooks
- Custom query client configuration with infinite stale time and disabled refetching

**Routing**: 
- Wouter for client-side routing (lightweight alternative to React Router)
- View-based navigation managed through component state rather than URL-based routing

**Key Architectural Decisions**:
- **Component-driven development**: Reusable components in `/client/src/components` with example implementations in `/client/src/components/examples`
- **Type safety**: Full TypeScript coverage with strict mode enabled
- **Mobile-optimized**: Touch-friendly interfaces with thumb-zone considerations per design guidelines
- **Event-centric data model**: Events are the central entity with relationships to guests, potluck items, menu items, gift registries, activities, and playlists

### Backend Architecture

**Runtime**: Node.js with Express.js framework

**Language**: TypeScript with ES modules

**Server Structure**:
- Minimal Express server in `/server/index.ts` with custom logging middleware
- Route registration pattern in `/server/routes.ts` (currently skeleton - routes to be implemented)
- Development mode uses Vite middleware for HMR and asset serving
- Production mode serves static built assets

**API Design**:
- RESTful API pattern (all routes prefixed with `/api`)
- JSON request/response format
- Cookie-based session handling (credentials included in fetch requests)

**Key Architectural Decisions**:
- **Storage abstraction layer**: Interface-based storage pattern in `/server/storage.ts` allows swapping implementations without changing business logic
- **Type-safe contracts**: Shared schema definitions between frontend and backend using Zod validation
- **Middleware architecture**: Request logging, JSON parsing, and raw body capture for webhook support

### Data Storage

**Database**: PostgreSQL via Neon serverless driver (`@neondatabase/serverless`)

**ORM**: Drizzle ORM with schema-first approach

**Schema Structure** (defined in `/shared/schema.ts`):

**Events Table**:
- Core entity with name, type, date, time, location, dress code
- Food style (host-provided or potluck)
- Optional max attendees limit
- References to primary host and communication lead

**Related Entities**:
- **Co-Hosts**: Multiple co-hosts per event with contact information
- **Guests**: RSVP tracking (yes/no/maybe/pending) with plus-ones and dietary notes
- **Potluck Items**: Category-based items with claim tracking
- **Menu Items**: Host-provided food organized by category
- **Gift Registry Items**: External links or custom wishlists with claim tracking
- **Group Gifts**: Collaborative gifting with contribution tracking
- **Activities**: Event timeline and activity logging
- **Playlist Songs**: Music curation with voting and AI-generated playlists

**Schema Validation**: Drizzle-Zod integration for runtime validation and type inference

**Migration Strategy**: Drizzle Kit for schema migrations with PostgreSQL dialect

**Key Architectural Decisions**:
- **UUID primary keys**: Using PostgreSQL's `gen_random_uuid()` for all entities
- **Text-based dates/times**: Flexibility for natural language input (could be enhanced with proper timestamp columns)
- **Denormalized food style**: Stored on event rather than separate table for simpler queries
- **Flexible user references**: String-based IDs for hosts/leads to support future auth integration

### External Dependencies

**UI Framework**:
- React 18+ with TypeScript
- Radix UI primitives for accessible components
- Tailwind CSS for utility-first styling
- class-variance-authority (CVA) for component variants
- Lucide React for icons

**Form Handling**:
- React Hook Form for form state management
- Hookform Resolvers for Zod schema validation

**Database & ORM**:
- Neon Serverless PostgreSQL driver
- Drizzle ORM for type-safe database access
- Drizzle-Zod for schema validation

**Utilities**:
- date-fns for date formatting and manipulation
- clsx and tailwind-merge for conditional class names
- Wouter for lightweight routing

**Session Management**:
- connect-pg-simple for PostgreSQL session storage (configured but not yet implemented)

**Development Tools**:
- Vite for build tooling and dev server
- esbuild for server bundling
- tsx for TypeScript execution
- Replit-specific plugins for development experience

**Third-Party Service Integration Points** (to be implemented):
- Session storage via PostgreSQL
- Potential future integrations: Email services for invitations, cloud storage for photo albums, music streaming APIs for playlists

**Key Architectural Decisions**:
- **No authentication yet**: User/auth system is placeholder - references stored as strings for future implementation
- **PostgreSQL sessions**: Using connect-pg-simple for production-ready session persistence
- **Serverless-compatible**: Neon driver chosen for serverless deployment compatibility
- **Type-first validation**: Zod schemas drive both runtime validation and TypeScript types
- **Minimal routing**: Wouter chosen over React Router for smaller bundle size in event-focused SPA