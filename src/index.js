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
  projectLinksListener()
})
projectLinksListener()
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
        if(e.target.innerText !== projectTitleJs.innerText){
          // We want to make sure that only the todolist belonging to a project are displayed
          resetTodolistsDisplay();
        } else if(e.target.innerText == projectTitleJs.innerText){
          // Cancel behavior if the same link is clicked
          return
        }
        displayProject(project.id, project.name, e.target.dataset.id);
        renderProjectTodolists(project.name, project.todolists);
      })
    })
  )
}
function displayProject(projectId, projectName, projectLinkId){
  // Display the appropriate Project by identifying Ids
  if(projectId == projectLinkId){
    projectTitleJs.innerText = projectName;
    displayTodolists.style.display = 'block';
  }
}
function renderProjectTodolists(projectName, projectTodolist) {
  // Render todolists belonging to the project
  if(projectTitleJs.innerText == projectName){
    for(let i=0; i< projectTodolist.length; i++){
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = 'javascript:void(0)';
      a.classList.add('todolist-link')
      a.dataset.id = 'todolist-'+todolistId;
      a.innerHTML = projectTodolist[i].name
      li.appendChild(a);
      todolistsJs.appendChild(li);
    } 
  }
}
function resetTodolistsDisplay(){
  while (todolistsJs.firstChild) {
    todolistsJs.removeChild(todolistsJs.lastChild)
  }
}
/* PROJECTS section end ==========================================*/


/* Todolists section controllers ==========================================*/
let todolistLinks = document.querySelectorAll('.todolist-link');
addTodolist.addEventListener('submit', (e)=>{
  e.preventDefault();
  //Create links for the todolists
  //Render the todolist
  resetTodolistsDisplay();
  const newTodolist = todolist(addTodolistInput.value, 'todolist-'+todolistId);
  addTodolistInput.value = '';
  todolistId += 1;
  console.log(projects)
  // Add new todolist to a project
  projects.forEach(project => {
    //Add todolist to the project that is selected
    if(projectTitleJs.innerText == project.name){
      project.todolists.push(newTodolist)
      for(let i=0; i< project.todolists.length; i++){
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = 'javascript:void(0)';
        a.classList.add('todolist-link')
        a.dataset.id = 'todolist-'+todolistId;
        a.innerHTML = project.todolists[i].name
        li.appendChild(a);
        todolistsJs.appendChild(li);
      }
    } 
  })
  //console.log(projects[0].todolist[0].name);
  todolistLinks = document.querySelectorAll('.todolist-link');
  todolistLinksListener();
  displayTodolist.style.display = 'block';
})
function todolistLinksListener() {
  todolistLinks.forEach(todolistLink => 
    todolistLink.addEventListener('click', (e) => {
      for(let i=0; i < projects.length; i++){
        for(let y=0; y < projects[i].todolists.length; y++) {
          if(e.target.dataset.id == projects[i].todolists[y].id) {
            todolistTitleJs.innerHTML = projects[i].todolists[y].name;
          }
        }
      }
    })
  )
} 
