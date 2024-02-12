
import { getData } from "../storage/storage.js";



// ################### Table ####################
const basicTableContainer = document.getElementById('basicTable')

const headerArr = ['User ID','Name','Gender','Date Of Birth', 'Email','Phone', 'Hobbies','Actions'] ;



export function createTable(){


    const employeeData = getData().employeeData;
    console.log(employeeData);
    const basicTable = document.createElement('table');
    const thead = document.createElement('thead');
    const headerTr = document.createElement('tr');

    // this.table.appendChild(thead);

    for (const headers of headerArr) {
      const th = document.createElement('th');
      console.log(headers);
      // if (this.formData[columnNumbers].type !== 'submit' && this.formData[columnNumbers].type !== 'reset') {
        th.innerText = headers
        headerTr.appendChild(th);
      // } else if (this.formData[columnNumbers].type === 'submit') {
      //   th.innerText = 'Actions';
      //   this.tr.appendChild(th);
      // }
    }
   thead.appendChild(headerTr);
   basicTable.appendChild(thead)
    // this.table.appendChild(this.tbody);
    basicTableContainer.appendChild(basicTable)


    // this.container.appendChild(this.table);

    // for (let row = 0; row < employeeData.length; row++) {
    //   const bodyTrs = document.createElement('tr');
    //   for (const col in employeeData[row]) {
    //     const td = document.createElement('td');

    //     td.setAttribute('class', 'table-primary');
    //     td.innerText = employeeData[row][col] === '' ? '-' : employeeData[row][col];
    //     bodyTrs.appendChild(td);
    //   }

    //   // update button

    //   const td = document.createElement('td');
    //   const updateBtn = this.updateButton(bodyTrs);
    //   td.appendChild(updateBtn);

    //   // delete button
    //   const deleteBtn = this.deleteButton(bodyTrs);
    //   td.appendChild(deleteBtn);

    //   bodyTrs.appendChild(td);

    //   // appending the row into tbody of the table
    //   this.tbody.appendChild(bodyTrs);
    // }






}



function addRow(){


}


function deleteRow(){


}
