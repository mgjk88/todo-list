GOAL: TODO APP

APP FUNCTONS:
    - Add List
    - Delete List
    - Edit List
    - Add Task to List
    - Delete Task from List 
    - Edit Task
    - Toggle Task Completion
    - Maintain record of lists and tasks

dataMod:
    - use webStorageAPI to store lists
    - 2 computational objects: List and Task
    - generate id to track objects using genId()
    - get, set, add, delete Lists using webstorageAPI localStorage
    - get, set, add, delete Tasks using List

    Task are implemented as object:
        - Store properties: (title: string, description: string, due date: Date() object, priority: number, completion status: boolean, id: string)
        - Edit properties
        - created using factory function makeTask(title, desc, dueDate, priority, completed, id)

    List are implemented as a class:
        - able to track both Lists and Tasks
        - store name in this.name
        - store id in this.id
        - store obj in this.obj as id:obj key-value pairs
        - add Tasks, using addTask()
        - delete Tasks using delTask()

    Internals:
        - genId(prefix) return id
        List functions (Task operations): 
            - add(title, desc, dueDate, priority, completed) return taskId 
            - get(taskId) return task 
            - set(taskId, property, value) return void 
            - del(taskId) return void
    Imports:
        - commsMod
    Exports:
        - addList(listName) return listId -> request/subscribe by commsMod
        - getList(listId) return List -> subscribe by commsMod
        - delList(listId) return void -> request by commsMod
        - getLists() return [this.obj of masterList] -> subscribe by commsMod
    

DOMMod:
    DOM Layout:
        - 1 header with a button to show / hide sidebar
        - 1 left sidebar that has buttons to display each List, no of Lists = no of buttons, 
          1 button for add list
        - 1 content div that contains 1 task creation section and 1 task display section:
            - task creation div has:
                - 1 form
                - 1 div for title and desc
                - 1 textarea for title (top)
                - 1 textarea for desc (bottom)
                - 1 input for date 
                - 1 select for priority
                - 1 button for submission 
            - task display div displays each task using: 
                - 1 form
                - 1 textarea for title 
                - 1 input for dueDate
                - 1 select for priority -onlick-> show dropdown
                - 1 input for checkbox  -onclick-> delete task
                - 1 button for show more -onclick-> show desc & delete btn
    
    DOMMod will only handle content div as the rest will be in html and css.
    Interals:
        - submit(listId) return void -> request commsMod to create Task
        - update(taskId, property, value) -> request commsMod to update Task 
        - toggleDesc() return void -> toggle display of desc
    Imports:
        - commsMod
    Exports:
        - taskDisplay(listId) return HTMLDivElement -> subscribe 
          commsMod for task data load DOM of taskDisplay to show list
          -taskCreate(listId) return HTMLDivElement -> request commsMod to create task in list
          -listNavBtns(cntr, obj) return void


commsMod:
    - controller of modules
    Exports:
        - addTask(listId, title, desc, dueDate, priority) return taskId:
            - list = dataMod.getList()
            - list.add()
        - setTask(listId, taskId, field, value) return void:
            - dataMod.getList().set()
        - delTask(listId, taskId) return void:
            - dataMod.getList().del()
        - newList(listName) return listId:
            - dataMod.addList()
        - removeList(listId) return void:
            - dataMod.delList()
        - showDOM(listId) return void
        - getLists() return object;





*Achieve SOLID OOP design principles

Single Responsibility:
Comprised of 3 modules:
    - dataMod: Manages data of app (low level module):
    - commsMod: Manages communications between modules (high level module):
    - DOMMod: Manages DOM (low level module):

Open-Closed:

Liskov Substitution

Interface Segregation

Dependency Inversion:
App is built on index.js, interacts with commsMod only


