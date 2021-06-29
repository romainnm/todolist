import '../dist/css/styles.css'

// DOM elements ================================================== //
const addProject = document.querySelector('.add-project-js');
const addProjectInput = document.querySelector('.add-project__input-js');
const displayProjects = document.querySelector('.projects-js');
const projectTitleJs = document.querySelector('.project-title-js');
const addTodolist = document.querySelector('.add-todolist-js');
const addTodolistInput = document.querySelector('.add-todolist__input-js');
const todolistTitleJs = document.querySelector('.todolist-title-js');
const displayTodolists = document.querySelector('.todolists-js');
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
  const editProject = () => {}
  const deleteProject = () => {}
  return {name, id, editProject, deleteProject}
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

/* App Logic / Controller */

renderProjects();
let projectLinks = document.querySelectorAll('.project-link');
addProject.addEventListener('submit', (e) => {
  e.preventDefault();
  /* Clean the display before re-rendering */
  resetProjectsDisplay();
  /* On Submit, create a new project*/
  const newProject = project(addProjectInput.value, 'project-'+projectId);
  projects.push(newProject);
  /* Add & Render projects */
  renderProjects() 
  // Increment ID
  projectId += 1;
  resetProjectInput();
  // Class project-link is created/updated in renderProjects() => update the DOM again here
  projectLinks = document.querySelectorAll('.project-link');
  // The project link listener needs to be called in order to have access to the updated DOM
  projectLinksListener()
})

projectLinksListener()

function projectLinksListener(){
  projectLinks.forEach(projectLink => 
    projectLink.addEventListener('click', (e) => { 
      projects.forEach(project => {
        if(project.id == e.target.dataset.id){
          projectTitleJs.innerText = project.name;
        }
      })
    })
  )
}

function renderProjects() {
  let idToAssign = '';
  // Loop throught the projects list
  for(let i = 0; i < projects.length; i++){
    if(projects[i].id !== undefined){
      idToAssign = projects[i].id;
    } else {
      idToAssign = projectId;
    }
    // Creates li/a of the projects & renders
    createNewProject(projects[i].name, idToAssign);
  } 
}

function createNewProject(newProject, id) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = 'javascript:void(0)';
  a.classList.add('project-link')
  a.innerHTML = newProject;
  a.dataset.id = id;
  li.appendChild(a);
  displayProjects.appendChild(li);
}

function resetProjectInput() {
  addProjectInput.value = '';
}

function resetProjectsDisplay() {
  while (displayProjects.firstChild) {
    displayProjects.removeChild(displayProjects.lastChild)
  }
}

// Todolist controller


let todolistLinks = document.querySelectorAll('.todolist-link');
addTodolist.addEventListener('submit', (e)=>{
  e.preventDefault();
  //Create links for the todolists
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = 'javascript:void(0)';
  a.classList.add('todolist-link')
  a.innerHTML = addTodolistInput.value;
  a.dataset.id = 'todolist-'+todolistId;
  li.appendChild(a);
  //Render the todolist
  displayTodolists.appendChild(li);
  const newTodolist = todolist(addTodolistInput.value, 'todolist-'+todolistId);
  todolistId += 1;
  // Add new todolist to a project
  projects.forEach(project => {
    project.todolists.push(newTodolist);
  })
  //
  todolistLinks = document.querySelectorAll('.todolist-link');
  todolistLinksListener();
})


function todolistLinksListener() {
  todolistLinks.forEach(todolistLink => 
    todolistLink.addEventListener('click', (e) => {
      for(let i=0; i < projects.length; i++){
        for(let y=0; y < projects[i].todolists.length; y++) {
          if(e.target.dataset.id == projects[i].todolists[y].id) {
            todolistTitleJs.innerHTML = projects[i].todolists[y].name
          }
        }
      }
    })
  )
} 
