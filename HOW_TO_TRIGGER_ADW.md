# How to Trigger ADW Workflows

## Overview

ADW workflows can be triggered in 3 ways:
1. **Manual** - Run scripts directly for specific issues
2. **Automated (Cron)** - Polls GitHub every 20 seconds
3. **Automated (Webhook)** - Real-time GitHub event processing

---

## Prerequisites Setup

### 1. Configure Environment Variables

```bash
# Required
export GITHUB_REPO_URL="https://github.com/YOUR_USERNAME/YOUR_REPO"
export ANTHROPIC_API_KEY="sk-ant-..." # Your Anthropic API key

# Optional (if not using gh auth login)
export GITHUB_PAT="ghp_..."  # GitHub Personal Access Token

# Optional (if claude is not in PATH)
export CLAUDE_CODE_PATH="/path/to/claude"
```

Or add to your shell profile (`~/.zshrc` or `~/.bashrc`):

```bash
echo 'export GITHUB_REPO_URL="https://github.com/YOUR_USERNAME/YOUR_REPO"' >> ~/.zshrc
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.zshrc
source ~/.zshrc
```

### 2. Install Prerequisites

```bash
# GitHub CLI (if not installed)
brew install gh              # macOS
# or: sudo apt install gh    # Ubuntu/Debian

# Authenticate with GitHub
gh auth login

# Verify installation
gh auth status
claude --version
```

### 3. Check Current Setup

```bash
# Verify environment
cd adws
uv run adw_tests/health_check.py
```

---

## Method 1: Manual Trigger (Recommended for Testing)

### Basic Usage

```bash
cd adws

# Replace 123 with your GitHub issue number
uv run adw_plan_build_iso.py 123
```

### Available Workflows

#### Quick Workflows (5-10 minutes)

```bash
# Plan + Build (no tests)
uv run adw_plan_build_iso.py 123

# Plan + Build + Document
uv run adw_plan_build_document_iso.py 123

# Plan only (for review)
uv run adw_plan_iso.py 123
```

#### Standard Workflows (10-20 minutes)

```bash
# Plan + Build + Test
uv run adw_plan_build_test_iso.py 123

# Plan + Build + Review (skip tests)
uv run adw_plan_build_review_iso.py 123
```

#### Complete Workflows (20-30 minutes)

```bash
# Full SDLC: Plan → Build → Test → Review → Document
uv run adw_sdlc_iso.py 123

# With custom flags
uv run adw_sdlc_iso.py 123 --skip-e2e              # Skip E2E tests
uv run adw_sdlc_iso.py 123 --skip-resolution       # Skip auto-resolution
```

#### Advanced Workflows

```bash
# Zero Touch Execution (AUTO-MERGES TO MAIN!)
# ⚠️ WARNING: This will automatically merge the PR if all tests pass
uv run adw_sdlc_zte_iso.py 123

# Individual phases (requires existing worktree from plan phase)
uv run adw_plan_iso.py 123                    # Returns adw_id
uv run adw_build_iso.py 123 <adw-id>          # Use adw_id from plan
uv run adw_test_iso.py 123 <adw-id>
uv run adw_review_iso.py 123 <adw-id>
uv run adw_document_iso.py 123 <adw-id>
uv run adw_ship_iso.py 123 <adw-id>           # Approve & merge PR
```

### Example: Process a Feature Request

```bash
# 1. Create a GitHub issue #456 with title "Add dark mode"

# 2. Run complete SDLC workflow
cd adws
uv run adw_sdlc_iso.py 456

# This will:
# ✓ Create isolated worktree at trees/<adw-id>/
# ✓ Generate implementation plan
# ✓ Implement the feature
# ✓ Run all tests (with auto-resolution)
# ✓ Review against spec and capture screenshots
# ✓ Generate documentation
# ✓ Create pull request

# 3. Check the PR on GitHub
gh pr list
```

---

## Method 2: Automated Monitoring (Cron)

### How It Works

- Polls GitHub every 20 seconds
- Looks for issues with no comments OR latest comment is "adw"
- Automatically triggers workflow based on issue body

### Start Monitoring

```bash
cd adws

# Start in foreground (see output)
uv run adw_triggers/trigger_cron.py

# OR start in background
nohup uv run adw_triggers/trigger_cron.py > adw_cron.log 2>&1 &

# View logs
tail -f adw_cron.log
```

### Stop Monitoring

```bash
# Find the process
ps aux | grep trigger_cron

# Kill it
kill <PID>
```

### How to Trigger via GitHub

1. **Create an issue** on GitHub
2. **Wait 20 seconds** - ADW will automatically detect it
3. **Or comment "adw"** on an existing issue to re-trigger

---

## Method 3: Webhook Server (Real-time)

### Setup Webhook

#### Local Development (with ngrok/cloudflared)

```bash
# Install cloudflared
brew install cloudflared

# Start webhook server
cd adws
uv run adw_triggers/trigger_webhook.py &

# Expose to internet
cloudflared tunnel --url http://localhost:8001

# Copy the public URL (e.g., https://xxx.trycloudflare.com)
```

#### Configure GitHub Webhook

1. Go to your repo: `Settings → Webhooks → Add webhook`

2. Configure:
   - **Payload URL**: `https://your-url.com/gh-webhook`
   - **Content type**: `application/json`
   - **Secret**: Set `GITHUB_WEBHOOK_SECRET` environment variable
   - **Events**: Select "Issues" and "Issue comments"

