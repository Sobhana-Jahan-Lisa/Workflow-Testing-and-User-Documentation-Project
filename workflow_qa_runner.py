"""
Workflow Testing and User Documentation Project

This script performs lightweight quality checks on the simulated graduate
application portal project and generates CSV and Markdown reports.

How to run:
    python qa/workflow_qa_runner.py
"""

import csv
from pathlib import Path
from datetime import datetime

BASE_DIR = Path(__file__).resolve().parents[1]
REPORT_DIR = BASE_DIR / "reports"
REPORT_DIR.mkdir(exist_ok=True)

CHECKS = [
    {
        "id": "QA-001",
        "area": "Project Structure",
        "description": "Main HTML file exists",
        "file": "index.html",
        "keywords": ["Graduate Application Portal", "Application Workflow"],
        "priority": "High"
    },
    {
        "id": "QA-002",
        "area": "Workflow Logic",
        "description": "JavaScript workflow logic exists",
        "file": "src/app.js",
        "keywords": ["showStep", "validateApplicantData", "validateDocuments"],
        "priority": "High"
    },
    {
        "id": "QA-003",
        "area": "Applicant Form",
        "description": "Applicant information fields exist",
        "file": "index.html",
        "keywords": ["firstName", "lastName", "email", "program", "term", "applicantType"],
        "priority": "High"
    },
    {
        "id": "QA-004",
        "area": "Document Checklist",
        "description": "Required document checklist exists",
        "file": "index.html",
        "keywords": ["docTranscript", "docStatement", "docRecommendation", "docResume", "docEnglish"],
        "priority": "High"
    },
    {
        "id": "QA-005",
        "area": "Validation",
        "description": "Validation messages exist",
        "file": "src/app.js",
        "keywords": ["All applicant information fields are required", "Missing required document"],
        "priority": "High"
    },
    {
        "id": "QA-006",
        "area": "Review Step",
        "description": "Review summary generation exists",
        "file": "src/app.js",
        "keywords": ["buildReviewSummary", "Applicant Summary", "Document Status"],
        "priority": "Medium"
    },
    {
        "id": "QA-007",
        "area": "Confirmation",
        "description": "Submission confirmation exists",
        "file": "src/app.js",
        "keywords": ["Confirmation ID", "Application Submitted"],
        "priority": "High"
    },
    {
        "id": "QA-008",
        "area": "Help Desk Support",
        "description": "Support note/ticket simulation exists",
        "file": "src/app.js",
        "keywords": ["Support Note Created", "Ticket ID", "Suggested Next Step"],
        "priority": "Medium"
    },
    {
        "id": "QA-009",
        "area": "Documentation",
        "description": "User guide exists",
        "file": "docs/user_guide.md",
        "keywords": ["Applicant Information", "Required Document Checklist", "Help Desk Support Panel"],
        "priority": "High"
    },
    {
        "id": "QA-010",
        "area": "Documentation",
        "description": "Troubleshooting guide exists",
        "file": "docs/troubleshooting_guide.md",
        "keywords": ["Possible Cause", "Suggested Resolution", "Escalation Guidance"],
        "priority": "High"
    },
    {
        "id": "QA-011",
        "area": "Testing",
        "description": "Manual test cases exist",
        "file": "qa/test_cases.csv",
        "keywords": ["Test Case ID", "Expected Result", "Priority"],
        "priority": "High"
    },
    {
        "id": "QA-012",
        "area": "Testing",
        "description": "Bug report template exists",
        "file": "qa/bug_report_template.md",
        "keywords": ["Steps to Reproduce", "Expected Result", "Actual Result", "Severity"],
        "priority": "Medium"
    },
]


def run_check(check):
    file_path = BASE_DIR / check["file"]

    if not file_path.exists():
        return {
            **check,
            "status": "Fail",
            "evidence": f"Missing file: {check['file']}"
        }

    content = file_path.read_text(encoding="utf-8", errors="ignore")
    missing_keywords = [keyword for keyword in check["keywords"] if keyword not in content]

    if missing_keywords:
        return {
            **check,
            "status": "Fail",
            "evidence": "Missing keyword(s): " + ", ".join(missing_keywords)
        }

    return {
        **check,
        "status": "Pass",
        "evidence": "Required file and keyword checks passed."
    }


def write_csv_report(results):
    output_path = REPORT_DIR / "workflow_test_results.csv"

    with output_path.open("w", newline="", encoding="utf-8") as csv_file:
        fieldnames = ["id", "area", "description", "priority", "status", "evidence"]
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        writer.writeheader()

        for result in results:
            writer.writerow({
                "id": result["id"],
                "area": result["area"],
                "description": result["description"],
                "priority": result["priority"],
                "status": result["status"],
                "evidence": result["evidence"]
            })

    return output_path


def write_markdown_summary(results):
    output_path = REPORT_DIR / "workflow_test_summary.md"
    total = len(results)
    passed = sum(1 for result in results if result["status"] == "Pass")
    failed = total - passed

    lines = [
        "# Workflow Test Summary",
        "",
        f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        "",
        "## Summary",
        "",
        f"- Total checks: {total}",
        f"- Passed: {passed}",
        f"- Failed: {failed}",
        "",
        "## Detailed Results",
        "",
        "| Check ID | Area | Description | Priority | Status | Evidence |",
        "|---|---|---|---|---|---|"
    ]

    for result in results:
        lines.append(
            f"| {result['id']} | {result['area']} | {result['description']} | "
            f"{result['priority']} | {result['status']} | {result['evidence']} |"
        )

    output_path.write_text("\n".join(lines), encoding="utf-8")
    return output_path


def main():
    results = [run_check(check) for check in CHECKS]

    csv_report = write_csv_report(results)
    markdown_report = write_markdown_summary(results)

    print(f"CSV report created: {csv_report}")
    print(f"Markdown summary created: {markdown_report}")

    failed = [result for result in results if result["status"] == "Fail"]
    if failed:
        print("\nSome checks failed:")
        for result in failed:
            print(f"- {result['id']}: {result['description']} -> {result['evidence']}")
    else:
        print("\nAll workflow QA checks passed.")


if __name__ == "__main__":
    main()
