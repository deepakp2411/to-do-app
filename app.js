// selecting all elements which are required 

const inputBox = document.querySelector('.inputfield input');
const addBtn = document.querySelector('.inputfield button');
const todoList = document.querySelector('.todolist');
const deleteAll = document.querySelector('.footer button');

inputBox.onkeyup = ()=>{
    let userData = inputBox.value; // getting user data
    if(userData.trim()!=0){         //  if user values are not spaces
        addBtn.classList.add('active')   // active the button 
    }else{
        addBtn.classList.remove('active')   // unactive the button 


    }
}

addBtn.onclick = ()=>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo"); // getting new local storage
    if(getLocalStorage == null){      // if local storage is nul
        listAr = [];         // creating blank array
    }else{
        listAr = JSON.parse(getLocalStorage);   // transforming json string into a js object
    }
    listAr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listAr));   // transforming js object into a json 
    
    showTask(); // calling function //
}

// function to add task 
  


function showTask(){
    let getLocalStorage = localStorage.getItem("New Todo"); 
    if(getLocalStorage == null){      // if local storage is nul
        listAr = [];         // creating blank array
    }else{
        listAr = JSON.parse(getLocalStorage);   // transforming json string into a js object
    }
    const pendingTask = document.querySelector('.pending');
    pendingTask.textContent = listAr.length;  // passsing the lenght value ;
    if(listAr.length > 0){
        deleteAll.classList.add('active');
    }else{
        deleteAll.classList.remove('active');
    }

    let newLiTag = '';
    listAr.forEach((element,index)=>{
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class="bi bi-trash-fill"></i></span></li>`
    });
    todoList.innerHTML = newLiTag ///

    inputBox.value = ""; // once the tast is added leave the input field empty
}

// to delete the task 
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo"); // getting new local storage
    listAr = JSON.parse(getLocalStorage);   // transforming json string into a js object

    listAr.splice(index, 1); // delete the task
    localStorage.setItem("New Todo", JSON.stringify(listAr));   // transforming js object into a json 
    showTask();


}

// clear all tasks //

deleteAll.addEventListener('click',()=>{
    listAr = [];

    localStorage.setItem("New Todo",JSON.stringify(listAr));  //transfering js object into a js string
    showTask();
})
