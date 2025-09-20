# Commit Message Quick Reference

## Format
```
<type>[scope]: <description>
```

## Common Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code formatting
- `refactor` - Code restructuring
- `test` - Tests
- `chore` - Maintenance

## Examples
```bash
feat: add user login functionality
fix: resolve memory leak in parser
docs: update API documentation
style: format code with prettier
refactor: extract common utility functions
test: add unit tests for auth service
chore: update dependencies
```

## Rules
- ✅ `feat: add search feature`
- ❌ `Add search feature` (missing type)
- ❌ `feat: Add search feature` (capitalized description)
- ❌ `feat: add search feature.` (trailing period)
- ❌ `feat add search feature` (missing colon)

## Validation
Commits are automatically validated by commitlint. Invalid messages will be rejected.