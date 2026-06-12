# Admin Guide

## Purpose

This admin guide explains how a staff member or technical support assistant could review and maintain the simulated workflow.

## Files to Review

| File | Purpose |
|---|---|
| index.html | Main workflow interface |
| src/app.js | Workflow logic and validation |
| src/styles.css | Visual layout and design |
| qa/test_cases.csv | Manual test cases |
| qa/workflow_qa_runner.py | Automated project and documentation checks |
| docs/user_guide.md | User-facing instructions |
| docs/troubleshooting_guide.md | Support guidance |
| docs/process_improvement_notes.md | Recommendations for workflow improvement |

## Workflow Areas

The workflow has four main steps:

1. Applicant Information
2. Document Checklist
3. Review Application
4. Confirmation

It also includes a Help Desk Support Panel for support note simulation.

## Maintenance Notes

When updating the workflow:

- Update validation rules in `src/app.js`
- Update related instructions in `docs/user_guide.md`
- Update test cases in `qa/test_cases.csv`
- Re-run `python qa/workflow_qa_runner.py`
- Review generated reports in the `reports/` folder

## Documentation Standard

Every workflow change should include:

- Description of the change
- Reason for the change
- Affected users
- Updated test cases
- Updated user documentation
