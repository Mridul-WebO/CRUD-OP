
import { getSingleData, addData } from "../storage/storage.js";
import { addRow } from "./table.js";

// ################### FORM ##############################
const submitButton = document.getElementById('submitBtn');


const form = document.forms[0].elements;


function isUserExists(){
  const {status,employeeData} = getSingleData();


  const rowToEdit = employeeData?.some((val) => val.userId === submitData.userId);

  console.log(rowToEdit);

  // return {status, rowToEdit};

}



// Get data object on submit

submitButton.addEventListener('click',()=>{
  const submittedData = {};





Array.from(form).forEach((val)=>{


  if(val.name === 'userId')
  {
    submittedData[val.name] = Math.floor(100000 + Math.random() * 900000);

  }else if(val.name === 'gender'){

    submittedData[val.name] = Array.from(form[val.name])
    .map((inputVal) => inputVal)
    .filter((checked) => checked.checked)
    .map((option) => option.value);

  }else if(val.name === 'hobbies'){
    submittedData[val.name] = Array.from(form[val.name])
    .map((inputVal) => inputVal)
    .filter((checked) => checked.checked)
    .map(val=>val.value)

  }else if(val.name === 'submit' || val.name === 'reset'){

  }else{
    console.log(val.name);
    submittedData[val.name] = val.value;

  }

  // add row submitted data to localStorage

})




addData(submittedData);
addRow(submittedData);




})

