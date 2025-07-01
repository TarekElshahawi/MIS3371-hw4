
/* Program name: hw3.js
Author: Tarek Elshahawi
Date created: 2025-06-04
Date last edited: 2025-06-30
Version: 3.0
Description: JavaScript validation for Homework 3
*/

window.onload = function () {
  const dobField = document.getElementById("dob");
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dobField.max = `${yyyy}-${mm}-${dd}`;
  dobField.min = `${yyyy - 120}-${mm}-${dd}`;

  updateMedCount();

  // Attach listeners to all form fields for real-time validation
  const inputs = document.querySelectorAll("input, select, textarea");
  inputs.forEach(input => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => validateField(input));
  });
};

function updateMedCount() {
  const medSlider = document.getElementById("medications");
  const display = document.getElementById("medicationsDisplay");
  if (medSlider && display) {
    display.textContent = medSlider.value;
  }
}

function validateField(input) {
  const name = input.name;
  const value = input.value.trim();
  const errorId = name + "-error";
  let error = "";

  let existing = document.getElementById(errorId);
  if (existing) existing.remove();
  input.classList.remove("error", "valid");

  switch (name) {
    case "firstName":
      if (!/^[A-Za-z'-]{1,30}$/.test(value)) error = "First name must be 1-30 letters, apostrophes, or dashes.";
      break;
    case "middleInitial":
      if (value && !/^[A-Za-z]{1}$/.test(value)) error = "Middle initial must be 1 letter only.";
      break;
    case "lastName":
      if (!/^[A-Za-z'\-2-5]{1,30}$/.test(value)) error = "Last name must be 1-30 letters, apostrophes, digits 2–5, or dashes.";
      break;
    case "dob":
      if (!input.value) error = "Date of birth is required.";
      else {
        const date = new Date(value);
        const now = new Date();
        const oldest = new Date(now.getFullYear() - 120, now.getMonth(), now.getDate());
        if (date > now || date < oldest) error = "Invalid date of birth.";
      }
      break;
    case "ssn":
      if (!/^\d{3}-\d{2}-\d{4}$/.test(value)) error = "SSN must be in 000-00-0000 format.";
      break;
    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format.";
      break;
    case "address1":
      if (!/^.{2,30}$/.test(value)) error = "Address Line 1 must be 2-30 characters.";
      break;
    case "address2":
      if (value && !/^.{2,30}$/.test(value)) error = "Address Line 2 must be 2-30 characters.";
      break;
    case "city":
      if (!/^[A-Za-z ]{2,30}$/.test(value)) error = "City must be 2-30 letters only.";
      break;
    case "zip":
      if (!/^\d{5}(-\d{4})?$/.test(value)) error = "ZIP must be 5 digits or ZIP+4.";
      break;
    case "userid":
      if (!/^[A-Za-z_][A-Za-z0-9_-]{4,29}$/.test(value)) error = "User ID must be 5-30 characters, start with a letter or underscore, no spaces.";
      break;
    case "password":
      const uid = document.getElementById("userid").value;
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s"])[^" ]{8,30}$/.test(value)) error = "Password must be 8-30 chars, include upper/lowercase, number, special char (no quotes/spaces).";
      else if (value.toLowerCase().includes(uid.toLowerCase())) error = "Password cannot contain User ID.";
      break;
    case "repassword":
      const pass = document.getElementById("password").value;
      if (value !== pass) error = "Passwords do not match.";
      break;
  }

  if (error) {
    const msg = document.createElement("span");
    msg.className = "error-msg";
    msg.id = errorId;
    msg.textContent = error;
    input.classList.add("error");
    input.insertAdjacentElement("afterend", msg);
    return false;
  } else {
    input.classList.add("valid");
    return true;
  }
}

function validateForm() {
  const form = document.forms["regForm"];
  const inputs = form.querySelectorAll("input, select, textarea");
  let valid = true;
  inputs.forEach(input => {
    const fieldValid = validateField(input);
    if (!fieldValid) valid = false;
  });

  const submitBtn = document.getElementById("submitBtn");
  if (valid) submitBtn.style.display = "inline-block";
  else submitBtn.style.display = "none";
}
