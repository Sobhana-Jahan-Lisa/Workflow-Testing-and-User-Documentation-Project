# Workflow Testing and User Documentation Project

## Overview

This project is a portfolio-ready simulation of workflow testing, user documentation, troubleshooting support, and process improvement for a graduate application portal. 

The project includes:

- A simulated graduate application portal workflow
- A manual QA test plan
- A structured test case file
- A Python-based workflow QA runner
- Sample generated test reports
- User guide and troubleshooting documentation
- Bug report template
- Process improvement notes



This project demonstrates the ability to:

- Test web-based workflows
- Identify form validation and navigation issues
- Document expected and actual behavior
- Prepare user-facing instructions
- Create troubleshooting materials
- Support non-technical users
- Translate workflow problems into process improvement recommendations



## Repository Structure

```text
Workflow-Testing-and-User-Documentation/
│
├── README.md
├── index.html
├── src/
│   ├── app.js
│   └── styles.css
├── qa/
│   ├── workflow_qa_runner.py
│   ├── test_cases.csv
│   ├── test_plan.md
│   └── bug_report_template.md
├── docs/
│   ├── user_guide.md
│   ├── admin_guide.md
│   ├── troubleshooting_guide.md
│   ├── process_improvement_notes.md
├── reports/
│   ├── workflow_test_results.csv
│   └── workflow_test_summary.md
└── .gitignore
```

## How to Run the Demo Portal

Open `index.html` in a browser.

Recommended VS Code method:

1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

## How to Run the QA Script

Open a terminal in the project folder and run:

```bash
python qa/workflow_qa_runner.py
```

The script will check whether the application workflow includes important features such as:

- Applicant information fields
- Required document checklist
- Validation messages
- Review step
- Confirmation message
- Documentation files
- Test plan and test cases

It will generate updated reports in the `reports/` folder.

## Important Note

This is a simulated portfolio project. It does not use real applicant records, institutional systems, private data, or a live CRM. All names, examples, and workflows are fictional.

