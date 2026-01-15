"""Enhanced data types with error categorization and improved response models."""

from enum import Enum
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field


class ErrorCategory(str, Enum):
    """Categorized error types for better debugging and monitoring."""

    # Execution errors
    TIMEOUT = "timeout"
    COMMAND_NOT_FOUND = "command_not_found"
    PERMISSION_DENIED = "permission_denied"

    # Parsing errors
    JSON_PARSE_FAILED = "json_parse_failed"
    INVALID_FORMAT = "invalid_format"
    SCHEMA_VALIDATION_FAILED = "schema_validation_failed"
    PARTIAL_PARSE_SUCCESS = "partial_parse_success"

    # Claude Code errors
    CLAUDE_ERROR = "claude_error"
    AGENT_ERROR_DURING_EXECUTION = "agent_error_during_execution"

    # Infrastructure errors
    NETWORK_ERROR = "network_error"
    FILE_SYSTEM_ERROR = "file_system_error"

    # Unknown
    UNKNOWN = "unknown"


class AgentPromptResponseEnhanced(BaseModel):
    """Enhanced agent response with error categorization and structured details.

    This extends the basic response with:
    - Error categorization for better debugging
    - Structured error details for programmatic access
    - Parse warnings for partial success cases
    """

    output: str
    success: bool
    session_id: Optional[str] = None
    retry_code: str = "none"  # From RetryCode enum in data_types.py

    # Enhanced fields
    error_category: Optional[ErrorCategory] = None
    error_details: Optional[Dict[str, Any]] = None
    parse_warnings: list[str] = Field(default_factory=list)

    def has_warnings(self) -> bool:
        """Check if there are any parse warnings."""
        return len(self.parse_warnings) > 0

    def is_partial_success(self) -> bool:
        """Check if this was a partial success (some data recovered)."""
        return (
            self.error_category == ErrorCategory.PARTIAL_PARSE_SUCCESS
            or (self.success and self.has_warnings())
        )


class ParseMetrics(BaseModel):
    """Metrics for a single parsing attempt."""

    timestamp: str
    command: str
    strategy_used: Optional[str] = None
    success: bool
    error: Optional[str] = None
    output_length: int = 0
    parse_time_ms: float = 0
    items_parsed: int = 0
    items_failed: int = 0


class ParseStatistics(BaseModel):
    """Aggregate parsing statistics for monitoring."""

    total_attempts: int = 0
    successful: int = 0
    failed: int = 0
    partial_success: int = 0
    success_rate: float = 0.0
    average_parse_time_ms: float = 0.0

    attempts: list[ParseMetrics] = Field(default_factory=list)

    def add_attempt(self, attempt: ParseMetrics):
        """Add a parsing attempt and update statistics."""
        self.total_attempts += 1
        if attempt.success:
            if attempt.items_failed > 0:
                self.partial_success += 1
            else:
                self.successful += 1
        else:
            self.failed += 1

        self.attempts.append(attempt)

        # Update success rate
        if self.total_attempts > 0:
            self.success_rate = (self.successful + self.partial_success) / self.total_attempts

        # Update average parse time
        if self.attempts:
            self.average_parse_time_ms = sum(a.parse_time_ms for a in self.attempts) / len(self.attempts)


class TestResultEnhanced(BaseModel):
    """Enhanced test result with additional metadata.

    Extends the basic TestResult with:
    - Retry count for tracking resolution attempts
    - Error category for better classification
    - Duration for performance tracking
    """

    test_name: str
    passed: bool
    execution_command: str
    test_purpose: str
    error: Optional[str] = None

    # Enhanced fields
    retry_count: int = 0
    error_category: Optional[ErrorCategory] = None
    duration_ms: Optional[float] = None
    resolved_by: Optional[str] = None  # Agent that resolved the issue


class E2ETestResultEnhanced(BaseModel):
    """Enhanced E2E test result with additional metadata."""

    test_name: str
    passed: bool
    screenshots: list[str] = Field(default_factory=list)
    error: Optional[str] = None

    # Enhanced fields
    retry_count: int = 0
    error_category: Optional[ErrorCategory] = None
    duration_ms: Optional[float] = None
    resolved_by: Optional[str] = None
    browser_logs: list[str] = Field(default_factory=list)
