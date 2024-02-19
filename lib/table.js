import { deleteData, getData, getSingleData } from '../storage/storage.js';

// ################### Table ####################
const basicTableContainer = document.getElementById('basicTable');

const headerArrToCompare = ['userId', 'name', 'gender', 'dob', 'email', 'phone', 'hobbies', 'Actions'];
const headerArrToDisplay = ['User ID', 'Name', 'Gender', 'Date Of Birth', 'Email', 'Phone', 'Hobbies', 'Actions'];

export function createBasicTable() {
  const basicTable = document.createElement('table');
  basicTable.setAttribute('id', 'basic');

  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const { employeeData } = getData();

  const headerTr = document.createElement('tr');

  for (const headers of headerArrToDisplay) {
    const th = document.createElement('th');
    th.innerText = headers;
    headerTr.appendChild(th);
  }
  thead.appendChild(headerTr);
  basicTable.appendChild(thead);

  for (const rows of employeeData) {
    const tr = document.createElement('tr');

    for (const cols in headerArrToCompare) {
      const td = document.createElement('td');

      if (headerArrToCompare[cols] === 'Actions') {
        // update button
        const updateBtn = createUpdateButton(tr, rows['userId']);
        td.appendChild(updateBtn);

        // delete button
        const deleteBtn = createBasicDeleteButton(tr, rows['userId']);
        td.appendChild(deleteBtn);
      } else {
        td.innerText = rows[headerArrToCompare[cols]].length === 0 ? '-' : rows[headerArrToCompare[cols]];
      }

      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  basicTable.appendChild(tbody);
  basicTableContainer.appendChild(basicTable);
}

export function addRow(submittedData) {
  const tbody = basicTableContainer.getElementsByTagName('tbody')[0];
  const tr = document.createElement('tr');

  for (const cols in submittedData) {
    const td = document.createElement('td');

    td.innerText = submittedData[cols].length === 0 ? '-' : submittedData[cols];

    tr.appendChild(td);
  }

  const td = document.createElement('td');

  const updateBtn = createUpdateButton(submittedData['userId']);
  td.appendChild(updateBtn);

  // delete button
  const deleteBtn = createBasicDeleteButton(tr, submittedData['userId']);
  td.appendChild(deleteBtn);
  tr.appendChild(td);
  tbody.appendChild(tr);
}

function fillDataIntoForm(userId) {
  const { rowToUpdate } = getSingleData(userId);
  const formInputs = Array.from(document.forms[0].elements);
  const dataToFill = rowToUpdate[0];

  formInputs.forEach((val) => {
    if (val.name === 'hobbies') {
      dataToFill[val.name].forEach((childVal) => {
        if (childVal === val.id) {
          val.checked = true;
        }
      });
    } else if (val.name === 'gender') {
      if (dataToFill[val.name][0] === val.value) {
        val.checked = true;
      }
    } else {
      val.value = dataToFill[val.name];
    }
  });

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.innerText = 'Update';
}

function createUpdateButton(userId) {
  // update button
  const updateBtn = document.createElement('button');
  updateBtn.innerText = 'Update';

  updateBtn.addEventListener('click', () => {
    document.forms[0].reset();
    fillDataIntoForm(userId);
    document.getElementById('heading').innerText = 'Update employee';
  });

  return updateBtn;
}

function createBasicDeleteButton(tr, userId) {
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';

  deleteBtn.addEventListener('click', () => {
    const rowIndex = tr.rowIndex;

    deleteRow(rowIndex, userId);
  });

  return deleteBtn;
}

// ######################## Advance Table ######################

const advTableContainer = document.getElementById('advanceTable');

export function createAdvanceTable() {
  const advTable = document.createElement('table');
  const thead = document.createElement('thead');

  const { employeeData } = getData();

  for (const headers in headerArrToCompare) {
    const headerTr = document.createElement('tr');
    const headerTh = document.createElement('th');

    headerTh.innerText = headerArrToDisplay[headers];
    headerTr.appendChild(headerTh);

    for (const value of employeeData) {
      const td = document.createElement('td');
      if (headerArrToCompare[headers] === 'Actions') {
        // update button
        const updateBtn = createAdvUpdateButton(value['userId']);
        td.appendChild(updateBtn);

        // delete button
        const deleteBtn = createAdvDeleteButton(value['userId']);
        td.appendChild(deleteBtn);
      } else {
        td.innerText = value[headerArrToCompare[headers]].length === 0 ? '-' : value[headerArrToCompare[headers]];
      }
      headerTr.appendChild(td);
    }
    thead.appendChild(headerTr);
  }

  advTable.appendChild(thead);
  advTableContainer.appendChild(advTable);
}

export function addRowToAdvTable(employeeData) {
  const thead = advTableContainer.getElementsByTagName('table')[0].getElementsByTagName('thead')[0];
  const trs = Array.from(thead.getElementsByTagName('tr'));

  trs.forEach((tr, index) => {
    const td = document.createElement('td');

    if (headerArrToCompare[index] === 'Actions') {
      // update button
      const updateBtn = createAdvUpdateButton(employeeData['userId']);
      td.appendChild(updateBtn);

      // delete button
      const deleteBtn = createAdvDeleteButton(employeeData['userId']);
      td.appendChild(deleteBtn);
    } else {
      td.innerText =
        employeeData[headerArrToCompare[index]].length === 0 ? '-' : employeeData[headerArrToCompare[index]];
    }
    tr.appendChild(td);
  });
}

function createAdvUpdateButton(userId) {
  // update button
  const updateBtn = document.createElement('button');
  updateBtn.innerText = 'Update';

  updateBtn.addEventListener('click', () => {
    document.forms[0].reset();
    fillDataIntoForm(userId);
    document.getElementById('heading').innerText = 'Update employee';
  });

  return updateBtn;
}

function createAdvDeleteButton(userId) {
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';

  deleteBtn.addEventListener('click', () => {
    const rowIndex = deleteBtn.parentNode.cellIndex;

    deleteRow(rowIndex, userId);
  });

  return deleteBtn;
}

export function deleteRow(rowIndex, userId) {
  // delete row from horizontal table
  const tbody = basicTableContainer.getElementsByTagName('tbody')[0];
  tbody.deleteRow(rowIndex - 1);

  //  delete row from vertical table
  const rows = Array.from(advTableContainer.getElementsByTagName('tr'));

  rows.forEach((row) => {
    deleteData(userId);
    row.deleteCell(rowIndex);
  });
}

export function editRow(submittedData) {
  //basic table

  const tbody = basicTableContainer.getElementsByTagName('tbody')[0];
  const basicTrs = Array.from(tbody.getElementsByTagName('tr'));

  const tr = basicTrs.find((val) => val.firstChild.innerText == submittedData.userId);

  const tds = Array.from(tr.getElementsByTagName('td'));

  for (const arr in headerArrToCompare) {
    if (headerArrToCompare[arr] === 'Actions') {
      continue;
    } else {
      tds[arr].innerText = submittedData[headerArrToCompare[arr]];
    }
  }

  //adv table

  const advTrs = Array.from(advTableContainer.getElementsByTagName('tr')[0].getElementsByTagName('td'));

  const td = advTrs.find((val) => {
    return val.innerText == submittedData.userId;
  });

  const rows = Array.from(advTableContainer.getElementsByTagName('tr'));
  const advTdsToUpdates = rows
    .map((val) => {
      return Array.from(val.getElementsByTagName('td'));
    })
    .map((val) => {
      const tdsOfVerticalRow = val.find((childVal) => {
        return childVal.cellIndex == td.cellIndex;
      });

      return tdsOfVerticalRow;
    });

  for (const x in advTdsToUpdates) {
    if (headerArrToCompare[x] === 'Actions') {
      continue;
    } else {
      advTdsToUpdates[x].innerText = submittedData[headerArrToCompare[x]];
    }
  }
}
