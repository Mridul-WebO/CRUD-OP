
import { deleteData, getData } from "../storage/storage.js";



// ################### Table ####################
const basicTableContainer = document.getElementById('basicTable')

const headerArr = ['userId','name','gender','dob', 'email','phone', 'hobbies','Actions'] ;



export function createBasicTable(){


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




   for(const rows of employeeData){
     const tr = document.createElement('tr');

     for(const cols in headerArr){
       const td = document.createElement('td');


       if(headerArr[cols] === 'Actions'){

            // update button
      const updateBtn = createUpdateButton();
      td.appendChild(updateBtn);

      // delete button
      const deleteBtn = createDeleteButton(tr);
      td.appendChild(deleteBtn);


       }else{
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



export function addRow(submittedData){

  const tbody = basicTableContainer.getElementsByTagName('tbody')[0];

  const tr = document.createElement('tr');

  for(const cols in submittedData){
    const td =document.createElement('td');
    td.innerText = submittedData[cols];

    tr.appendChild(td);

  }

  const td = document.createElement('td');

              const updateBtn = createUpdateButton();
              td.appendChild(updateBtn);

              // delete button
              const deleteBtn = createDeleteButton(tr);
              td.appendChild(deleteBtn);
              tr.appendChild(td);
              tbody.appendChild(tr);



}


function updateRow(){


}


function deleteRow(tr){
  const tbody = basicTableContainer.getElementsByTagName('tbody')[0];
  tbody.removeChild(tr);


}



function createDeleteButton(tr){

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener('click',()=>{
    deleteRow(tr);
    deleteData(parseInt(tr.getElementsByTagName('td')[0].innerText))
  });

  return deleteBtn;

}

function createUpdateButton(){

     // update button
     const updateBtn = document.createElement('button');
     updateBtn.innerText = "Update";

     updateBtn.addEventListener('click',()=>{
       updateRow();

     })

     return updateBtn;

}





// ######################## Advance Table ######################

const advTableContainer = document.getElementById('advanceTable');


export function createAdvanceTable(){

  const advTable = document.createElement('table');
  const thead = document.createElement('thead');

    const employeeData = getData().employeeData;

    // this.table.appendChild(thead);

    for (const headers in headerArr) {
      const headerTr = document.createElement('tr');
      const headerTh = document.createElement('th');

      headerTh.innerText = headerArr[headers]
      headerTr.appendChild(headerTh);

      for(const vals of employeeData){
        const childTd = document.createElement('td')
        if(headerArr[headers] === 'Actions'){

          // update button
    const updateBtn = createUpdateButton();
    childTd.appendChild(updateBtn);

    // delete button
    const deleteBtn = createDeleteButton(headerTr);
    childTd.appendChild(deleteBtn);


     }else{

       childTd.innerText = vals[headerArr[headers]];

     }
        headerTr.appendChild(childTd);

      }
      thead.appendChild(headerTr);

    }



   advTableContainer.appendChild(thead)


}


export function addRowToAdvTable(){

}

export function updateRowToAdvTable(){

}


export function deleteRowToAdvTable(){

}










