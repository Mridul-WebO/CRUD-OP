
import { deleteData, getData, getSingleData } from "../storage/storage.js";



// ################### Table ####################
const basicTableContainer = document.getElementById('basicTable')

const headerArr = ['userId', 'name', 'gender', 'dob', 'email', 'phone', 'hobbies', 'Actions'];



export function createBasicTable() {


  const basicTable = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const employeeData = getData().employeeData;




  const headerTr = document.createElement('tr');

  // this.table.appendChild(thead);

  for (const headers of headerArr) {
    const th = document.createElement('th');
    th.innerText = headers
    headerTr.appendChild(th);
  }
  thead.appendChild(headerTr);
  basicTable.appendChild(thead)




  for (const rows of employeeData) {
    const tr = document.createElement('tr');

    for (const cols in headerArr) {
      const td = document.createElement('td');


      if (headerArr[cols] === 'Actions') {

        // update button
        const updateBtn = createUpdateButton(tr,rows['userId']);
        td.appendChild(updateBtn);

        // delete button
        const deleteBtn = createBasicDeleteButton(tr, rows['userId']);
        td.appendChild(deleteBtn);


      } else {
        // console.log(rows[headerArr[cols]]);


        td.innerText = rows[headerArr[cols]];

      }


      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  basicTable.appendChild(tbody)
  basicTableContainer.appendChild(basicTable)



}



export function addRow(submittedData) {

  const tbody = basicTableContainer.getElementsByTagName('tbody')[0];

  const tr = document.createElement('tr');

  for (const cols in submittedData) {

    const td = document.createElement('td');
    td.innerText = submittedData[cols];

    tr.appendChild(td);

  }

  const td = document.createElement('td');

  const updateBtn = createUpdateButton(tr);
  td.appendChild(updateBtn);

  // delete button
  const deleteBtn = createBasicDeleteButton(tr, submittedData['userId']);
  td.appendChild(deleteBtn);
  tr.appendChild(td);
  tbody.appendChild(tr);



}


function fillDataIntoForm(userId) {

  const {rowToUpdate} = getSingleData(userId);
  const formInputs = Array.from(document.forms[0].elements)
 const dataToFill = rowToUpdate[0];





  formInputs.forEach((val,index)=>{
  val.value = dataToFill[val.name]
  })

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.innerText = "Update";


}





function createUpdateButton(tr,userId) {

  // update button
  const updateBtn = document.createElement('button');
  updateBtn.innerText = "Update";

  updateBtn.addEventListener('click', () => {
    fillDataIntoForm(userId);

  })

  return updateBtn;

}


function createBasicDeleteButton(tr, userId) {


  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener('click', () => {


    const rowIndex = tr.rowIndex


    deleteRow(rowIndex, userId);




  });

  return deleteBtn;

}










// ######################## Advance Table ######################

const advTableContainer = document.getElementById('advanceTable');


export function createAdvanceTable() {

  const advTable = document.createElement('table');
  const thead = document.createElement('thead');

  const employeeData = getData().employeeData;

  // this.table.appendChild(thead);

  for (const headers in headerArr) {
    const headerTr = document.createElement('tr');
    const headerTh = document.createElement('th');

    headerTh.innerText = headerArr[headers]
    headerTr.appendChild(headerTh);

    for (const value of employeeData) {

      const childTd = document.createElement('td')
      if (headerArr[headers] === 'Actions') {



        // update button
        const updateBtn = createAdvUpdateButton(value['userId']);
        childTd.appendChild(updateBtn);

        // delete button
        const deleteBtn = createAdvDeleteButton(value['userId']);
        childTd.appendChild(deleteBtn);


      } else {

        childTd.innerText = value[headerArr[headers]];

      }
      headerTr.appendChild(childTd);

    }
    thead.appendChild(headerTr);

  }


  advTable.appendChild(thead)
  advTableContainer.appendChild(advTable)
  // console.log(advTableContainer);



}


export function addRowToAdvTable(employeeData) {
  const thead = advTableContainer.getElementsByTagName('table')[0].getElementsByTagName('thead')[0];
  const trs = Array.from(thead.getElementsByTagName('tr'))





  trs.forEach((val, index) => {

    const childTd = document.createElement('td')
    childTd.innerText = employeeData[headerArr[index]];
    val.appendChild(childTd)


  })


}

export function updateRowFromAdvTable() {

}




function createAdvUpdateButton(userId) {

  // update button
  const updateBtn = document.createElement('button');
  updateBtn.innerText = "Update";

  updateBtn.addEventListener('click', () => {
    // updateRow();
    fillDataIntoForm(userId)


  })

  return updateBtn;


}



function createAdvDeleteButton(userId) {


  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener('click', () => {


    const rowIndex = deleteBtn.parentNode.cellIndex

    deleteRow(rowIndex, userId);


  });

  return deleteBtn;

}


export function deleteRow(rowIndex, userId) {

  // delete row from horizontal table

  console.log(rowIndex);
  const tbody = basicTableContainer.getElementsByTagName('tbody')[0];
  tbody.deleteRow(rowIndex - 1)



  //  delete row from vertical table

  const rows = Array.from(advTableContainer.getElementsByTagName('tr'));
  rows.forEach((val) => {


    deleteData(userId)

    val.deleteCell(rowIndex)
  }
  )



}




export function editRow(submittedData){


  //basic table

  const tbody = basicTableContainer.getElementsByTagName('tbody')[0]
const basicTrs = Array.from(tbody.getElementsByTagName('tr'));

 const tr = basicTrs.find((val)=> val.firstChild.innerText == submittedData.userId);

 const tds = Array.from(tr.getElementsByTagName('td'));

 for(const arr in headerArr){
  if(headerArr[arr] === 'Actions'){

  }else{

    tds[arr].innerText = submittedData[headerArr[arr]]
  }


 }

  //adv table

  const advTrs = Array.from(advTableContainer.getElementsByTagName('tr')[0].getElementsByTagName('td'));
  // console.log(advTrs);

  const td = advTrs.find((val)=>{

    return val.innerText == submittedData.userId
  })
  console.log(td.cellIndex);


  const rows = Array.from(advTableContainer.getElementsByTagName('tr'));
  const advTdsToUpdates = rows.map((val)=>{

    return Array.from(val.getElementsByTagName('td'))


  }).map((val)=>{

     const tdsOfVerticalRow = val.find((childVal)=>{
      return childVal.cellIndex == td.cellIndex

    })

    return tdsOfVerticalRow;

  })

  for(const x in advTdsToUpdates){


    if(headerArr[x]=== 'Actions'){

    }else{
    advTdsToUpdates[x].innerText = submittedData[headerArr[x]];

  }


  }



}
