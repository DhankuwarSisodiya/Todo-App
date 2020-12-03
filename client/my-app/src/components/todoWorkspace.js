import React,{ useEffect }  from 'react';
import '../dist/main.css';

function TodoWorkspace(){
    let todoList = [];
  let today = new Date;
  let listContainer = document.getElementById('listContainer');
  const taskDetailsForm = document.getElementById('taskDetailsForm');
  const addNewtaskForm = document.getElementById('addNewtaskForm');
  const todayString = () => {
    let todaysDay = "";
    const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
    "Saturday"];
    let today = new Date();
    todaysDay = weekDay[today.getDay()] + ", " + months[today.getMonth()] + " " + today.getDate();
    return todaysDay
  };

  /** 
 * Toggle add new task and view task details 
 */
  const addTaskClick = () => {
    const taskDetailsForm = document.getElementById('taskDetailsForm');
  const addNewtaskForm = document.getElementById('addNewtaskForm');
    if(taskDetailsForm && addNewtaskForm){
      taskDetailsForm.setAttribute("style", "display:none");
      addNewtaskForm.setAttribute("style", "display:block");
    }
  }

  /**
 * Set Css -
 * 1. red for list if tasks is already due
 * 2. line-through for tasks that have been completed
 * 3. set completeion checkbox blue if tasks completed, white otherwise
 * @param {*} todo : Object of the task from list
 * @param {*} completeBtn : Completeion checkbox of the task from the list
 * @param {*} p : p element that displays title of the task from the list
 */
  const setClassesForDueTasksAndCompletedTasks = (todo, completeBtn, p)=> {
    if (todo.completed) {
        completeBtn.classList.add("taskCompletedBtn");
        p.classList.add("taskCompletedTitle");
    } else {
        completeBtn.classList.remove("taskCompletedBtn");
        p.classList.remove("taskCompletedTitle");
        let newDateCheck = new Date(todo.dueDate);
        newDateCheck.setHours(todo.time.split(":")[0]);
        newDateCheck.setMinutes(todo.time.split(":")[1]);
        if (newDateCheck.getTime() < today.getTime()) {
            p.classList.add("dueDate");
        }
    }
}

/**
 * Populate to-do lists from json file
 * @param {*} contents : Array parsed from .json
 */
  const populate = (contents) => {
    const listContainer = document.getElementById('listContainer');
  const taskDetailsForm = document.getElementById('taskDetailsForm');
    contents.forEach(todo => {
        const listitem = document.createElement('li');
        listitem.classList.add("todoList");

        let btn = document.createElement("span");
        let completeBtn = document.createElement("button");
        completeBtn.setAttribute("id", "checkList");
        completeBtn.classList.add("circleBtn");
        btn.appendChild(completeBtn);

        let p = document.createElement('p');
        p.innerHTML = todo.title;
        p.classList.add("listClass");

        listitem.appendChild(btn);
        listitem.appendChild(p);
        listContainer.appendChild(listitem);

        setClassesForDueTasksAndCompletedTasks(todo, completeBtn, p);
        eventForListItem(listitem, todo);
        toggleCompletionCheckBoxEvent(completeBtn, todo, p);
    })
}

/**
 * Event Listener for task completion checkbox
 * @param {*} completeBtn : HTML element of checkbox
 * @param {*} todo : object that has value of the list
 * @param {*} p : p element that displays title of the task from the list
 */
const toggleCompletionCheckBoxEvent = (completeBtn, todo, p) => {
  completeBtn.addEventListener("click", function () {
      if (!todo.completed) {
          todo.completed = true;
          completeBtn.classList.add("taskCompletedBtn");
          p.classList.add("taskCompletedTitle");
          p.classList.remove("dueDate");
          let url = "/todo/"+todo._id;
          fetch(url, {
            method: 'put',
            headers : { 
              'Content-Type': 'application/json',
             },
             body:JSON.stringify({
              title: todo.title,
              description: todo.description,
              dueDate: todo.dueDate,
              time: todo.time,
              completed: true
          })
      
          }).then(res=>res.json())
        .then(data=> {
            if(data.error) {
              console.log(data.error)
            }else {
              console.log(data);
            }
        }).catch(err => {
            console.log(err)
        })
      } else {
          todo.completed = false;
          let url = "/todo/"+todo._id;
          fetch(url, {
            method: 'put',
            headers : { 
              'Content-Type': 'application/json',
             },
             body:JSON.stringify({
              title: todo.title,
              description: todo.description,
              dueDate: todo.dueDate,
              time: todo.time,
              completed: false
          })
      
          }).then(res=>res.json())
        .then(data=> {
            if(data.error) {
              console.log(data.error)
            }else {
              console.log(data);
            }
        }).catch(err => {
            console.log(err)
        })
          completeBtn.classList.remove("taskCompletedBtn");
          p.classList.remove("taskCompletedTitle");
          let newDateCheck = new Date(todo.dueDate);
          newDateCheck.setHours(todo.time.split(":")[0]);
          newDateCheck.setMinutes(todo.time.split(":")[1]);
          if (newDateCheck.getTime() < today.getTime()) {
              p.classList.add("dueDate");
          }
      }
  })
}

/**
 * Event listener for list items
 * @param {*} listitem : HTML element containg list
 * @param {*} todo : object that has value of the list
 */
