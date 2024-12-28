import "./style.css";
import taskManagerModule from "./taskManager";

let task = taskManagerModule.makeTask('hello','bye', new Date());

console.log(taskManagerModule.makeList('default', task));
