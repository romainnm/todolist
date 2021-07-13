import '../dist/css/styles.css'

// DOM elements ================================================== //
const addProject = document.querySelector('.add-project-js');
const addProjectInput = document.querySelector('.add-project__input-js');
const displayProjects = document.querySelector('.projects-js');
const projectTitleJs = document.querySelector('.project-title-js');
const addTodolist = document.querySelector('.add-todolist-js');
const addTodolistInput = document.querySelector('.add-todolist__input-js');
const todolistTitleJs = document.querySelector('.todolist-title-js');
const todolistsJs = document.querySelector('.todolists-js');
const displayTodolists = document.querySelector('.display-todolists-js');
const displayTodolist = document.querySelector('.display-todolist-js');
const addTaskFormJs = document.querySelector('.add-task-form-js');
const addNewTaskJs = document.querySelector('.add-new-task-js')
const taskNameInput = document.querySelector('.task-name-input-js');
const taskDescriptionInput = document.querySelector('.task-description-input-js');
const taskDueDateInput = document.querySelector('.task-due-date-input-js');
const taskPriorityInput = document.querySelector('.task-priority-input-js');
const tasklistsJs = document.querySelector('.tasklists-js')
let todolistLinks = document.querySelectorAll('.todolist-link');
// DOM elements End ================================================== //

// Variables & Objects =============================================== //
/* IDs variable */
let projectId = 2;
let todolistId = 0;
let currentProject = '';
let currentTodolist = '';
/* Projects Object */
const projects = [
  {
    name: 'Groceries',
    id: 'project-'+0,
    todolists: [],
  }, 
  {
    name: 'Places to visit',
    id: 'project-'+1,
    todolists: [],
  }
];
// Variables & Objects =============================================== //

// CONSTRUCTORS ================================================= //
/* Project Factory: construct new projects */
const project = (name, id) => {
  const todolists = [];
  const editProject = () => {};
  const deleteProject = () => {};
  return {name, id, todolists, editProject, deleteProject};
} 
/* Todolist Factory: construct a new todolist */
const todolist = (name, id) => {
  const tasks = [];
  const editTodolist = () => {};
  const deleteTodolist = () => {};
  return {name, id, tasks, editTodolist, deleteTodolist};
}
/* Todolist Task Factory: construct a new todolist task */
const todolistTask = (name, description, dueDate, priority) => {
  const editTodolistTask = () => {};
  const deleteTodolistTask = () => {};
  return {name, description, dueDate, priority, editTodolistTask, deleteTodolistTask}
}
// CONSTRUCTORS End ============================================ //

/* PROJECTS section controllers ==========================================*/
renderProjects();
let projectLinks = document.querySelectorAll('.project-link');
addProject.addEventListener('submit', (e) => {
  e.preventDefault();
  resetProjectsDisplay();
  addNewProject(addProjectInput.value, 'project-'+projectId);
  renderProjects() 
  resetProjectInput();
  // Listens to the list of projects/links generated
  projectLinksListener();
})
projectLinksListener();

/* PROJECTS functions --------------------*/
function renderProjects() {
  for(let i = 0; i < projects.length; i++){
    createNewProject(projects[i].name, projects[i].id);
  } 
}
// Creates the elements that will be rendered
function createNewProject(newProject, id) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = 'javascript:void(0)';
  a.classList.add('project-link');
  a.innerHTML = newProject;
  a.dataset.id = id;
  li.appendChild(a);
  displayProjects.appendChild(li);
}
function addNewProject(addProjecName, addProjectId) {
  const newProject = project(addProjecName, addProjectId);
  projects.push(newProject);
  projectId += 1;
}
function resetProjectsDisplay() {
  while (displayProjects.firstChild) {
    displayProjects.removeChild(displayProjects.lastChild)
  }
}
function resetProjectInput() {
  addProjectInput.value = '';
}
function projectLinksListener(){
  projectLinks = document.querySelectorAll('.project-link');
  projectLinks.forEach(projectLink => {
    projectLink.addEventListener('click', (e) => {
      removeActiveProjectClass();
      projects.forEach(project => {
        resetTodolistsRender(project.id, e.target.dataset.id);
        displayProject(project.name, project.id, e.target.dataset.id);
        renderProjectTodolists(project.name, project.todolists);
        todolistLinksListener();
        resetTasklistDisplay();
        if(e.target.dataset.id == project.id){
          e.target.classList.add('active-project')
        } 
      })
      todolistTitleJs.style.display = "none";
      addNewTaskJs.style.display = "none";
    })
  })
}
function displayProject(projectName ,projectId, projectLinkId){
  // Display the appropriate Project by identifying Ids
  if(projectId == projectLinkId){
    projectTitleJs.innerText = projectName;
    displayTodolists.style.display = 'block';
  }
}
function renderProjectTodolists(projectName, projectTodolists) {
  // Render todolists belonging to the project
  if(projectTitleJs.innerText == projectName){
    for(let i=0; i< projectTodolists.length; i++){
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = 'javascript:void(0)';
      a.classList.add('todolist-link')
      
      if(a.dataset.id == undefined){
        a.dataset.id = projectTodolists[i].id;
      }
      a.innerHTML = projectTodolists[i].name
      li.appendChild(a);
      todolistsJs.appendChild(li);
      
    } 
  }
}
function resetTodolistsRender(projectId, projectLinkId){
  if(projectLinkId == projectId){
    while (todolistsJs.firstChild) {
      todolistsJs.removeChild(todolistsJs.lastChild)
    }
  } 
}
function removeActiveProjectClass(){
  projectLinks.forEach(projectLink => {
    if(projectLink.classList.contains('active-project')){
      projectLink.classList.remove("active-project")
    } 
  });
}
/* PROJECTS section end ==========================================*/


