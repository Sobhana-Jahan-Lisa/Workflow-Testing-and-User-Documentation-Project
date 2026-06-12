const workflowState = {
  applicant: {},
  documents: {},
  confirmationId: null
};

const steps = {
  applicant: document.getElementById("step-applicant"),
  documents: document.getElementById("step-documents"),
  review: document.getElementById("step-review"),
  confirmation: document.getElementById("step-confirmation")
};

const progressSteps = [
  document.getElementById("progress-step-1"),
  document.getElementById("progress-step-2"),
  document.getElementById("progress-step-3"),
  document.getElementById("progress-step-4")
];

function showStep(stepName) {
  Object.values(steps).forEach((step) => step.classList.add("hidden"));
  steps[stepName].classList.remove("hidden");

  const order = ["applicant", "documents", "review", "confirmation"];
  const currentIndex = order.indexOf(stepName);

  progressSteps.forEach((step, index) => {
    step.classList.toggle("active", index <= currentIndex);
  });
}

function getApplicantData() {
  return {
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    email: document.getElementById("email").value.trim(),
    program: document.getElementById("program").value,
    term: document.getElementById("term").value,
    applicantType: document.getElementById("applicantType").value
  };
}

function validateApplicantData(applicant) {
  const requiredFields = [
    applicant.firstName,
    applicant.lastName,
    applicant.email,
    applicant.program,
    applicant.term,
    applicant.applicantType
  ];

  if (requiredFields.some((field) => !field)) {
    return "All applicant information fields are required.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(applicant.email)) {
    return "Please enter a valid email address.";
  }

  return "";
}

function getDocumentData() {
  return {
    transcript: document.getElementById("docTranscript").checked,
    statement: document.getElementById("docStatement").checked,
    recommendation: document.getElementById("docRecommendation").checked,
    resume: document.getElementById("docResume").checked,
    english: document.getElementById("docEnglish").checked
  };
}

function validateDocuments(documents, applicantType) {
  const requiredDocumentLabels = [];

  if (!documents.transcript) requiredDocumentLabels.push("Transcript");
  if (!documents.statement) requiredDocumentLabels.push("Statement of Purpose");
  if (!documents.recommendation) requiredDocumentLabels.push("Recommendation Letters");
  if (!documents.resume) requiredDocumentLabels.push("CV or Resume");
  if (applicantType === "International" && !documents.english) {
    requiredDocumentLabels.push("English Proficiency");
  }

  if (requiredDocumentLabels.length > 0) {
    return `Missing required document(s): ${requiredDocumentLabels.join(", ")}.`;
  }

  return "";
}

function buildReviewSummary() {
  const applicant = workflowState.applicant;
  const documents = workflowState.documents;

  const documentRows = Object.entries(documents)
    .map(([name, received]) => {
      const label = name.charAt(0).toUpperCase() + name.slice(1);
      return `<li>${label}: ${received ? "Received" : "Missing/Not Required"}</li>`;
    })
    .join("");

  return `
    <h3>Applicant Summary</h3>
    <p><strong>Name:</strong> ${applicant.firstName} ${applicant.lastName}</p>
    <p><strong>Email:</strong> ${applicant.email}</p>
    <p><strong>Program:</strong> ${applicant.program}</p>
    <p><strong>Term:</strong> ${applicant.term}</p>
    <p><strong>Applicant Type:</strong> ${applicant.applicantType}</p>
    <h3>Document Status</h3>
    <ul>${documentRows}</ul>
  `;
}

document.getElementById("to-documents").addEventListener("click", () => {
  const applicant = getApplicantData();
  const error = validateApplicantData(applicant);

  document.getElementById("applicant-error").textContent = error;

  if (error) return;

  workflowState.applicant = applicant;
  showStep("documents");
});

document.getElementById("back-to-applicant").addEventListener("click", () => {
  showStep("applicant");
});

document.getElementById("to-review").addEventListener("click", () => {
  const documents = getDocumentData();
  const error = validateDocuments(documents, workflowState.applicant.applicantType);

  document.getElementById("document-error").textContent = error;

  if (error) return;

  workflowState.documents = documents;
  document.getElementById("review-summary").innerHTML = buildReviewSummary();
  showStep("review");
});

document.getElementById("back-to-documents").addEventListener("click", () => {
  showStep("documents");
});

document.getElementById("submit-application").addEventListener("click", () => {
  workflowState.confirmationId = `APP-${Date.now().toString().slice(-6)}`;

  document.getElementById("confirmation-message").textContent =
    `Application Submitted. Thank you, ${workflowState.applicant.firstName}. Your application has been submitted. Confirmation ID: ${workflowState.confirmationId}`;

  showStep("confirmation");
});

document.getElementById("start-new-application").addEventListener("click", () => {
  document.getElementById("applicant-form").reset();

  ["docTranscript", "docStatement", "docRecommendation", "docResume", "docEnglish"].forEach((id) => {
    document.getElementById(id).checked = false;
  });

  document.getElementById("applicant-error").textContent = "";
  document.getElementById("document-error").textContent = "";
  document.getElementById("review-summary").innerHTML = "";

  workflowState.applicant = {};
  workflowState.documents = {};
  workflowState.confirmationId = null;

  showStep("applicant");
});

document.getElementById("create-ticket").addEventListener("click", () => {
  const issueType = document.getElementById("issueType").value;
  const issueDescription = document.getElementById("issueDescription").value.trim();

  if (!issueDescription) {
    document.getElementById("ticket-output").innerHTML =
      "<strong>Support Note Error:</strong> Please enter an issue description.";
    return;
  }

  const ticketId = `TICKET-${Date.now().toString().slice(-5)}`;

  document.getElementById("ticket-output").innerHTML = `
    <h3>Support Note Created</h3>
    <p><strong>Ticket ID:</strong> ${ticketId}</p>
    <p><strong>Issue Type:</strong> ${issueType}</p>
    <p><strong>Description:</strong> ${issueDescription}</p>
    <p><strong>Suggested Next Step:</strong> Review the workflow step, reproduce the issue, document expected vs actual behavior, and escalate if needed.</p>
  `;
});
