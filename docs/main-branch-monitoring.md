# Main Branch Monitoring System

This repository includes an automated monitoring system to ensure the main branch remains healthy and to alert when issues occur.

## 🚨 Automatic Failure Detection

The system automatically detects when the main branch has issues and takes the following actions:

### What Gets Monitored

- **Build Status**: Ensures the project builds successfully
- **Linting**: Checks code quality and style rules
- **Formatting**: Validates code formatting consistency
- **Package.json Validity**: Ensures package.json is valid JSON

### Automatic Actions on Failure

1. **Issue Creation**: Automatically creates a GitHub issue with:
   - Details about what failed
   - Link to the failing workflow run
   - Timestamp and commit information
   - Labels: `main-branch-failure`, `automated`, `high-priority`, `bug`

2. **Issue Updates**: If multiple failures occur, comments are added to the existing issue

3. **Auto-Resolution**: When the main branch becomes healthy again, issues are automatically closed

## 🔧 Manual Health Check

You can manually check the main branch health using the provided script:

```bash
./scripts/check-main-health.sh
```

This script will:

- Switch to the main branch (if not already there)
- Pull the latest changes
- Validate package.json format
- Install dependencies
- Run build, lint, and format checks
- Report the overall health status

## 📋 Workflow Files

### `.github/workflows/main-branch-monitor.yml`

The main monitoring workflow that:

- Runs on every push to main
- Runs when other workflows complete on main
- Creates/updates issues on failure
- Closes issues when problems are resolved

### Existing Workflows

- **Build** (`.github/workflows/build.yml`): Builds the project
- **Lint and Format** (`.github/workflows/lint-format.yml`): Checks code quality

## 🚀 How It Works

1. **Trigger**: Any push to main or completion of other workflows on main
2. **Health Check**: Runs comprehensive checks (build, lint, format, package.json)
3. **Issue Management**:
   - Creates issues for new failures
   - Updates existing issues for additional failures
   - Closes issues when all checks pass
4. **Notifications**: Logs alerts (can be extended to Slack, email, etc.)

## 🛠️ Customization

### Adding More Checks

To add additional health checks, modify the `main-branch-monitor.yml` workflow:

```yaml
- name: Run custom check
  id: custom
  run: |
    echo "Running custom check..."
    # Your custom check here
    echo "✅ Custom check successful"
  continue-on-error: true
```

### Adding Notifications

The workflow includes a placeholder for notifications. You can extend it to send alerts to:

- Slack channels
- Email lists
- Discord webhooks
- Microsoft Teams
- Other notification systems

### Customizing Issue Labels

Modify the labels in the workflow to match your project's labeling system:

```yaml
labels: ['main-branch-failure', 'automated', 'high-priority', 'bug']
```

## 📊 Benefits

- **Immediate Awareness**: Know instantly when main branch breaks
- **Automatic Tracking**: Issues are created and managed automatically
- **Historical Record**: All failures are documented with timestamps and details
- **Self-Healing**: Issues close automatically when problems are resolved
- **Manual Verification**: Easy script to check health manually

## 🔍 Troubleshooting

### Common Issues

1. **Package.json Corruption**: The most common issue is malformed JSON in package.json
   - **Fix**: Validate JSON format and fix syntax errors
   - **Prevention**: Use proper merge conflict resolution

2. **Build Failures**: Usually due to missing dependencies or code errors
   - **Fix**: Check the workflow logs for specific error messages
   - **Prevention**: Test builds locally before merging

3. **Linting Failures**: Code style or quality issues
   - **Fix**: Run `npm run lint` locally and fix issues
   - **Prevention**: Use pre-commit hooks and IDE linting

4. **Formatting Issues**: Code formatting inconsistencies
   - **Fix**: Run `npm run format` to auto-fix formatting
   - **Prevention**: Configure IDE to format on save

### Manual Recovery

If the monitoring system itself has issues:

1. Check the workflow logs in GitHub Actions
2. Run the manual health check script
3. Fix any identified issues
4. Push fixes to main branch
5. Verify the monitoring workflow runs successfully

## 📈 Future Enhancements

Potential improvements to consider:

- Integration with external monitoring services
- Slack/Teams notifications
- Performance regression detection
- Security vulnerability scanning
- Dependency update monitoring
- Branch protection rule enforcement