/* Todolists section controllers ==========================================*/
addTodolist.addEventListener('submit', (e)=>{
  e.preventDefault();
  resetTodolistsRender();
  projects.forEach(project => {
    //Add todolist to the selected project
    if(projectTitleJs.innerText == project.name){
      createNewTodolist(addTodolistInput.value, 'todolist-'+todolistId, project.todolists);
      todolistId += 1;
      renderProjectTodolists(project.name, project.todolists);
    } 
  })
  resetTodolistInput();
  todolistLinksListener();
  displayTodolists.style.display = 'block';
  displayTodolist.style.display = 'none';
  //-------------------------
  todolistTitleJs.style.display = "block";
  addNewTaskJs.style.display = "block";
})

function todolistLinksListener() {
  todolistLinks = document.querySelectorAll('.todolist-link');
  todolistLinks.forEach(todolistLink => 
    todolistLink.addEventListener('click', (e) => {
      for(let i=0; i<projects.length; i++){
        for(let y=0; y<projects[i].todolists.length; y++){
          if(e.target.dataset.id == projects[i].todolists[y].id) {
            todolistTitleJs.innerHTML = projects[i].todolists[y].name;
            currentTodolist = projects[i].todolists[y];
          }
        }
      }
      //console.log(currentProject);
      hideShowTodolistsInputs();
      resetTasklistDisplay();
      renderTasklist(currentTodolist.tasks);
      todolistTitleJs.style.display = "block";
      addNewTaskJs.style.display = "block";
    })
  )
} 

function createNewTodolist(newTodolistName, newTodolistId, projectTodolists) {
  const newTodolist = todolist(newTodolistName, newTodolistId);
  projectTodolists.push(newTodolist)
}
function resetTodolistInput(){
  addTodolistInput.value = '';
}
function hideShowTodolistsInputs(){
  displayTodolists.style.display = 'none';
  displayTodolist.style.display = 'block';
} 
/* Todolists section end ==========================================*/

/* Tasks section controllers ==========================================*/
  addNewTaskJs.addEventListener('click', (e)=>{
    toggleShowTaskForm();
  })

  addTaskFormJs.addEventListener('submit', (e)=>{
    e.preventDefault();
    resetTasklistDisplay();
    const newTask = todolistTask(taskNameInput.value, taskDescriptionInput.value, taskDueDateInput.value, taskPriorityInput.value);
    currentTodolist.tasks.push(newTask);
    resetTaskInputs();
    toggleShowTaskForm();
    renderTasklist(currentTodolist.tasks);
  })

  function resetTaskInputs(){
    taskNameInput.value = '';
    taskDescriptionInput.value = ''; 
    taskDueDateInput.value = '';
    taskPriorityInput.value = '';
  }
 function renderTasklist(taskList) {
    taskList.map(task => {
      const li = document.createElement('li');
      li.innerHTML = `${task.name} ${task.description}  ${task.dueDate} ${task.priority}`;
      tasklistsJs.appendChild(li);
    })
  }
  function resetTasklistDisplay(){
    while (tasklistsJs.firstChild) {
      tasklistsJs.removeChild(tasklistsJs.lastChild)
    }
  }
  function toggleShowTaskForm(){
    if(addNewTaskJs.style.display == "none"){
      addTaskFormJs.style.display = "none";
      addNewTaskJs.style.display = "block";
    } else{
      addTaskFormJs.style.display = "flex";
      addNewTaskJs.style.display = "none";
    }
  }
/* Tasks section end ==========================================*/

