import dataMod from "./dataMod";
import DOMMod from "./DOMMod";

const commsMod = (function (){
    function addTask(listId, title, desc, dueDate, priority){
        let task = dataMod.makeTask(title, desc, dueDate, priority);
        let id = dataMod.getList(listId).add(task);
        return id;
    }
    function setTask(listId, taskId, property, value){
        dataMod.getList(listId).set(taskId, property, value);
    }
    function delTask(listId, taskId){
        dataMod.getList(listId).del(taskId);
    }
    function addList(name){
        return dataMod.addList(name);
    }
    function delList(listId){
        dataMod.delList(listId);
    }
    function getList(listId){
        return dataMod.getList(listId);
    }
    function showDOM(){
        let content = document.querySelector('#content');
        let lists = dataMod.getLists();
        let firstListId = null;
        for(let listId in lists){
            firstListId = listId;
            break;
        }
        let sidebarNav = document.querySelector('#sidebar nav');
        let listInput = document.querySelector('#sidebar #listInput');
        DOMMod.addListNavBtns(sidebarNav, lists)
        DOMMod.addNewListInput(listInput);
        let taskCreate = DOMMod.taskCreate(firstListId);
        let taskDisplay = DOMMod.taskDisplay(firstListId);
        content.append(taskCreate, taskDisplay);
    }
    function getLists(){
        return dataMod.getLists()
    }
    return {addTask, setTask, delTask, addList, delList, getList, getLists, showDOM};
})();

export default commsMod;