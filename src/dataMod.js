const dataMod = (function (){    
    function isLocalStorageAvail(){
        let storage = window.localStorage;
        try{
            const x = 'x';
            storage.setItem(x,x);
            storage.removeItem(x);
            console.log('local storage available');
            return true;
        }
        catch(e){
            return (
                e instanceof DOMException &&
                e.name === "QuotaExceededError" &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage &&
                storage.length !== 0
            )
        }
    }

    class list {
        constructor(name){
            this.name = name;
            this.obj = {};
            this.id = getId('list');
        }
        add(obj){            
            this.obj[obj.id] = obj;
            setLocalMaster();
            return obj.id;
        }
        get(taskId){
            return this.obj[taskId]
        }
        set(taskId, property, value){
            this.obj[taskId][property] = value;
            console.log('set!');
            setLocalMaster();
        }
        del(taskId){
            delete this.obj[taskId];
            setLocalMaster();
        }
    }

    function makeTask(title = '', desc = '', date = null, priority = 'low', completed = false){
        return {title, desc, date, priority, completed, id:getId('task')};
    }

    //generates a time-based id based on a prefix, able to track up to 999999 obj
    const getId = function(prefix){
        if(typeof prefix !== "string") throw TypeError("id prefix must be string");
        else return prefix + 'i' + Date.now() % 1000000;
    }

    function addList(name){
        let newList = new list(name);
        masterList.obj[newList.id] = newList;
        setLocalMaster();
        return newList.id;
    }

    function getList(listId){
        return masterList.obj[listId];
    }

    function delList(listId){
        delete masterList.obj[listId];
        setLocalMaster();
    }

    function getLists(){
        return masterList.obj;
    }

    let defaultList = new list('Default');

    let masterList = new list('master');

    function getLocalMaster(){
        let prevMaster = JSON.parse(window.localStorage.getItem('master'));
        masterList.obj = prevMaster.obj;
        for(let id in masterList.obj){
            let obj = masterList.obj[id];
            let tempList = new list(obj.name);
            tempList.id = obj.id;
            tempList.obj = obj.obj;
            masterList.obj[id] = tempList;
        }
        console.log('local get');
    }

    function setLocalMaster(){
        window.localStorage.setItem('master', JSON.stringify(masterList));
        console.log('local set');
    }
    if(isLocalStorageAvail()){
        if(!window.localStorage.getItem('master')){
            masterList.add(defaultList);
            setLocalMaster();
        }
        else{
            getLocalMaster();   
        }
    }
    else{
        masterList.add(defaultList);
    }

    return {makeTask, addList, getList, delList, getLists};
})();

export default dataMod;