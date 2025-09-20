# Commit Conventions

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification to ensure consistent, readable commit messages that enable automated tooling.

## Commit Message Format

Each commit message consists of a **header**, **body** and **footer**. The header has a specific format that includes a **type**, **scope** and **subject**:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Header

The header is mandatory and must conform to the following format:

- **Length**: Maximum 72 characters
- **Case**: Type must be lowercase
- **Punctuation**: No period at the end

#### Type

Must be one of the following:

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) |
| `refactor` | A code change that neither fixes a bug nor adds a feature |
| `perf` | A code change that improves performance |
| `test` | Adding missing tests or correcting existing tests |
| `chore` | Changes to the build process or auxiliary tools and libraries |
| `ci` | Changes to CI configuration files and scripts |
| `build` | Changes that affect the build system or external dependencies |
| `revert` | Reverts a previous commit |

#### Scope

The scope is optional and should be a noun describing a section of the codebase surrounded by parentheses:

- `feat(parser): add ability to parse arrays`
- `fix(runtime): resolve memory leak in component lifecycle`

#### Description

The description contains a succinct description of the change:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No period (.) at the end

### Body

The body is optional and should include the motivation for the change and contrast this with previous behavior.

- Use the imperative, present tense
- Maximum line length: 100 characters
- Include a blank line before the body

### Footer

The footer is optional and should contain:

- **Breaking Changes**: Start with `BREAKING CHANGE:` followed by a description
- **Issue References**: Reference GitHub issues that this commit closes

## Examples

### Simple feature
```
feat: add user authentication system
```

### Feature with scope
```
feat(auth): implement JWT token validation
```

### Bug fix with body
```
fix: resolve null pointer exception in user service

The user service was not properly handling null email addresses
during the registration process. Added proper validation and error
handling to prevent crashes.

Closes #123
```

### Breaking change
```
feat!: change API response format

BREAKING CHANGE: The API now returns user data in a nested object
structure instead of a flat structure. Update client code accordingly.

Before: { "name": "John", "email": "john@example.com" }
After: { "user": { "name": "John", "email": "john@example.com" } }
```

### Revert
```
revert: feat: add user authentication system

This reverts commit 1234567890abcdef.
```

## Validation

This project uses [commitlint](https://commitlint.js.org/) with [Husky](https://typicode.github.io/husky/) to automatically validate commit messages. Invalid commit messages will be rejected.

### Common Validation Errors

1. **Invalid type**: Use only the allowed types listed above
2. **Missing description**: Every commit must have a description
3. **Header too long**: Keep the header under 72 characters
4. **Improper case**: Type must be lowercase, description should not start with capital letter
5. **Trailing period**: Don't end the description with a period

## Tools and Setup

### Husky Pre-commit Hooks

The project includes pre-commit hooks that run automatically before each commit:

- **Pre-commit**: Validates package.json and lockfile sync
- **Commit-msg**: Validates commit message format using commitlint

### Configuration Files

- `commitlint.config.js`: Commitlint configuration
- `.husky/commit-msg`: Husky hook for commit message validation
- `.husky/pre-commit`: Husky hook for pre-commit checks

## Benefits

Following these conventions provides several benefits:

1. **Automated Changelog Generation**: Tools can automatically generate changelogs from commit messages
2. **Semantic Versioning**: Automated version bumps based on commit types
3. **Better Collaboration**: Clear, consistent commit history makes code review easier
4. **Issue Tracking**: Automatic linking between commits and issues
5. **Release Notes**: Automated generation of release notes

## Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Commitlint Documentation](https://commitlint.js.org/)
- [Husky Documentation](https://typicode.github.io/husky/)
- [Semantic Versioning](https://semver.org/)