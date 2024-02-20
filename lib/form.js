import { addData, getData, editData } from '../storage/storage.js';
import { addRow, addRowToAdvTable, editRow } from './table.js';
// import { addRow, addRowToAdvTable, editRow } from './table.js';
import { checkIfInputDataIsValid, errorHandling } from './validation.js';

// ################### FORM ##############################

document.forms[0].elements.dob.max = new Date().toISOString().split('T')[0];

const submitButton = document.getElementById('submitBtn');
const currentForm = document.forms[0];
const formElements = currentForm.elements;

function isUserExists(userId) {
  const { employeeData } = getData();
  const rowToEdit = employeeData?.some((val) => val.userId === userId);

  return rowToEdit;
}

currentForm.onkeyup = (e) => {
  errorHandling(e.target.name);
};

currentForm.onchange = (e) => {
  errorHandling(e.target.name);
};

submitButton.addEventListener('click', () => {
  if (checkIfInputDataIsValid()) {
    const submittedData = {};

    Array.from(formElements).forEach((val) => {
      if (val.name === 'userId') {
        submittedData[val.name] = parseInt(val.value) || Math.floor(100000 + Math.random() * 900000);
      } else if (val.name === 'hobbies' || val.name === 'gender') {
        submittedData[val.name] = Array.from(formElements[val.name])
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

    if (isUserExists(submittedData.userId)) {
      // const editRowChannel = new BroadcastChannel('editRow');
      // editRowChannel.postMessage({ submittedData: submittedData });
      editRow(submittedData);
      editData(submittedData);
      resetForm();
    } else {
      // const addRowChannel = new BroadcastChannel('addRow');
      // addRowChannel.postMessage({ submittedData: submittedData });
      addData(submittedData);
      addRow(submittedData);
      addRowToAdvTable(submittedData);
      resetForm();
    }
  } else {
    errorHandling();
  }
});

export function resetForm() {
  currentForm.reset();
  currentForm.submit.innerText = 'Submit';
}
