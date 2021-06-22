
- At a minimum the todolist should have a *title*, *description*, *dueDate* and *priority* - (optional: add *notes* or *checklist*)
- The todo list should have projects or separate lists of todos. 
- When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. Users should be able to create new projects and choose which project their todos go into.
- Separate DOM manipulation and App Logic

<Project>
    <todolist>
        <todo-item />
        <todo-item />
    </todolist>
    <todolist>
        <todo-item />
        <todo-item />
    </todolist>
</Project>

CreateProject()
CreateTodo(title, description, dueDate, priority)

Projects container > Projects > Todos

Use localStorage to save user’s projects and todos between sessions.


