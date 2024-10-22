//List Of Tasks
export let taskList;
taskList=JSON.parse(localStorage.getItem('taskList')) || [];


export function updateTaskList(){
    localStorage.setItem('taskList',JSON.stringify(taskList))
}


//Array Stores Mode
export let modeStatus=JSON.parse(localStorage.getItem('modeStatus')) || ['All'];

export function updateModeStatus(){
    localStorage.setItem('modeStatus',JSON.stringify(modeStatus))
}


//Array Store Theme
export let themeStatus=JSON.parse(localStorage.getItem('themeStatus')) || ['Light'];

export function updateThemeStatus(){
    localStorage.setItem('themeStatus',JSON.stringify(themeStatus))
}

