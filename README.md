# Next.js Application Showcase

A modern web application built with Next.js 14, TypeScript, and Tailwind CSS, demonstrating the power of AI-driven development through the AI Developer Workflow (ADW) system. This project showcases how autonomous AI agents can build production-ready applications from GitHub issues.

## Project Overview

This application was built entirely using the ADW (AI Developer Workflow) system, an autonomous AI development framework that processes GitHub issues and implements complete features without human intervention. The project features a Next.js application with authentication, user profiles, search functionality, and responsive design - all implemented by AI agents following structured workflows.

## Features

### Core Application Features
- **Modern Next.js 14** with App Router and TypeScript
- **Authentication System** with mock users and JWT-like tokens
- **User Dashboard** with profile cards and data management
- **Search & Filter** functionality for finding users
- **Responsive Navigation** with mobile-friendly layout
- **Loading States** and comprehensive error handling
- **Tailwind CSS** styling with dark mode support
- **Vercel Deployment** ready with security headers

### Legacy Features (FastAPI + Vite Stack)
- Natural language to SQL conversion using OpenAI or Anthropic
- Drag-and-drop file upload (.csv and .json)
- Interactive table results display
- SQL injection protection
- User authentication and authorization (JWT-based)
- User registration and login system
- Fast development with Vite and uv

## Tech Stack

### Frontend (Next.js Application)
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript 5+ with strict mode
- **Styling**: Tailwind CSS 3+ with custom theming
- **State Management**: React Context API with hooks
- **Deployment**: Vercel with security headers

### Backend (Legacy - FastAPI)
- **Framework**: FastAPI with Python 3.10+
- **Database**: SQLite with SQL injection protection
- **AI Integration**: OpenAI and Anthropic APIs
- **Authentication**: JWT with bcrypt password hashing

### Development Tools
- **AI Development**: ADW (AI Developer Workflow) system
- **AI Agent**: Claude Code CLI for autonomous implementation
- **Version Control**: Git with GitHub integration
- **Package Managers**: npm (frontend), uv (Python backend)

### Deployment
- **Frontend**: Vercel (Next.js)
- **Infrastructure**: Git worktrees for isolated development
- **CI/CD**: Automated through ADW workflows

## Prerequisites

### For Next.js Application
- Node.js 18+ installed
- npm package manager
- Git for version control

### For Legacy Stack (Optional)
- Python 3.10+
- uv (Python package manager)
- Bun (or your preferred npm tool: npm, yarn, etc.)
- OpenAI API key and/or Anthropic API key

## Quick Start

### Next.js Application (Recommended)

```bash
# Navigate to Next.js directory
cd app/nextjs

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at **http://localhost:3000**

### Mock Credentials for Testing

The Next.js application includes mock authentication with test users:

| Username | Password | Role |
|----------|----------|------|
| `admin` | `admin123` | admin |
| `user` | `user123` | user |

**Security Note**: These are development-only credentials. Never use hardcoded credentials in production.

### Using the Next.js Application

1. **Access the Application**: Navigate to http://localhost:3000
2. **Login**: You'll be redirected to `/login` if not authenticated
   - Use mock credentials: `admin` / `admin123` or `user` / `user123`
3. **Explore Features**:
   - **Dashboard** at `/dashboard` - View user profiles with search and filter
   - **User Cards** - Browse user information in an organized grid layout
   - **Search** - Find users by name, email, or bio
   - **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
4. **Logout**: Click the "Logout" button in the navigation to end your session

### Legacy Stack (Optional)

For the FastAPI + Vite stack, see the detailed setup instructions below in the "Development" section.

## Project Structure

```
.
├── app/
│   ├── nextjs/             # Next.js 14 application (MAIN APPLICATION)
│   │   ├── app/            # Next.js App Router pages and layouts
│   │   ├── components/     # Reusable React components
│   │   ├── contexts/       # React Context providers (AuthContext)
│   │   ├── hooks/          # Custom React hooks (useAuth)
│   │   ├── lib/            # Utility functions and services
│   │   ├── types/          # TypeScript type definitions
│   │   └── vercel.json     # Vercel deployment configuration
│   │
│   ├── client/             # Legacy Vite + TypeScript frontend
│   └── server/             # Legacy FastAPI backend
│
├── adws/                   # AI Developer Workflow system
│   ├── adw_modules/        # Core ADW modules (agent, state, git_ops)
│   ├── adw_triggers/       # Automation triggers (cron, webhook)
│   └── adw_*.py            # Workflow scripts (plan, build, test, review)
│
├── specs/                  # Implementation specifications (AI-generated)
├── app_docs/               # Feature documentation (AI-generated)
├── agents/                 # Agent execution logs and state
├── trees/                  # Git worktrees for isolated development
├── scripts/                # Utility scripts (start.sh, etc.)
└── logs/                   # Structured session logs
```

### Directory Descriptions

- **`app/nextjs/`**: The main Next.js application with authentication, dashboard, user profiles, and responsive design. This is the primary application showcasing ADW capabilities.

- **`app/client/` & `app/server/`**: Legacy FastAPI backend with Vite frontend for natural language SQL queries. These demonstrate the original project before ADW transformation.

- **`adws/`**: The AI Developer Workflow system that orchestrates autonomous development. Contains modules for agent execution, state management, GitHub integration, and workflow orchestration.

- **`specs/`**: AI-generated implementation plans created during the planning phase. Each spec corresponds to a GitHub issue and contains detailed step-by-step tasks.

- **`app_docs/`**: AI-generated feature documentation created after implementation. Includes technical guides, usage instructions, and architecture notes for each feature.

- **`agents/`**: Execution logs from AI agents including raw output from Claude Code CLI sessions, state files, and screenshots from testing phases.

- **`trees/`**: Git worktrees created for isolated development. Each ADW workflow runs in its own worktree with dedicated ports and filesystem isolation.

- **`scripts/`**: Utility scripts for common operations like starting the legacy stack or stopping services.

## Development

### Backend Commands
```bash
cd app/server
uv run python server.py      # Start server with hot reload
uv run pytest               # Run tests
uv add <package>            # Add package to project
uv remove <package>         # Remove package from project
uv sync --all-extras        # Sync all extras
```

### Frontend Commands
```bash
cd app/client
bun run dev                 # Start dev server
bun run build              # Build for production
bun run preview            # Preview production build
```

## Project Structure

```
.
├── app/                    # Main application
│   ├── client/             # Vite + TypeScript frontend
│   ├── server/             # FastAPI backend
│   └── nextjs/             # Next.js application (see below)
│
├── adws/                   # AI Developer Workflow (ADW) - GitHub issue automation system
├── scripts/                # Utility scripts (start.sh, stop_apps.sh)
├── specs/                  # Feature specifications
├── ai_docs/                # AI/LLM documentation
├── agents/                 # Agent execution logging
└── logs/                   # Structured session logs
```

## Next.js Application

This project includes a modern Next.js 14+ application in `app/nextjs/` configured for Vercel deployment with TypeScript and Tailwind CSS.

### Quick Start

```bash
# Navigate to Next.js directory
cd app/nextjs

