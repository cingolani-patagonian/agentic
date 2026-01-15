# Parsing Improvements for Command Outputs

## Purpose

This document provides updated guidelines for command output formatting to improve parsing reliability.

## JSON Output Format Guidelines

### Preferred Format (Recommended)

Wrap JSON in a markdown code block:

````markdown
```json
[
  {
    "test_name": "example_test",
    "passed": true,
    "execution_command": "pytest test.py",
    "test_purpose": "Validates example functionality"
  }
]
```
````

### Also Supported (Fallback)

The parser can handle these formats as well:
- Plain JSON without code blocks
- JSON with surrounding text
- Mixed markdown with embedded JSON

### What the Parser Handles

The enhanced parser (`utils_enhanced.py`) uses multiple strategies:

1. **Code block extraction** (greedy) - Handles nested backticks
2. **Code block multiline** - Flexible whitespace handling
3. **JSON boundary detection** - Finds outermost `[...]` or `{...}`
4. **Line scanning** - Searches line by line for valid JSON

### Partial Recovery

If one item in a JSON array is malformed, the parser will:
- ✅ Extract all valid items
- ⚠️ Log warnings for invalid items
- 📊 Report partial success metrics

## Updated Command Instructions Template

### For `/test` and similar commands:

```markdown
## Report

Return results as a JSON array wrapped in a markdown code block:

```json
[
  {
    "test_name": "string",
    "passed": boolean,
    "execution_command": "string",
    "test_purpose": "string",
    "error": "optional string"
  }
]
```

**Formatting notes:**
- Wrap JSON in ` ```json ` code block (preferred)
- If you need to add commentary, put it BEFORE the code block
- Each test result must include: test_name, passed, execution_command, test_purpose
- The error field is only required when passed is false

**Parser capabilities:**
- Handles markdown code blocks
- Recovers from minor formatting issues
- Can extract JSON from mixed text
- Validates each item individually
```

## Error Categorization

Commands should be aware that errors are now categorized:

- `json_parse_failed` - Unable to extract JSON
- `schema_validation_failed` - JSON doesn't match expected schema
- `partial_parse_success` - Some items valid, some invalid
- `timeout` - Command timed out
- `execution_error` - Command failed to execute

## Migration Guide

### For Command Authors

1. **Update instructions** to clarify code block format is preferred
2. **Remove contradictions** about "no markdown" vs actual parser capabilities
3. **Add examples** showing both successful and error cases
4. **Document recovery** - mention that partial results will be extracted

### For Workflow Scripts

```python
# Old way (still works)
from adw_modules.utils import parse_json
results = parse_json(output, List[TestResult])

# Enhanced way (recommended)
from adw_modules.utils_enhanced import parse_json_enhanced
results = parse_json_enhanced(output, List[TestResult])

# With recovery and warnings
from adw_modules.utils_enhanced import parse_test_results_with_recovery
results, passed, failed, warnings = parse_test_results_with_recovery(output, logger)

if warnings:
    logger.warning(f"Parse warnings: {warnings}")
```

## Benefits

1. **Higher success rate** - Multiple extraction strategies
2. **Better debugging** - Clear error categories and detailed warnings
3. **Data recovery** - Don't lose all data if one item fails
4. **Monitoring** - Track parsing metrics over time
5. **Backward compatible** - Old parser still works alongside new one

## Testing

Test your command outputs with:

```python
from adw_modules.utils_enhanced import parse_json_enhanced

# Test with your actual output
test_output = """
Here are the results:
```json
[{"test_name": "test1", "passed": true, ...}]
```
"""

try:
    results = parse_json_enhanced(test_output, List[TestResult])
    print(f"✅ Parsed {len(results)} results")
except ValueError as e:
    print(f"❌ Parse failed: {e}")
```

## Rollout Plan

1. **Phase 1** (Week 1): Deploy enhanced parser alongside existing
2. **Phase 2** (Week 2): Update command documentation
3. **Phase 3** (Week 3): Switch workflows to use enhanced parser
4. **Phase 4** (Week 4): Remove legacy parser after validation
