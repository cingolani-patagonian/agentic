"""Enhanced utility functions with improved parsing capabilities."""

import json
import logging
import re
from typing import Any, TypeVar, Type, Union, List, Optional, Tuple
from datetime import datetime

T = TypeVar('T')

logger = logging.getLogger(__name__)


def _extract_from_code_block_greedy(text: str) -> Optional[str]:
    """Extract JSON from code blocks using greedy matching.

    This handles cases where the JSON might contain nested backticks
    or multiple code blocks by using greedy matching.
    """
    # Match ```json or ``` with GREEDY matching (.*) instead of lazy (.*?)
    pattern = r'```(?:json)?\s*\n(.*)\n```'
    match = re.search(pattern, text, re.DOTALL)
    if match:
        return match.group(1).strip()
    return None


def _extract_from_code_block_multiline(text: str) -> Optional[str]:
    """Handle code blocks that might not have perfect newlines.

    This is more lenient about whitespace around the JSON content.
    """
    pattern = r'```(?:json)?\s*([\[\{].*?[\]\}])\s*```'
    match = re.search(pattern, text, re.DOTALL)
    if match:
        return match.group(1).strip()
    return None


def _extract_json_boundaries(text: str) -> Optional[str]:
    """Find JSON by looking for array/object boundaries.

    This finds the outermost JSON structure by searching for
    the first opening bracket/brace and last closing bracket/brace.
    """
    # Try array first, then object
    for start_char, end_char in [('[', ']'), ('{', '}')]:
        start = text.find(start_char)
        if start != -1:
            end = text.rfind(end_char)
            if end > start:
                candidate = text[start:end + 1]
                # Quick validation - try to parse it
                try:
                    json.loads(candidate)
                    return candidate
                except:
                    pass
    return None


def _extract_first_valid_json(text: str) -> Optional[str]:
    """Try to parse JSON starting from different positions.

    This scans through the text line by line, trying to find
    a valid JSON structure starting from each position.
    """
    lines = text.split('\n')
    for i in range(len(lines)):
        candidate = '\n'.join(lines[i:])
        candidate_stripped = candidate.strip()

        if candidate_stripped.startswith(('[', '{')):
            # Try to find matching closing bracket
            for start_char, end_char in [('[', ']'), ('{', '}')]:
                if candidate_stripped.startswith(start_char):
                    # Find the matching end
                    end = candidate_stripped.rfind(end_char)
                    if end > 0:
                        try:
                            potential_json = candidate_stripped[:end + 1]
                            json.loads(potential_json)
                            return potential_json
                        except:
                            continue
    return None


def _validate_and_convert(result: Any, target_type: Type[T] = None) -> Union[T, Any]:
    """Validate and convert parsed JSON to target type.

    This handles Pydantic model validation with partial recovery:
    - For lists, it tries to validate each item individually
    - Invalid items are skipped with warnings logged
    - Returns as many valid items as possible
    """
    if target_type is None:
        return result

    # Handle List[SomeType]
    if hasattr(target_type, '__origin__') and target_type.__origin__ == list:
        if not isinstance(result, list):
            raise ValueError(f"Expected list, got {type(result).__name__}")

        item_type = target_type.__args__[0]
        validated = []
        errors = []

        # Try to validate each item, collecting errors
        for i, item in enumerate(result):
            try:
                if hasattr(item_type, 'model_validate'):
                    validated.append(item_type.model_validate(item))
                elif hasattr(item_type, 'parse_obj'):
                    validated.append(item_type.parse_obj(item))
                else:
                    validated.append(item)
            except Exception as e:
                error_msg = f"Item {i}: {str(e)}"
                errors.append(error_msg)
                logger.warning(f"Validation error for item {i}: {e}")

        # If we got at least some valid items, return them with warning
        if validated and errors:
            logger.warning(
                f"Partial validation: {len(validated)}/{len(result)} items valid. "
                f"Errors: {len(errors)}"
            )
        elif not validated:
            raise ValueError(f"No valid items found. Errors: {errors}")

        return validated

    # Handle single Pydantic model
    if hasattr(target_type, 'model_validate'):
        return target_type.model_validate(result)
    elif hasattr(target_type, 'parse_obj'):
        return target_type.parse_obj(result)

    return result


