// importing all instances
import * as form from './form.js';

import {
  createAdvanceTable,
  createBasicTable,
  addRow,
  deleteRow,
  addRowToAdvTable,
  fillDataIntoForm,
  editRow,
} from './table.js';
import { errorHandling } from './validation.js';

createBasicTable();
createAdvanceTable();

// listening to the events

// addRow
// const addRowChannel = new BroadcastChannel('addRow');

// addRowChannel.onmessage = (event) => {
//   console.log('row Added');
//   addRow(event.data.submittedData);
//   addRowToAdvTable(event.data.submittedData);
//   form.resetForm();
// };

// // deleteRow

// const deleteRowChannel = new BroadcastChannel('deleteRow');

// deleteRowChannel.onmessage = (event) => {
//   console.log('Row deleted');
//   deleteRow(event.data.rowIndex, event.data.userId);
//   form.resetForm();
// };

// // fill Data into Form

// const fillRowDataIntoFormChannel = new BroadcastChannel('fillRowDataIntoForm');

// fillRowDataIntoFormChannel.onmessage = (event) => {
//   console.log('data filled');
//   fillDataIntoForm(event.data.userId);
// };

// // edit row

// const editRowChannel = new BroadcastChannel('editRow');

// editRowChannel.onmessage = (event) => {
//   console.log('row edited');
//   editRow(event.data.submittedData);
//   form.resetForm();
// };

window.addEventListener('storage', (e) => {
  const oldVal = JSON.parse(e.oldValue);
  const newVal = JSON.parse(e.newValue);

  //  new Obj that is added into localstorage (when data is added)

  if (newVal?.length > (oldVal ? oldVal?.length : 0)) {
    // row added
    const newUserObj = newVal.find((val) => {
      return !oldVal?.some((childVal) => {
        return childVal.userId === val.userId;
      });
    });

    addRow(newUserObj);
    addRowToAdvTable(newUserObj);
  } else if (oldVal?.length === newVal?.length && oldVal && newVal) {
    // row Updated
    const updatedRow = newVal?.find((val, index) => {
      return JSON.stringify(val) !== JSON.stringify(oldVal[index]);
    });
    editRow(updatedRow);
  } else if (oldVal?.length > (newVal ? newVal?.length : 0)) {
    // row deleted
    const deletedObj = oldVal?.find((val) => {
      return !newVal?.some((childVal) => {
        return childVal.userId === val.userId;
      });
    });

    const rowIndex = oldVal?.findIndex((val) => {
      return val.userId === deletedObj.userId;
    });

    const userId = deletedObj.userId;
    deleteRow(rowIndex + 1, userId);
  } else {
    console.log('LocalStorage was cleared!!');
  }
});
