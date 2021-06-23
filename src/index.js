import '../dist/css/styles.css'

/* DOM manipulation */
const addProject = document.querySelector('.add-project-js');
const addProjectInput = document.querySelector('.add-project__input-js');
const displayProjects = document.querySelector('.projects-js');

/* Storage for all projects / todolists */
let projectId = 0;

const projects = [
  {
    name: 'Groceries',
    id: 'p1',
  }, 
  {
    name: 'Places to visit',
    id: 'p2',
  }
];
const todolists = [];

/*
*/

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

/* App Logic / Controller */
renderProjects();

addProject.addEventListener('submit', (e) => {
  e.preventDefault();
  /* Clean the display before re-rendering */
  resetProjectsDisplay();
  /* On Submit, create a new project*/
  const newProject = project(addProjectInput.value, projectId);
  /* Increment ID number */
  projectId += 1;
  /* Add & Render projects */
  projects.push(newProject);
  renderProjects() 
  resetProjectInput();
})

function renderProjects() {
  for(let i = 0; i < projects.length; i++){
    createNewProject(projects[i].name);
  } 
}

function createNewProject(newProject) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = 'javascript:void(0)';
  a.innerHTML = newProject;
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