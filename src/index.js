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
const addTaskJs = document.querySelector('.add-task-js');
// DOM elements End ================================================== //

// Variables & Objects =============================================== //
/* IDs variable */
let projectId = 2;
let todolistId = 0;
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
  const editProject = () => {}
  const deleteProject = () => {}
  return {name, id, todolists, editProject, deleteProject}
} 
/* Todolist Factory: construct a new todolist */
const todolist = (name, id) => {
  const editTodolist = () => {}
  const deleteTodolist = () => {}
  return {name, id, editTodolist, deleteTodolist}
}
/* Todolist Task Factory: construct a new todolist task */
const todolistTask = (name, description, dueDate, priority) => {
  const editTodolistTask = () => {}
  const deleteTodolistTask = () => {}
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
  projectLinks.forEach(projectLink => 
    projectLink.addEventListener('click', (e) => { 
      projects.forEach(project => {
        resetTodolistsRender(project.id, e.target.dataset.id);
        displayProject(project.name, project.id, e.target.dataset.id);
        renderProjectTodolists(project.name, project.todolists);
      })
    })
  )
}
function displayProject(projectName ,projectId, projectLinkId){
  // Display the appropriate Project by identifying Ids
  if(projectId == projectLinkId){
    projectTitleJs.innerText = projectName;
    displayTodolists.style.display = 'block';
  }
}
function renderProjectTodolists(projectName, projectTodolists) {
  let idToAssign;
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
/* PROJECTS section end ==========================================*/


/* Todolists section controllers ==========================================*/
let todolistLinks = document.querySelectorAll('.todolist-link');
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
})

function todolistLinksListener() {
  todolistLinks = document.querySelectorAll('.todolist-link');
  todolistLinks.forEach(todolistLink => 
    todolistLink.addEventListener('click', (e) => {
      for(let i=0; i<projects.length; i++){
        for(let y=0; y<projects[i].todolists.length; y++){
          if(e.target.dataset.id == projects[i].todolists[y].id) {
            todolistTitleJs.innerHTML = projects[i].todolists[y].name;
          }
        }
      }
      //hideShowTodolistsInputs()
    })
  )
} 

function createNewTodolist(newTodolistName, newTodolistId, projectTodolists) {
  const newTodolist = todolist(newTodolistName, newTodolistId);
  projectTodolists.push(newTodolist)
  console.log(projectTodolists)
}
function resetTodolistInput(){
  addTodolistInput.value = '';
}
function hideShowTodolistsInputs(){
  displayTodolists.style.display = 'none';
  displayTodolist.style.display = 'block';
} 

