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
  // projectLinks = document.querySelectorAll('.project-link');
  // The project link listener needs to be called in order to have access to the updated DOM
  projectLinksListener()
})

//projectLinksListener()
function projectLinksListener(){
  projectLinks = document.querySelectorAll('.project-link');
  projectLinks.forEach(projectLink => 
    projectLink.addEventListener('click', (e) => { 
      projects.forEach(project => {
        if(e.target.innerText !== projectTitleJs.innerText){
          resetTodolistsDisplay();
        } else if(e.target.innerText == projectTitleJs.innerText){
          return
        }
        if(project.id == e.target.dataset.id){
          projectTitleJs.innerText = project.name;
          displayTodolists.style.display = 'block';
        }
        if(projectTitleJs.innerText == project.name){
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
  
  /* a.href = 'javascript:void(0)';
  a.classList.add('todolist-link')
  a.innerHTML = addTodolistInput.value;
  a.dataset.id = 'todolist-'+todolistId;
  li.appendChild(a); */
  
  //Render the todolist
  //todolistsJs.appendChild(li);
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

function resetTodolistsDisplay(){
  while (todolistsJs.firstChild) {
    todolistsJs.removeChild(todolistsJs.lastChild)
  }
}

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
