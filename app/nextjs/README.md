# Next.js Application

A modern Next.js 14+ application with TypeScript, Tailwind CSS, and Vercel deployment configuration.

## Features

- **Next.js 14+** with App Router
- **TypeScript** with strict mode enabled
- **Tailwind CSS** for styling
- **ESLint** for code quality
- **Vercel** deployment ready

## Project Structure

```
app/nextjs/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles with Tailwind
├── components/            # Reusable React components
│   └── Navigation.tsx     # Navigation component
├── lib/                   # Utility functions
│   └── utils.ts           # Helper utilities
├── types/                 # TypeScript type definitions
│   └── index.ts           # Common types
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── next.config.js         # Next.js configuration
└── vercel.json            # Vercel deployment settings
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the Next.js directory:

```bash
cd app/nextjs
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration values.

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Code Quality

Run ESLint to check code quality:

```bash
npm run lint
```

Check TypeScript types:

```bash
npx tsc --noEmit
```

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect the Next.js framework
6. Configure environment variables in the dashboard
7. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install the Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy from the project directory:

```bash
cd app/nextjs
vercel
```

3. Follow the prompts to link your project and deploy

### Environment Variables in Vercel

Configure the following environment variables in the Vercel dashboard:

- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_ENABLE_ANALYTICS` - Enable/disable analytics
- Add any other variables from `.env.local.example`

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put secrets in `NEXT_PUBLIC_*` variables.

## Configuration

### TypeScript

TypeScript is configured with strict mode in `tsconfig.json`. All components and utilities should be fully typed.

### Tailwind CSS

Tailwind CSS is configured in `tailwind.config.ts`. The configuration includes:

- Custom color scheme with CSS variables
- Dark mode support (prefers-color-scheme)
- Content paths for all component files

### Next.js

Next.js configuration in `next.config.js` includes:

- React strict mode enabled
- Image optimization with AVIF and WebP formats
- Compression enabled
- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)

## Coexistence with Existing Stack

This Next.js application runs alongside the existing FastAPI + Vite stack:

- **Next.js**: Port 3000 (default)
- **FastAPI**: Port 8000
- **Vite**: Port 5173

The applications are independent and can be run simultaneously for full-stack development.

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
npm run dev -- -p 3001
```

### TypeScript Errors

Clear the TypeScript build info and restart:

```bash
rm -rf .next
rm -f tsconfig.tsbuildinfo
npm run dev
```

### Build Errors

Clear the cache and rebuild:

```bash
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Environment Variables Not Loading

- Ensure `.env.local` exists and has the correct variables
- Restart the development server after changing environment variables
- Variables must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser

## Best Practices

1. **Components**: Keep components small and focused. Use TypeScript interfaces for props.
2. **Styling**: Use Tailwind utility classes. Avoid custom CSS unless necessary.
3. **Type Safety**: Enable strict mode and fix all TypeScript errors.
4. **Performance**: Use Next.js Image component for images. Implement proper loading states.
5. **Security**: Never commit `.env.local`. Use environment variables for secrets.
6. **Code Quality**: Run linting and type checking before committing code.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

## Support

For issues specific to this Next.js setup, check:

1. The troubleshooting section above
2. Next.js documentation and examples
3. Project issues in the main repository
