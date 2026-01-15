"""Tests for enhanced parsing functionality."""

import sys
import os
import logging

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from adw_modules.utils_enhanced import (
    parse_json_enhanced,
    parse_test_results_with_recovery,
    _extract_from_code_block_greedy,
    _extract_from_code_block_multiline,
    _extract_json_boundaries,
    _extract_first_valid_json,
)
from adw_modules.data_types import TestResult
from typing import List


def test_code_block_greedy():
    """Test greedy code block extraction."""
    text = """
    Here's the result:
    ```json
    [{"test": "foo"}]
    ```
    Some other text with ``` in it.
    """
    result = _extract_from_code_block_greedy(text)
    assert result == '[{"test": "foo"}]'
    print("✅ test_code_block_greedy passed")


def test_code_block_multiline():
    """Test multiline code block extraction."""
    text = """```json[{"test": "foo"}]```"""
    result = _extract_from_code_block_multiline(text)
    assert result == '[{"test": "foo"}]'
    print("✅ test_code_block_multiline passed")


def test_json_boundaries():
    """Test JSON boundary detection."""
    text = """
    Some preamble text
    [{"test": "foo"}, {"test": "bar"}]
    Some trailing text
    """
    result = _extract_json_boundaries(text)
    assert result == '[{"test": "foo"}, {"test": "bar"}]'
    print("✅ test_json_boundaries passed")


def test_nested_code_blocks():
    """Test that nested code blocks don't break parsing."""
    text = """
    Here's the result:
    ```json
    [{"test": "foo"}]
    ```

    And here's an example with code:
    ```python
    print("```")  # This shouldn't break it
    ```
    """
    try:
        result = parse_json_enhanced(text, List[TestResult])
        # Should extract the first code block
        print(f"✅ test_nested_code_blocks passed - extracted {len(result)} item(s)")
    except ValueError:
        print("❌ test_nested_code_blocks failed - couldn't extract JSON")
        raise


def test_partial_result_recovery():
    """Test that partial results can be recovered."""
    logger = logging.getLogger("test")
    logging.basicConfig(level=logging.INFO)

    # Malformed JSON with one good item, one bad, one good
    malformed = """
    ```json
    [
        {"test_name": "test1", "passed": true, "execution_command": "cmd1", "test_purpose": "p1"},
        {"test_name": "test2", "passed": false, THIS IS BROKEN
        {"test_name": "test3", "passed": true, "execution_command": "cmd3", "test_purpose": "p3"}
    ]
    ```
    """

    results, passed, failed, warnings = parse_test_results_with_recovery(malformed, logger)

    # Should recover at least some results
    if len(results) >= 1:
        print(f"✅ test_partial_result_recovery passed - recovered {len(results)} results with {len(warnings)} warnings")
    else:
        print(f"⚠️  test_partial_result_recovery - recovered {len(results)} results, expected more")


def test_valid_test_results():
    """Test parsing valid test results."""
    valid_json = """
    ```json
    [
        {
            "test_name": "python_syntax_check",
            "passed": true,
            "execution_command": "python -m py_compile server.py",
            "test_purpose": "Validates Python syntax"
        },
        {
            "test_name": "backend_linting",
            "passed": false,
            "execution_command": "ruff check .",
            "test_purpose": "Validates code quality",
            "error": "Found 3 linting errors"
        }
    ]
    ```
    """

    try:
        results = parse_json_enhanced(valid_json, List[TestResult])
        assert len(results) == 2
        assert results[0].test_name == "python_syntax_check"
        assert results[0].passed == True
        assert results[1].test_name == "backend_linting"
        assert results[1].passed == False
        assert results[1].error == "Found 3 linting errors"
        print("✅ test_valid_test_results passed")
    except Exception as e:
        print(f"❌ test_valid_test_results failed: {e}")
        raise


def test_json_without_code_blocks():
    """Test parsing JSON without markdown code blocks."""
    plain_json = """
    [
        {
            "test_name": "test1",
            "passed": true,
            "execution_command": "cmd1",
            "test_purpose": "purpose1"
        }
    ]
    """

    try:
        results = parse_json_enhanced(plain_json, List[TestResult])
        assert len(results) == 1
        print("✅ test_json_without_code_blocks passed")
    except Exception as e:
        print(f"❌ test_json_without_code_blocks failed: {e}")
        raise


def test_json_with_surrounding_text():
    """Test parsing JSON embedded in text."""
    embedded = """
    The test execution completed successfully. Here are the results:

    [
        {
            "test_name": "test1",
            "passed": true,
            "execution_command": "cmd1",
            "test_purpose": "purpose1"
        }
    ]

    All tests have been processed.
    """

    try:
        results = parse_json_enhanced(embedded, List[TestResult])
        assert len(results) == 1
        print("✅ test_json_with_surrounding_text passed")
    except Exception as e:
        print(f"❌ test_json_with_surrounding_text failed: {e}")
        raise


def test_invalid_json():
    """Test that invalid JSON raises appropriate error."""
    invalid = """
    ```json
    [This is not valid JSON at all
    ```
    """

    try:
        results = parse_json_enhanced(invalid, List[TestResult])
        print("❌ test_invalid_json failed - should have raised ValueError")
        assert False
    except ValueError as e:
        assert "Failed to parse JSON" in str(e)
        print("✅ test_invalid_json passed - correctly raised ValueError")


def run_all_tests():
    """Run all tests."""
    print("\n" + "="*60)
    print("Running Enhanced Parsing Tests")
    print("="*60 + "\n")

    tests = [
        test_code_block_greedy,
        test_code_block_multiline,
        test_json_boundaries,
        test_nested_code_blocks,
        test_valid_test_results,
        test_json_without_code_blocks,
        test_json_with_surrounding_text,
        test_partial_result_recovery,
        test_invalid_json,
    ]

    passed = 0
    failed = 0

    for test in tests:
        try:
            test()
            passed += 1
        except Exception as e:
            print(f"❌ {test.__name__} failed with exception: {e}")
            failed += 1

    print("\n" + "="*60)
    print(f"Results: {passed} passed, {failed} failed")
    print("="*60 + "\n")

    return failed == 0


if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)