3. Save webhook

#### Test Webhook

```bash
# Create a test issue on GitHub
# The webhook should trigger immediately

# Check webhook logs
tail -f adw_triggers/webhook.log
```

### Webhook Commands

The webhook looks for these keywords in issue body:

- `adw_plan_build_iso` - Plan + Build
- `adw_plan_build_test_iso` - Plan + Build + Test
- `adw_sdlc_iso` - Complete SDLC
- `model_set heavy` - Use Opus for complex tasks (instead of Sonnet)

**Example Issue**:
```markdown
Title: Add user authentication

Body:
Please implement user authentication with JWT tokens.

adw_sdlc_iso model_set heavy
```

---

## Testing the Enhanced Parser

The enhanced parser is automatically used in the test phase. To test it:

### Option 1: Run Test Phase Directly

```bash
cd adws

# First create a worktree with plan
ADW_ID=$(uv run adw_plan_iso.py 123 | grep "ADW ID:" | awk '{print $3}')

# Then run tests (uses enhanced parser internally)
uv run adw_test_iso.py 123 $ADW_ID
```

### Option 2: Full SDLC (includes testing)

```bash
cd adws
uv run adw_sdlc_iso.py 123

# The test phase will use the enhanced parser
# Check logs for: "JSON extraction successful using strategy: ..."
```

### Option 3: Test Enhanced Parser Standalone

```bash
# Run the test suite
python3 test_parser_simple.py

# Or comprehensive demo
python3 test_parser_demo.py
```

---

## Monitoring Workflow Progress

### Check GitHub Issue Comments

ADW posts progress updates to the issue:

```
abc12345_ops: ✅ Starting ADW workflow
abc12345_planner: 📋 Generated implementation plan
abc12345_implementor: ✅ Implementation completed
abc12345_tester: 🧪 Running tests...
abc12345_tester: ✅ Tests passed: 108/108
```

### Check Worktree Status

```bash
# List all worktrees
git worktree list

# Check specific worktree
ls -la trees/<adw-id>/

# View state
cat agents/<adw-id>/adw_state.json | jq .
```

### Check Logs

```bash
# View execution logs
cat agents/<adw-id>/*/execution.log

# View agent output
cat agents/<adw-id>/*/raw_output.jsonl | tail -1 | jq .
```

### Check Ports

```bash
# See what ports are allocated
./scripts/check_ports.sh

# Access isolated instance
open http://localhost:9100  # Backend (9100-9114)
open http://localhost:9200  # Frontend (9200-9214)
```

---

## Troubleshooting

### Issue: "No worktree found"

```bash
# Entry point workflows create worktrees
uv run adw_plan_iso.py 123

# Dependent workflows require existing worktree
uv run adw_build_iso.py 123 <adw-id>
```

### Issue: "ANTHROPIC_API_KEY not set"

```bash
# Check environment
env | grep ANTHROPIC

# Set temporarily
export ANTHROPIC_API_KEY="sk-ant-..."

# Or add to .env
echo 'ANTHROPIC_API_KEY="sk-ant-..."' >> adws/.env
```

### Issue: "gh: command not found"

```bash
# Install GitHub CLI
brew install gh
gh auth login
```

### Issue: "Port already in use"

```bash
# Check what's using the port
lsof -i :9100

# Kill process or use different ADW ID (gets different port)
kill <PID>
```

### Issue: Tests failing

```bash
# Run with auto-resolution (default in SDLC)
uv run adw_sdlc_iso.py 123

# Or skip tests
uv run adw_plan_build_review_iso.py 123
```

---

## Quick Reference

| Workflow | Command | Duration | Use Case |
|----------|---------|----------|----------|
| **Quick Build** | `adw_plan_build_iso.py` | 5-10 min | Simple changes, no tests |
| **With Tests** | `adw_plan_build_test_iso.py` | 10-15 min | Standard development |
| **Full SDLC** | `adw_sdlc_iso.py` | 20-30 min | Complete feature, production-ready |
| **Auto-Ship** | `adw_sdlc_zte_iso.py` | 20-30 min | ⚠️ Auto-merges to main! |
| **Plan Only** | `adw_plan_iso.py` | 2-5 min | Review plan before implementation |

---

## Best Practices

### 1. Start with Plan Phase

```bash
# Generate plan first
uv run adw_plan_iso.py 123

# Review the plan in specs/ directory
cat specs/issue-123-*.md

# Then proceed with build if plan looks good
```

### 2. Use Appropriate Workflow

- **Small fixes**: `adw_plan_build_iso.py`
- **Features**: `adw_sdlc_iso.py`
- **Complex tasks**: Add `model_set heavy` in issue body

### 3. Monitor Progress

- Watch GitHub issue comments
- Check worktree directory
- Review agent logs

### 4. Clean Up After

```bash
# Remove worktree after PR is merged
./scripts/purge_tree.sh <adw-id>

# Or remove specific worktree
git worktree remove trees/<adw-id>
```

---

## Next Steps

1. ✅ Set environment variables
2. ✅ Test with a simple issue: `uv run adw_plan_build_iso.py 123`
3. ✅ Review generated PR on GitHub
4. ✅ Optionally set up automated monitoring or webhooks

**Need help?** Check `adws/README.md` for detailed documentation.
