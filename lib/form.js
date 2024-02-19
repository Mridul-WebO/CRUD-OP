import { getSingleData, addData, getData, editData } from '../storage/storage.js';
import { addRow, addRowToAdvTable, editRow } from './table.js';
import { checkIfInputDataIsValid, errorHandling } from './validation.js';

// ################### FORM ##############################

document.forms[0].elements.dob.max = new Date().toISOString().split('T')[0];
const submitButton = document.getElementById('submitBtn');

const form = document.forms[0].elements;

function isUserExists(userId) {
  const { employeeData } = getData();
  const rowToEdit = employeeData?.some((val) => val.userId === userId);

  return rowToEdit;
}

const currForm = document.forms[0];

currForm.onkeyup = (e) => {
  errorHandling(e.target.name);
};

currForm.onchange = (e) => {
  errorHandling(e.target.name);
};

// Get data object on submit

submitButton.addEventListener('click', () => {
  if (checkIfInputDataIsValid()) {
    const submittedData = {};

    Array.from(form).forEach((val) => {
      if (val.name === 'userId') {
        submittedData[val.name] = parseInt(val.value) || Math.floor(100000 + Math.random() * 900000);
      } else if (val.name === 'gender') {
        submittedData[val.name] = Array.from(form[val.name])
          .map((inputVal) => inputVal)
          .filter((checked) => checked.checked)
          .map((option) => option.value);
      } else if (val.name === 'hobbies') {
        submittedData[val.name] = Array.from(form[val.name])
          .map((inputVal) => inputVal)
          .filter((checked) => checked.checked)
          .map((childVal) => childVal.value);
      } else if (val.name === 'submit' || val.name === 'resetBtn') {
        return;
      } else {
        submittedData[val.name] = val.value;
      }

      // add row submitted data to localStorage
    });

    if (!isUserExists(submittedData.userId)) {
      addData(submittedData);
      addRow(submittedData);
      addRowToAdvTable(submittedData);
      currForm.reset();
      document.forms[0].submit.innerText = 'Submit';
    } else {
      editRow(submittedData);
      editData(submittedData);
      currForm.reset();
      document.forms[0].submit.innerText = 'Submit';
    }
  } else {
    errorHandling();
  }
});