const eventForListItem = (listitem, todo) => {
  const taskDetailsForm = document.getElementById('taskDetailsForm');
  const addNewtaskForm = document.getElementById('addNewtaskForm');
  listitem.addEventListener("click", function () {
      addNewtaskForm.setAttribute("style", "display:none");
      taskDetailsForm.setAttribute("style", "display:block");
      const title = document.getElementById('taskTitle');
      const description = document.getElementById('taskDescription');
      const dueDate = document.getElementById('dueDate');
      let newDate = new Date(todo.dueDate);
      newDate.setHours(todo.time.split(":")[0]);
      newDate.setMinutes(todo.time.split(":")[1]);

      title.innerHTML = todo.title;
      description.innerHTML = todo.description;
      dueDate.innerHTML = newDate.toLocaleString();
  })
}

/**
 * Adds new task to the list and attaches all required event listeners
 */
const addNewTaskToArray = (event) => {
  event.preventDefault();
  if(document.getElementById("title") && document.getElementById("description") && document.getElementById("dueDateInput") && document.getElementById("timeInput")){
    const taskDetailsForm = document.getElementById('taskDetailsForm');
    const addNewtaskForm = document.getElementById('addNewtaskForm');
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let dueDateInput= document.getElementById("dueDateInput").value;
    let timeInput = document.getElementById("timeInput").value;
    if(title == "" || description == "" || dueDateInput == "" || timeInput ==""){
        return;
    }
    let task = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        dueDate: document.getElementById("dueDateInput").value,
        time: document.getElementById("timeInput").value,
        completed: false
    }
    todoList.push(task);
    fetch("/todo", {
      method: 'post',
      headers : { 
        'Content-Type': 'application/json',
       },
       body:JSON.stringify({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        time: task.time,
        completed: task.completed
    })

    }).then(res=>res.json())
  .then(data=> {
      if(data.error) {
        console.log(data.error)
          // M.toast({html: data.error, classes: "#c62828 red darken-3"})
      }else {
        console.log(data);
          // M.toast({html: data.message, classes: "#388e3c green darken-1"})
          // history.push('/signin')
      }
  }).catch(err => {
      console.log(err)
  })
  const listitem = document.createElement('li');
  listitem.classList.add("todoList");

  let btn = document.createElement("span");
  let completeBtn = document.createElement("button");
  completeBtn.setAttribute("id", "checkList");
  completeBtn.classList.add("circleBtn");
  btn.appendChild(completeBtn);

  let p = document.createElement('p');
  p.innerHTML = task.title;
  p.classList.add("listClass");

  listitem.appendChild(btn);
  listitem.appendChild(p);
  let listContainer = document.getElementById('listContainer');
  listContainer.appendChild(listitem);

  setClassesForDueTasksAndCompletedTasks(task, completeBtn, p);
  
  listitem.addEventListener("click", function () {
      addNewtaskForm.setAttribute("style", "display:none");
      taskDetailsForm.setAttribute("style", "display:block");
      const title = document.getElementById('taskTitle');
      const description = document.getElementById('taskDescription');
      const dueDate = document.getElementById('dueDate');
      let tempDate = task.dueDate.split("-");
      let dateString = tempDate[1] + "/" + tempDate[2] + "/" + tempDate[0];
      let newDate = new Date(dateString);
      newDate.setHours(task.time.split(":")[0]);
      newDate.setMinutes(task.time.split(":")[1]);

      title.innerHTML = task.title;
      description.innerHTML = task.description;
      dueDate.innerHTML = newDate.toLocaleString();
  })

  toggleCompletionCheckBoxEvent(completeBtn, task, p)

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("dueDateInput").value = "";
  document.getElementById("timeInput").value = "";
  }
}

/**
 * Accepts a function that contains imperative, possibly effectful code.

@param effect — Imperative function that can return a cleanup function

@param deps — If present, effect will only activate if the values in the list change.
 */
  useEffect(() => {
    fetch("/todo", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }

    }).then(res=>res.json())
  .then(data=> {
      if(data.error) {
        console.log(data.error)
      }else {
        todoList = data;
        populate(todoList);
      }
  }).catch(err => {
      console.log(err)
  })
},[]);

    return(
        <div>
            <div className="addBtn">
                <button className="addTask saveBtn" onClick={addTaskClick}>
                    <span>+</span>  Add a task
         </button>
            </div>
            <div className="mainContent">
                <div className="itemlist">
                    <ul id="listContainer">
                    </ul>
                </div>
                <div className="taskDetails" id="taskDetailsForm">
                    <h3 id="taskTitle"></h3>
                    <p id="taskDescription"></p>
                    <small id="dueDate"></small>
                </div>

                <div className="addNewDetails" id="addNewtaskForm">
                    <h3>New task</h3>
                    <form>
                        <input type="text" name="title" id="title" placeholder="Title" required />
                        <input type="text" name="description" id="description" placeholder="Description" required />
                        <input type="date" id="dueDateInput" name="dueDateInput" date-format="MMM DD YYYY" required />
                        <input type="time" id="timeInput" name="timeInput" required />
                        <button className="saveBtn" onClick={addNewTaskToArray}>Save</button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default TodoWorkspace;