const taskManagerModule = (function (){
    class list {
        constructor(name, tasks){
            this.name = name;
            this.tasks = {};
            tasks.forEach(task => this.add(task));
        }
        add(task){
            this.tasks[getId('task')] = task;
        }
        delete(id){
            delete this.tasks[id];
        }
        complete(id){
            this.tasks[id].complete = !this.tasks[id].complete;
        }
    }

    //generates a time-based id based on a prefix, able to track up to 999999 tasks
    const getId = function(prefix){
        if(typeof prefix !== "string") throw TypeError("id prefix must be string");
        else return prefix + 'i' + Date.now() % 1000000;
    }

    function makeList(name, ...tasks){
        return new list(name, tasks);
    }

    //task factory function
    function makeTask(completed = false, title = '', desc = '', dueDate = null, priority = 0, notes = ''){
        return {completed, title, desc, dueDate, priority, notes};
    }

    return {makeList, makeTask}
})();

export default taskManagerModule;