# Install dependencies
npm install

# Start development server
npm run dev
```

The Next.js application will be available at http://localhost:3000.

### Key Features

- **Next.js 14+** with App Router for modern React patterns
- **TypeScript** with strict mode for type safety
- **Tailwind CSS** for utility-first styling
- **Vercel-ready** deployment configuration
- **Coexistence** with existing FastAPI + Vite stack

### Documentation

For detailed setup, development, and deployment instructions, see [`app/nextjs/README.md`](app/nextjs/README.md).

### Port Configuration

The Next.js application runs on port 3000, allowing it to coexist with the existing stack:
- **Next.js**: Port 3000
- **FastAPI**: Port 8000
- **Vite**: Port 5173

## API Endpoints

### Public Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and receive JWT token
- `POST /api/auth/logout` - Logout (client-side)
- `GET /api/health` - Health check

### Protected Endpoints (Require Authentication)
All endpoints below require a valid JWT token in the `Authorization` header:

- `GET /api/auth/me` - Get current user information
- `POST /api/upload` - Upload CSV/JSON file
- `POST /api/query` - Process natural language query
- `GET /api/schema` - Get database schema
- `POST /api/insights` - Generate column insights
- `DELETE /api/table/{table_name}` - Delete a table
- `POST /api/export/table` - Export table as CSV
- `POST /api/export/query` - Export query results as CSV
- `POST /api/export/table/json` - Export table as JSON
- `POST /api/export/query/json` - Export query results as JSON
- `POST /api/generate-data` - Generate synthetic data
- `GET /api/generate-random-query` - Generate random query

## Security

### User Authentication

The application implements JWT-based authentication to secure all API endpoints:

1. **User Registration & Login**:
   - Secure user registration with email validation
   - Password hashing using bcrypt (12 rounds)
   - JWT token-based authentication (stateless)
   - Passwords never stored in plain text

2. **Token Security**:
   - JWT tokens expire after 30 minutes (configurable)
   - Tokens signed with secret key (HS256 algorithm)
   - Token validation on every protected request
   - Automatic redirect on expired tokens

3. **API Protection**:
   - All API endpoints (except public auth endpoints) require authentication
   - Authorization header with Bearer token required
   - 401 Unauthorized for invalid/missing tokens
   - 403 Forbidden for inactive users

4. **Frontend Security**:
   - Automatic route protection (redirect to login)
   - Token expiration checks before requests
   - Secure token storage in localStorage
   - User session management across page reloads

**See full authentication documentation**: `app_docs/feature-2604eee2-authentication-system.md`

### SQL Injection Protection

The application implements comprehensive SQL injection protection through multiple layers:

1. **Centralized Security Module** (`core/sql_security.py`):
   - Identifier validation for table and column names
   - Safe query execution with parameterized queries
   - Proper escaping for identifiers using SQLite's square bracket notation
   - Dangerous operation detection and blocking

2. **Input Validation**:
   - All table and column names are validated against a whitelist pattern
   - SQL keywords cannot be used as identifiers
   - File names are sanitized before creating tables
   - User queries are validated for dangerous operations

3. **Query Execution Safety**:
   - Parameterized queries used wherever possible
   - Identifiers (table/column names) are properly escaped
   - Multiple statement execution is blocked
   - SQL comments are not allowed in queries

4. **Protected Operations**:
   - File uploads with malicious names are sanitized
   - Natural language queries cannot inject SQL
   - Table deletion uses validated identifiers
   - Data insights generation validates all inputs

### Security Best Practices for Development

When adding new SQL functionality:
1. Always use the `sql_security` module functions
2. Never concatenate user input directly into SQL strings
3. Use `execute_query_safely()` for all database operations
4. Validate all identifiers with `validate_identifier()`
5. For DDL operations, use `allow_ddl=True` explicitly

### Testing Security

Run the comprehensive security tests:
```bash
cd app/server
uv run pytest tests/test_sql_injection.py -v
```


### Additional Security Features

- CORS configured for local development only
- File upload validation (CSV and JSON only)
- Comprehensive error logging without exposing sensitive data
- Database operations are isolated with proper connection handling

## AI Developer Workflow (ADW)

The ADW system is a comprehensive automation framework that integrates GitHub issues with Claude Code CLI to classify issues, generate implementation plans, and automatically create pull requests. ADW processes GitHub issues by classifying them as `/chore`, `/bug`, or `/feature` commands and then implementing solutions autonomously.

### Prerequisites

Before using ADW, ensure you have the following installed and configured:

- **GitHub CLI**: `brew install gh` (macOS) or equivalent for your OS
- **Claude Code CLI**: Install from [Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code)
- **Python with uv**: `curl -LsSf https://astral.sh/uv/install.sh | sh`
- **GitHub authentication**: `gh auth login`

