# Deployment Guide - Vercel

This guide provides step-by-step instructions for deploying the Next.js application to Vercel, the platform created by the makers of Next.js for optimal performance and seamless integration.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Deployment Methods](#deployment-methods)
  - [Option 1: Vercel Dashboard (Recommended)](#option-1-vercel-dashboard-recommended)
  - [Option 2: Vercel CLI](#option-2-vercel-cli)
- [Environment Variables](#environment-variables)
- [Build Settings](#build-settings)
- [Post-Deployment Verification](#post-deployment-verification)
- [Continuous Deployment](#continuous-deployment)
- [Troubleshooting](#troubleshooting)
- [Backend Deployment Considerations](#backend-deployment-considerations)

## Prerequisites

Before deploying to Vercel, ensure you have:

1. **Vercel Account**
   - Sign up at [vercel.com](https://vercel.com) (free tier available)
   - Connect your GitHub, GitLab, or Bitbucket account

2. **Git Repository**
   - Your code must be in a Git repository
   - Push your latest changes to your remote repository
   - Ensure all changes are committed

3. **Node.js Project**
   - The Next.js application is located in `app/nextjs/`
   - `package.json` and `next.config.js` are properly configured
   - All dependencies are listed in `package.json`

4. **Local Testing**
   - Application builds successfully: `cd app/nextjs && npm run build`
   - No TypeScript errors: `cd app/nextjs && npx tsc --noEmit`
   - Linting passes: `cd app/nextjs && npm run lint`

## Deployment Methods

### Option 1: Vercel Dashboard (Recommended)

This is the easiest method for first-time deployment and provides a visual interface for configuration.

#### Step 1: Import Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Authorize Vercel to access your repositories if prompted
5. Find and select your repository from the list

#### Step 2: Configure Project

Vercel will automatically detect the Next.js application. Verify the following settings:

**Framework Preset**: `Next.js` (should be auto-detected)

**Root Directory**: `app/nextjs`
- Click "Edit" next to Root Directory
- Enter `app/nextjs` to point to your Next.js application
- This is crucial since the application is not in the repository root

**Build & Development Settings**:
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)
- **Development Command**: `npm run dev` (auto-detected)

**Node.js Version**: 18.x or higher (recommended)

#### Step 3: Configure Environment Variables (Optional)

If your application requires environment variables:

1. Scroll to the **"Environment Variables"** section
2. Add variables in the format: `KEY` = `value`
3. For browser-accessible variables, use `NEXT_PUBLIC_` prefix
4. Select the environments: Production, Preview, Development

Common environment variables:
```
NEXT_PUBLIC_APP_NAME=My Next.js App
NEXT_PUBLIC_API_URL=https://api.example.com
```

**Important**: Variables with `NEXT_PUBLIC_` prefix are exposed to the browser. Never put secrets in these variables.

#### Step 4: Deploy

1. Review your configuration
2. Click **"Deploy"**
3. Wait for the build to complete (typically 1-3 minutes)
4. You'll see a success screen with your deployment URL

#### Step 5: Access Your Application

- **Production URL**: `https://your-project.vercel.app`
- Click the URL to visit your deployed application
- Test all functionality to ensure proper deployment

### Option 2: Vercel CLI

For developers who prefer command-line deployment or need more control.

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

Verify installation:
```bash
vercel --version
```

#### Step 2: Authenticate

```bash
vercel login
```

Follow the prompts to authenticate with your Vercel account.

#### Step 3: Deploy from Project Directory

Navigate to the Next.js application directory:

```bash
cd app/nextjs
```

Deploy to Vercel:

```bash
vercel
```

The CLI will guide you through:
1. **Set up and deploy?** → Yes
2. **Which scope?** → Select your account/team
3. **Link to existing project?** → No (for first deployment)
4. **What's your project's name?** → Enter project name (or press Enter for default)
5. **In which directory is your code located?** → `./` (current directory)

#### Step 4: Production Deployment

The first deployment creates a preview. For production:

```bash
vercel --prod
```

This deploys to your production domain.

## Environment Variables

### Setting Environment Variables in Vercel Dashboard

1. Go to your project in the Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add variables with the following structure:
   - **Key**: Variable name (e.g., `NEXT_PUBLIC_API_URL`)
   - **Value**: Variable value
   - **Environments**: Select where to use this variable
     - ✅ Production
     - ✅ Preview
     - ✅ Development

4. Click **"Save"**
5. **Important**: Redeploy your application for changes to take effect

### Setting Environment Variables via CLI

```bash
vercel env add NEXT_PUBLIC_API_URL
```

Enter the value when prompted and select the environments.

### Environment Variable Best Practices

1. **Public Variables**: Prefix with `NEXT_PUBLIC_` for browser access
   ```
   NEXT_PUBLIC_APP_NAME=My App
   NEXT_PUBLIC_ANALYTICS_ID=UA-12345
   ```

2. **Server-only Variables**: No prefix needed for server-side only
   ```
   DATABASE_URL=postgres://...
   API_SECRET_KEY=secret123
   ```

3. **Never Commit**: Don't commit `.env.local` or secrets to Git
4. **Use Different Values**: Set different values for development, preview, and production
5. **Document Variables**: List all required variables in `.env.local.example`

## Build Settings

The application uses `vercel.json` in `app/nextjs/` for deployment configuration. Current settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### Configuration Options

- **buildCommand**: Command to build the application
- **outputDirectory**: Where the build output is located
- **framework**: Framework preset (auto-detected for Next.js)
- **regions**: Deployment regions (iad1 = US East)

### Security Headers

The application includes security headers configured in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

These headers protect against common web vulnerabilities:
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-XSS-Protection**: Enables browser XSS protection

## Post-Deployment Verification

After deployment, verify your application works correctly:

### 1. Check Deployment Status

In the Vercel dashboard:
- ✅ Build should show "Ready"
- ✅ No build errors or warnings
- ✅ Deployment time is reasonable (typically 1-3 minutes)

### 2. Test Application Functionality

Visit your deployment URL and test:

**Authentication**:
- Navigate to the login page
- Test with mock credentials: `admin` / `admin123`
- Verify successful login and redirect to dashboard

**Navigation**:
- Click all navigation links
- Verify routing works correctly
- Check that protected routes redirect unauthenticated users

**Dashboard**:
- View user profile cards
- Test search functionality
- Test filter functionality
- Verify responsive design on different screen sizes

**Responsive Design**:
- Test on mobile device or browser dev tools
- Verify navigation menu works on mobile
- Check that layouts adapt correctly

**Logout**:
- Click logout button
- Verify session is cleared
- Confirm redirect to login page

### 3. Verify Environment Variables

Check that environment variables are properly set:
- Variables with `NEXT_PUBLIC_` prefix should be accessible in browser
- Test any features that depend on environment variables
- Check browser console for any missing variable errors

### 4. Check Performance

Use browser DevTools or Vercel Analytics:
- Check page load times
- Verify images are optimized
- Confirm no console errors
- Check Network tab for failed requests

### 5. Verify Security Headers

Use browser DevTools Network tab:
1. Open DevTools (F12)
2. Go to Network tab
3. Reload the page
4. Click on the HTML document request
5. Check Response Headers include:
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `X-XSS-Protection: 1; mode=block`

## Continuous Deployment

Vercel automatically deploys your application when you push changes to your repository.

### Automatic Deployments

**Production Deployments**:
- Every push to your main/master branch triggers a production deployment
- Production URL: `https://your-project.vercel.app`

**Preview Deployments**:
- Every push to other branches creates a preview deployment
- Preview URL: `https://your-project-git-branch-name.vercel.app`
- Perfect for testing features before merging to main

**Pull Request Deployments**:
- Every pull request gets its own preview deployment
- Vercel adds a comment with the preview URL to the PR
- Enables reviewing changes before merging

### Deployment Workflow

1. **Develop**: Make changes in a feature branch
2. **Push**: Push changes to your repository
3. **Preview**: Vercel automatically creates a preview deployment
4. **Review**: Test the preview deployment
5. **Merge**: Merge to main branch when ready
6. **Deploy**: Vercel automatically deploys to production

### Controlling Deployments

You can control when deployments happen:

**Ignore Build Step**: Add a command to prevent deployments
```bash
# In Project Settings → Git → Ignored Build Step
git diff --quiet HEAD^ HEAD ./app/nextjs
```

**Deploy Hooks**: Trigger deployments via API
1. Settings → Git → Deploy Hooks
2. Create a new hook
3. Use the URL to trigger deployments programmatically

## Troubleshooting

### Build Failures

#### Error: "Build failed with exit code 1"

**Possible causes**:
- TypeScript errors
- ESLint errors
- Missing dependencies
- Incorrect build command

**Solution**:
1. Run build locally: `cd app/nextjs && npm run build`
2. Fix any errors that appear
3. Commit and push changes
4. Redeploy

#### Error: "Cannot find module"

**Possible causes**:
- Missing dependency in `package.json`
- Import path is incorrect

**Solution**:
1. Check the error message for the module name
2. Install locally: `npm install <missing-package>`
3. Verify it's added to `package.json`
4. Commit and push changes

#### Error: "TypeScript compilation failed"

**Solution**:
1. Run TypeScript check: `cd app/nextjs && npx tsc --noEmit`
2. Fix all TypeScript errors
3. Ensure `tsconfig.json` is properly configured
4. Commit and push changes

### Runtime Errors

#### Error: "Application not loading"

**Possible causes**:
- Environment variables not set
- API endpoints not configured
- Client-side JavaScript errors

**Solution**:
1. Check browser console for errors (F12)
2. Verify environment variables in Vercel dashboard
3. Check Vercel deployment logs for errors
4. Test locally with `npm run build && npm start`

#### Error: "API requests failing"

**Possible causes**:
- CORS issues
- Incorrect API URL
- Backend not deployed or accessible

**Solution**:
1. Check `NEXT_PUBLIC_API_URL` environment variable
2. Verify backend is accessible from Vercel's servers
3. Check CORS configuration on backend
4. Use absolute URLs for API requests

### Environment Variable Issues

#### Variables not working after deployment

**Solution**:
1. Go to Vercel dashboard → Settings → Environment Variables
2. Verify variables are set for the correct environment (Production/Preview/Development)
3. Check variable names are correct (case-sensitive)
4. **Redeploy** after changing variables (automatic redeploy is not triggered)

#### Public variables not accessible in browser

**Solution**:
1. Ensure variable name starts with `NEXT_PUBLIC_`
2. Redeploy after adding the variable
3. Clear browser cache and reload

### Deployment Timeout

#### Error: "Deployment exceeded maximum duration"

**Possible causes**:
- Very large dependencies
- Slow build process
- Network issues

**Solution**:
1. Optimize dependencies (remove unused packages)
2. Check for large files in node_modules
3. Consider upgrading Vercel plan for longer build times
4. Review build logs for bottlenecks

### Port Configuration Issues

**Note**: Vercel automatically handles port configuration. You don't need to specify ports in your Next.js application. Vercel assigns ports dynamically.

**If you have custom server logic**:
- Use `process.env.PORT` instead of hardcoded ports
- Vercel provides the port via environment variable

### Domain and SSL Issues

#### Custom domain not working

**Solution**:
1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. Wait for DNS propagation (can take up to 48 hours)

#### SSL certificate errors

**Solution**:
- Vercel automatically provisions SSL certificates
- Wait a few minutes after adding a domain
- Check domain status in Vercel dashboard
- Ensure DNS records are correct

## Backend Deployment Considerations

The Next.js application in `app/nextjs/` is a frontend application. The legacy FastAPI backend in `app/server/` requires separate deployment.

### Deploying FastAPI Backend

**Options for Backend Deployment**:

1. **Heroku**: Easy deployment for Python applications
2. **AWS Lambda**: Serverless deployment with Mangum adapter
3. **DigitalOcean App Platform**: Simple container deployment
4. **Fly.io**: Fast global deployment
5. **Railway**: Developer-friendly platform

### Connecting Frontend to Backend

1. **Deploy Backend First**: Get your backend URL
2. **Set Environment Variable**: Add `NEXT_PUBLIC_API_URL` in Vercel
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.herokuapp.com
   ```
3. **Configure CORS**: Update backend to allow requests from Vercel domain
4. **Redeploy Frontend**: Trigger a new deployment in Vercel

### Local Development with Production Backend

For testing:
```bash
# In app/nextjs/.env.local
NEXT_PUBLIC_API_URL=https://your-backend.herokuapp.com
```

**Note**: Currently, the Next.js application uses mock data and doesn't require a backend. The mock backend API service provides data for development and demonstration.

## Best Practices

1. **Use Preview Deployments**: Test changes in preview before merging to production
2. **Environment Variables**: Keep secrets secure and use different values per environment
3. **Monitor Performance**: Use Vercel Analytics to track performance
4. **Custom Domains**: Set up custom domains for professional URLs
5. **Edge Network**: Leverage Vercel's global CDN for fast load times
6. **Automatic HTTPS**: All deployments include free SSL certificates
7. **Git Integration**: Use Git workflow for version control and rollbacks
8. **Zero Configuration**: Let Vercel auto-detect and configure Next.js settings
9. **Incremental Static Regeneration**: Use ISR for dynamic content with static benefits
10. **Error Monitoring**: Integrate error tracking services for production monitoring

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)
- [Custom Domains Setup](https://vercel.com/docs/concepts/projects/domains)

## Support

For deployment issues:
1. Check Vercel deployment logs in the dashboard
2. Review [Vercel Documentation](https://vercel.com/docs)
3. Visit [Vercel Community](https://github.com/vercel/vercel/discussions)
4. Check Next.js [GitHub Issues](https://github.com/vercel/next.js/issues)