def parse_json_enhanced(text: str, target_type: Type[T] = None) -> Union[T, Any]:
    """Enhanced JSON parser with multiple extraction strategies.

    This parser tries multiple strategies to extract JSON from text:
    1. Code block extraction (greedy matching)
    2. Code block with flexible whitespace
    3. JSON boundary detection
    4. Line-by-line scanning for valid JSON

    Args:
        text: String containing JSON, possibly wrapped in markdown
        target_type: Optional type to validate/parse the result into

    Returns:
        Parsed JSON object, optionally validated as target_type

    Raises:
        ValueError: If JSON cannot be parsed from the text
    """
    strategies = [
        ("code_block_greedy", _extract_from_code_block_greedy),
        ("code_block_multiline", _extract_from_code_block_multiline),
        ("json_boundaries", _extract_json_boundaries),
        ("line_scan", _extract_first_valid_json),
    ]

    last_error = None
    for strategy_name, strategy_func in strategies:
        try:
            json_str = strategy_func(text)
            if json_str:
                logger.debug(f"JSON extraction successful using strategy: {strategy_name}")
                result = json.loads(json_str)
                return _validate_and_convert(result, target_type)
        except json.JSONDecodeError as e:
            last_error = f"{strategy_name}: JSON decode error: {e}"
            logger.debug(f"Strategy {strategy_name} failed: {e}")
            continue
        except Exception as e:
            last_error = f"{strategy_name}: {str(e)}"
            logger.debug(f"Strategy {strategy_name} failed: {e}")
            continue

    # All strategies failed
    error_msg = f"Failed to parse JSON after {len(strategies)} strategies. Last error: {last_error}"
    logger.error(error_msg)
    raise ValueError(error_msg)


def parse_test_results_with_recovery(
    output: str,
    logger_instance: logging.Logger
) -> Tuple[List, int, int, List[str]]:
    """Parse test results with partial recovery on failures.

    This function attempts to parse test results even if some are malformed.
    It will recover as many valid results as possible and log warnings.

    Args:
        output: Raw output string containing test results
        logger_instance: Logger for warnings and errors

    Returns:
        Tuple of (results, passed_count, failed_count, warnings)
    """
    # Import here to avoid circular imports
    from .data_types import TestResult

    warnings = []

    try:
        # Try enhanced parsing first
        results = parse_json_enhanced(output, List[TestResult])

        if not isinstance(results, list):
            warning = f"Expected list, got {type(results).__name__}"
            warnings.append(warning)
            logger_instance.warning(warning)
            return [], 0, 0, warnings

        # Results are already validated by parse_json_enhanced
        passed_count = sum(1 for test in results if test.passed)
        failed_count = len(results) - passed_count

        return results, passed_count, failed_count, warnings

    except ValueError as e:
        # Enhanced parsing failed entirely
        error_msg = f"Complete parse failure: {str(e)}"
        warnings.append(error_msg)
        logger_instance.error(error_msg)

        # Try to extract partial information using fallback
        partial_results = _attempt_partial_test_recovery(output, logger_instance)
        if partial_results:
            recovery_msg = f"Recovered {len(partial_results)} results through fallback parsing"
            warnings.append(recovery_msg)
            logger_instance.info(recovery_msg)

            passed = sum(1 for t in partial_results if t.passed)
            failed = len(partial_results) - passed
            return partial_results, passed, failed, warnings

        return [], 0, 0, warnings


def _attempt_partial_test_recovery(output: str, logger_instance: logging.Logger) -> List:
    """Attempt to recover partial test results from malformed output.

    This is a last-resort fallback that tries to find individual JSON objects
    that look like test results, even if the overall structure is broken.
    """
    from .data_types import TestResult

    recovered = []

    # Strategy 1: Look for individual JSON objects
    # Pattern: {...} that might be a test result
    pattern = r'\{[^{}]*"test_name"[^{}]*\}'
    matches = re.finditer(pattern, output, re.DOTALL)

    for match in matches:
        try:
            obj_str = match.group(0)
            obj = json.loads(obj_str)

            # Check if it looks like a TestResult
            if 'test_name' in obj and 'passed' in obj:
                # Try to validate with required fields
                result = TestResult.model_validate(obj)
                recovered.append(result)
                logger_instance.debug(f"Recovered test result: {result.test_name}")
        except Exception as e:
            logger_instance.debug(f"Failed to recover object: {e}")
            continue

    if recovered:
        logger_instance.info(f"Partial recovery: found {len(recovered)} test results")
    else:
        logger_instance.warning("Partial recovery: no test results found")

    return recovered


def parse_e2e_results_with_recovery(
    output: str,
    logger_instance: logging.Logger
) -> Tuple[List, int, int, List[str]]:
    """Parse E2E test results with partial recovery on failures.

    Similar to parse_test_results_with_recovery but for E2E tests.
    """
    from .data_types import E2ETestResult

    warnings = []

    try:
        # Try enhanced parsing first
        results = parse_json_enhanced(output, List[E2ETestResult])

        if not isinstance(results, list):
            warning = f"Expected list, got {type(results).__name__}"
            warnings.append(warning)
            logger_instance.warning(warning)
            return [], 0, 0, warnings

        passed_count = sum(1 for test in results if test.passed)
        failed_count = len(results) - passed_count

        return results, passed_count, failed_count, warnings

    except ValueError as e:
        error_msg = f"Complete parse failure: {str(e)}"
        warnings.append(error_msg)
        logger_instance.error(error_msg)

        # E2E results are harder to recover, but we can try
        # For now, just return empty with warnings
        return [], 0, 0, warnings
