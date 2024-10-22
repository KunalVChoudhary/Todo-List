import {modeStatus, taskList, themeStatus, updateModeStatus, updateTaskList, updateThemeStatus} from "../list/task-list.js";

//Main Display
function renderDisplay(){



//displayListAll()
function displayListAll(){
    let listBox=document.querySelector('.js-display-list');
    let innerHTML=``
    taskList.slice().reverse().forEach((taskObject,taskReversedIndex) => {
        let task_index=taskList.length-1-taskReversedIndex;
        let stage=''; 
        let textDecorationLineThrough='';

        if (taskObject.stage =="true"){
            stage='checkbox-true';
            textDecorationLineThrough='text-decoration-line-through task-detail-completed';
        }
        let taskObjectHTML=
        `
        <div class="list-task-container mt-1" data-task-index='${task_index}'>
            <div class="checkbox-task">
              <button class="check-box  ${stage}" data-stage-value='${taskObject.stage}' data-task-index="${task_index}"></button>
            </div>
            <div class="task-detail ${textDecorationLineThrough}" data-task-index="${task_index}">${taskObject.task}</div>
            <div class="delete-task">
              <img src="images/icon-cross.svg" class='deleteTask' data-task-index="${task_index}" alt="X">
            </div>
          </div>
        `;
        innerHTML+=taskObjectHTML;
    });
    listBox.innerHTML=innerHTML;

}



//displayListAActive()
function displayListActive(){
    let listBox=document.querySelector('.js-display-list');
    let innerHTML=``
    taskList.slice().reverse().forEach((taskObject,taskReversedIndex) => {
        if (taskObject.stage =="false"){
            let task_index=taskList.length-1-taskReversedIndex;
                        
            let taskObjectHTML=
            `
            <div class="list-task-container mt-1" data-task-index='${task_index}'>
                <div class="checkbox-task">
                <button class="check-box " data-stage-value='${taskObject.stage}' data-task-index="${task_index}"></button>
                </div>
                <div class="task-detail " data-task-index="${task_index}">${taskObject.task}</div>
                <div class="delete-task">
                <img src="images/icon-cross.svg" class='deleteTask' data-task-index="${task_index}" alt="X">
                </div>
            </div>
            `;
            innerHTML+=taskObjectHTML;
        }
    });
    listBox.innerHTML=innerHTML;

}



//displayListCompleted
function displayListCompleted(){
    let listBox=document.querySelector('.js-display-list');
    let innerHTML=``
    taskList.slice().reverse().forEach((taskObject,taskReversedIndex) => {
        if (taskObject.stage =="true"){
            let task_index=taskList.length-1-taskReversedIndex;
            let stage='checkbox-true';
            let textDecorationLineThrough='text-decoration-line-through task-detail-completed';
                        
            let taskObjectHTML=
            `
            <div class="list-task-container mt-1" data-task-index='${task_index}'>
                <div class="checkbox-task">
                <button class="check-box  ${stage}" data-stage-value='${taskObject.stage}' data-task-index="${task_index}"></button>
                </div>
                <div class="task-detail ${textDecorationLineThrough}" data-task-index="${task_index}">${taskObject.task}</div>
                <div class="delete-task">
                <img src="images/icon-cross.svg" class='deleteTask' data-task-index="${task_index}" alt="X">
                </div>
            </div>
            `;
            innerHTML+=taskObjectHTML;
        }
    });
    listBox.innerHTML=innerHTML;
}



//checks for modestatus
if (modeStatus[0]=='All'){
    displayListAll();
    document.querySelector('.all-mode').classList.add('current-mode-style');
}
else if (modeStatus[0]=='Active'){
    displayListActive();
    document.querySelector('.active-mode').classList.add('current-mode-style');
}
else{
    displayListCompleted();
    document.querySelector('.completed-mode').classList.add('current-mode-style');
}



//delete item from task list
function deleteItemFromList(task_index){
    taskList.splice(task_index, 1);
    updateTaskList();
    renderDisplay();
}


let deleteBtn=document.querySelectorAll('.deleteTask');
deleteBtn.forEach((Btn) => {
    Btn.addEventListener('click',()=>{
        deleteItemFromList(Btn.dataset.taskIndex);
    })
});


//add item to task list
function addItemToList(task,stage){
    taskList.push({'task':task,'stage':stage})
    updateTaskList()
    renderDisplay()
}


let inputElement=document.querySelector('.js-input-task');
inputElement.addEventListener('keydown',(Event)=>{
    if (Event.key === 'Enter' || Event.keyCode === 13){
        if (inputElement.value){
            let stage=document.getElementById('input-check-box').dataset.stageValue;
            addItemToList(inputElement.value, stage);
            inputElement.value='';
            inputElement.blur();
        }
        let checkBoxInput=document.getElementById('input-check-box')
        if (checkBoxInput.classList.contains('checkbox-true')){
            checkBoxInput.classList.remove('checkbox-true');
            checkBoxInput.dataset.stageValue='false'
            renderDisplay()
        }

    }
})

let eraseInput=document.querySelector('.eraseInput');
eraseInput.addEventListener('click',()=>{
    inputElement.value=''
})


//check-box and line through text
document.querySelectorAll('.check-box')
.forEach((checkBox)=>{
    checkBox.addEventListener('click',()=>{
        if (checkBox.dataset.stageValue=='false'){
            checkBox.dataset.stageValue='true';
            checkBox.classList.add('checkbox-true');
            if (checkBox.dataset.taskIndex != 'null'){
                taskList[Number(checkBox.dataset.taskIndex)]['stage']='true';
                updateTaskList()
                renderDisplay()
            }
        }
        else{
            checkBox.dataset.stageValue='false'
            checkBox.classList.remove('checkbox-true')
            if (checkBox.dataset.taskIndex != 'null'){
                taskList[Number(checkBox.dataset.taskIndex)]['stage']='false';
                updateTaskList()
                renderDisplay()
            }
        }
    })
})


//itmes left
function itemLeft(){
    let itemLeftCount=0;
    taskList.forEach((taskObject)=>{
        if (taskObject.stage=='false'){
            itemLeftCount+=1;
        }
    })
    document.querySelector('.items-left').innerHTML=`${itemLeftCount} items left`;
}

itemLeft();


//all-active-completed mode
document.querySelector('.all-mode').addEventListener('click',()=>{
    modeStatus[0]='All';
    updateModeStatus();
    renderDisplay();
})

document.querySelector('.active-mode').addEventListener('click',()=>{
    modeStatus[0]='Active';
    updateModeStatus();
    renderDisplay();
})

document.querySelector('.completed-mode').addEventListener('click',()=>{
    modeStatus[0]='Completed';
    updateModeStatus();
    renderDisplay();
})

document.querySelector('.remove-completed-task').addEventListener('click',()=>{
    taskList.forEach((taskObject,task_index)=>{
        if (taskObject.stage=='true'){
            taskList.splice(task_index,1)
        }
    })
    updateTaskList()
    renderDisplay()
})


//display theme toglle Light-Dark
let themeToggler=document.getElementById('theme-icon');
themeToggler.addEventListener('click',()=>{
    if (themeToggler.src.endsWith("images/icon-sun.svg")){
        themeToggler.src="images/icon-moon.svg";
        themeStatus[0]='Light';
        updateThemeStatus();
    }
    else{
        themeToggler.src="images/icon-sun.svg";
        themeStatus[0]='Dark';
        updateThemeStatus();
    }
    themeDisplay();
})

function themeDisplay(){
    if (themeStatus[0]=='Light'){
        //Light Mode
        themeToggler.src="images/icon-moon.svg";
        document.querySelector('.background1').style='background-image: url(../images/bg-desktop-light.jpg);';
        document.querySelector('.background2').style='background-color: hsl(236, 33%, 92%);';
        document.querySelector('.input-task-container').style='background-color: hsl(0, 0%, 98%)';
        document.querySelectorAll('.list-task-container')
        .forEach((listItem)=>{
            listItem.classList.add('list-task-container-light');
            if (listItem.classList.contains('list-task-container-dark')){
                listItem.classList.remove('list-task-container-dark')
            }
        });
        document.querySelector('.input-task').classList.add('placeholder-light');
        if (document.querySelector('.input-task').classList.contains('placeholder-dark')){
            document.querySelector('.input-task').classList.remove('placeholder-dark')
        }
        document.querySelector('.input-task').style='color: hsl(235, 19%, 35%);';
        //document.querySelector('.task-detail').style='color: hsl(235, 19%, 35%);';

    }
    else{
        //Dark Mode
        themeToggler.src="images/icon-sun.svg";
        document.querySelector('.background1').style='background-image: url(../images/bg-desktop-dark.jpg);';
        document.querySelector('.background2').style='background-color: hsl(235, 21%, 11%);';
        document.querySelector('.input-task-container').style='background-color: hsl(235, 24%, 19%);';
        document.querySelectorAll('.list-task-container')
        .forEach((listItem)=>{
            listItem.classList.add('list-task-container-dark');
            if (listItem.classList.contains('list-task-container-light')){
                listItem.classList.remove('list-task-container-light')
            }
        })
        document.querySelector('.input-task').classList.add('placeholder-dark')
        if (document.querySelector('.input-task').classList.contains('placeholder-light')){
            document.querySelector('.input-task').classList.remove('placeholder-light')
        }
        document.querySelector('.input-task').style='color: hsl(236, 33%, 92%);';
    }
}
 
themeDisplay()


//Drag And Drop Items 

let dragStatus=['Off'];
document.querySelector('.drag-and-drop>p').innerHTML='Drag And Drop';

document.querySelector('.drag-and-drop>p')
.addEventListener('click',()=>{
    if (dragStatus[0]=='Off'){
        initiateDrag();
    }
    else{
        dragStatus[0]='Off'
        location.reload(false);
    }
})

function initiateDrag(){
    if (modeStatus[0]=='All'){
        dragStatus[0]='On';
        document.querySelector('.drag-and-drop>p').innerHTML='Drag And Drop On';
        let dragged;
        let afterElement;
        document.querySelectorAll('.list-task-container')
        .forEach(element=>{
            element.draggable="true";
            element.addEventListener('dragstart',(Event)=>{
                dragged=Event.target;
                dragged.classList.add('dragging')
            })
            element.addEventListener('dragend',(Event)=>{
                dragged=Event.target;
                dragged.classList.remove('dragging')
                if (afterElement==null){
                    newListAfterDrag(Number(dragged.dataset.taskIndex),0);
                    location.reload(false);
                }
                else{
                    newListAfterDrag(Number(dragged.dataset.taskIndex),Number(afterElement.dataset.taskIndex)+1)
                    location.reload(false);
                }
            })
        })
        let list=document.querySelector('.js-display-list');
        list.addEventListener('dragover',(Event)=>{
            Event.preventDefault();
            afterElement= getDragAfterElement(list,Event.clientY);
            if (afterElement==null){
                list.appendChild(dragged);
            }
            else{
                list.insertBefore(dragged,afterElement);
            }
        })
    }
    else{
        alert('Switch to "All Mode" to use this feature')
    }
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.list-task-container:not(.dragging)')]
  
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}


function newListAfterDrag(dragIndex,dragNewIndex){
    let draggedTask=taskList[dragIndex];
    taskList.splice(dragIndex,1);
    taskList.splice(dragNewIndex,0,draggedTask);
    updateTaskList();
}


}


renderDisplay()