# Codegen Agent Rules for Tinker Project

## Code Quality Requirements

### Pre-Push Checklist

All sub-agents MUST complete the following checks before pushing any code:

1. **Linting**: Run `npm run lint` and fix all errors
2. **Formatting**: Run `npm run format` to ensure consistent code style
3. **Type Checking**: Ensure TypeScript compilation passes without errors
4. **Testing**: Run relevant tests and ensure they pass
5. **Build Verification**: Verify the project builds successfully

### Backend-Specific Rules

For changes in `apps/backend/`:

```bash
# Required commands before pushing:
cd apps/backend
npm run lint:fix          # Fix linting issues
npm run format            # Format code
npm run test              # Run tests
npm run build             # Verify build works
```

### Frontend-Specific Rules

For changes in `apps/frontend/`:

```bash
# Required commands before pushing:
cd apps/frontend
npm run lint:fix          # Fix linting issues
npm run format            # Format code
npm run test              # Run tests (if available)
npm run build             # Verify build works
```

## Error Handling

- All errors must use the PPXXX format for business process errors
- Include proper error logging with structured data
- Handle edge cases gracefully

## Documentation

- Update README.md if adding new features
- Add JSDoc comments for complex functions
- Update API documentation for new endpoints

## Commit Messages

Use conventional commit format:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `refactor:` for code refactoring
- `test:` for adding tests

## Failure Protocol

If any of the above checks fail:

1. Fix the issues before pushing
2. Re-run all checks to ensure they pass
3. Only push when all quality gates are green

**Note**: These rules are enforced to maintain code quality and prevent build failures.
