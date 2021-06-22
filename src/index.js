import '../dist/css/styles.css'

/* Storage for all projects / todolists */
const projects = [];
const todolists = [];


/*[{
  name: project1,
  id: p1
  }, 
 {
  name: project2,
  id: p2
  }, {
  name: project3,
  id: p3
 }]
*/

/* Project Factory: construct new projects */
const project = (name, id) => {
  return {name, id}
} 

/* Todolist Factory: construct a new todolist */
const todolist = (name, id) => {
  return {name, id}
}

/* Todolist Task Factory: construct a new todolist task */
const todolistTask = (name, description, dueDate, priority) => {
  return {name, description, dueDate, priority}
}
