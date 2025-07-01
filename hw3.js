window.onload = function () {
  const dobField = document.getElementById("dob");
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dobField.max = `${yyyy}-${mm}-${dd}`;
  dobField.min = `${yyyy - 120}-${mm}-${dd}`;

  updateMedCount();

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

function setCookie(name, value, hours) {
  const d = new Date();
  d.setTime(d.getTime() + hours * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
}

function getCookie(name) {
  const cArr = document.cookie.split('; ');
  for (let c of cArr) {
    const [key, val] = c.split('=');
    if (key === name) return val;
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

window.addEventListener("DOMContentLoaded", () => {
  const firstNameInput = document.getElementById("firstName");
  const greeting = document.getElementById("greeting");
  const rememberMe = document.getElementById("rememberMe");

  const storedName = getCookie("firstName");

  if (storedName) {
    greeting.textContent = `Welcome back, ${storedName}`;
    firstNameInput.value = storedName;

    const newUserDiv = document.getElementById("newUserOption");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "notMe";

    const label = document.createElement("label");
    label.textContent = ` Not ${storedName}? Click HERE to start as a NEW USER.`;
    label.prepend(checkbox);
    newUserDiv.appendChild(label);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        deleteCookie("firstName");
        greeting.textContent = "Welcome New User";
        firstNameInput.value = "";
        document.getElementById("regForm").reset();
      }
    });
  } else {
    greeting.textContent = "Welcome New User";
  }

  document.getElementById("regForm").addEventListener("submit", () => {
    if (rememberMe.checked) {
      setCookie("firstName", firstNameInput.value, 48);
    } else {
      deleteCookie("firstName");
    }
  });
});