### Environment Variables

Set these environment variables before running ADW:

```bash
export GITHUB_REPO_URL="https://github.com/owner/repository"
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
export CLAUDE_CODE_PATH="/path/to/claude"  # Optional, defaults to "claude"
export GITHUB_PAT="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  # Optional, only if using different account than 'gh auth login'
```

### Usage Modes

ADW supports three main operation modes:

#### 1. Manual Processing
Process a single GitHub issue manually (in isolated worktree):
```bash
cd adws/
uv run adw_plan_build_iso.py <issue-number>
```

#### 2. Automated Monitoring
Continuously monitor GitHub for new issues (polls every 20 seconds):
```bash
cd adws/
uv run trigger_cron.py
```

#### 3. Webhook Server
Start a webhook server for real-time GitHub event processing:
```bash
cd adws/
uv run trigger_webhook.py
```

### How ADW Works

1. **Issue Classification**: Analyzes GitHub issues and determines type (`/chore`, `/bug`, `/feature`)
2. **Planning**: Generates detailed implementation plans using Claude Code CLI
3. **Implementation**: Executes the plan by making code changes, running tests, and ensuring quality
4. **Integration**: Creates git commits and pull requests with semantic commit messages

### For More Information

For detailed technical documentation, configuration options, and troubleshooting, see [`adws/README.md`](adws/README.md).

## Troubleshooting

### Next.js Application

**Port already in use:**
- Check what's using port 3000: `lsof -i :3000`
- Use a different port: `npm run dev -- -p 3001`

**Build errors:**
- Clear the cache: `rm -rf .next node_modules && npm install`
- Check Node version: `node --version` (requires 18+)

**TypeScript errors:**
- Run type checking: `cd app/nextjs && npx tsc --noEmit`
- Clear TypeScript cache: `rm -f tsconfig.tsbuildinfo`

### Legacy Stack

**Backend won't start:**
- Check Python version: `python --version` (requires 3.12+)
- Verify API keys are set: `echo $OPENAI_API_KEY`

**Frontend errors:**
- Clear node_modules: `rm -rf node_modules && bun install`
- Check Node version: `node --version` (requires 18+)

**CORS issues:**
- Ensure backend is running on port 8000
- Check vite.config.ts proxy settings

## Additional Documentation

For more detailed information about specific aspects of the project:

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Step-by-step guide for deploying the Next.js application to Vercel
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Comprehensive explanation of the ADW system and agentic AI development process
- **[app/nextjs/README.md](app/nextjs/README.md)** - Next.js specific documentation with setup and configuration details
- **[adws/README.md](adws/README.md)** - Complete ADW system documentation with technical details and usage examples

## License

This project demonstrates autonomous AI development capabilities using the ADW system.