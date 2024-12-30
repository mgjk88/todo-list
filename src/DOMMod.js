import commsMod from "./commsMod";
//all generated content will be within div#content

const DOMMod = (function(){
    function addPriorityMenu(cntr, selected = 'low'){
        let priority = document.createElement('select');
        priority.name = 'priority';
        let lowPriority = document.createElement('option');
        lowPriority.value = 'low';
        lowPriority.id = 'lowPriority';
        lowPriority.textContent = '!';
        let mediumPriority = document.createElement('option');
        mediumPriority.value = 'medium';
        mediumPriority.id = 'mediumPriority';
        mediumPriority.textContent = '!!';
        let highPriority = document.createElement('option');
        highPriority.value = 'high';
        highPriority.id = 'highPriority';
        highPriority.textContent = '!!!';
        switch(selected){
            case 'low': 
                lowPriority.selected = true;
                break;
            case 'medium': 
                mediumPriority.selected = true;
                break;
            case 'high': 
                highPriority.selected = true;
                break;
        }
        priority.append(lowPriority,mediumPriority,highPriority);
        cntr.appendChild(priority);
        return priority;
    }

    function addCheckbox(cntr){
        let chkbox = document.createElement('input');
            chkbox.type = 'checkbox';
            chkbox.name = 'completed';

        cntr.appendChild(chkbox);
        return chkbox;
    }

    function addDatePicker(cntr){
        let date = document.createElement('input');
        date.type = 'date';
        date.name = 'date';
        cntr.appendChild(date);
        return date;
    }

    function showTask(listId, taskId){
        let task = commsMod.getList(listId).obj[taskId];
        let taskCntr = document.createElement('div');
        taskCntr.addEventListener('focusout', ()=>{
            let list = commsMod.getList(listId);
            if(Object.hasOwn(list.obj, taskId) === false) return;
            commsMod.setTask(listId, taskId, 'title', title.value);
            commsMod.setTask(listId, taskId, 'desc', desc.value);
            commsMod.setTask(listId, taskId, 'priority', priority.value);
            commsMod.setTask(listId, taskId, 'date', dueDate.value);
        })
        taskCntr.id = task.id;
        taskCntr.classList.add('task');

        let form = document.createElement('form');

        let title = document.createElement('textarea');
        title.value = task.title;
        title.name = 'title';
        title.placeholder = 'Title';
        title.wrap = 'hard';
        form.appendChild(title);

        let desc = document.createElement('textarea');
        desc.placeholder = 'Description';
        desc.value = task.desc;
        desc.name = 'desc';
        desc.wrap = 'hard';

        let dueDate = addDatePicker(form);
        dueDate.value = task.date;
        let priority = addPriorityMenu(form, task.priority);
        let checkbox = addCheckbox(form);
        checkbox.addEventListener('click', ()=>{
            if(checkbox.checked = true){
                commsMod.delTask(listId, taskId);
                taskCntr.remove();
            }
        })
        
        let moreBtn = document.createElement('button');
        moreBtn.classList.add('moreBtn');
        moreBtn.textContent = '...';
        moreBtn.addEventListener('click', (e) =>{
            e.preventDefault();
            let btmDiv = document.querySelector('#'+taskId+' div');
            if(btmDiv === null){
                btmDiv = document.createElement('div');

                let delBtn = document.createElement('button');
                delBtn.textContent = 'delete';
                delBtn.addEventListener('click', ()=>{
                    commsMod.delTask(listId, taskId);
                    document.querySelector('#'+taskId).remove();
                });
                btmDiv.append(desc, delBtn);
                taskCntr.appendChild(btmDiv);    
            }
            else{
                btmDiv.remove();
            }
        });

        form.appendChild(moreBtn);

        taskCntr.appendChild(form);
        return taskCntr;
    }

    function taskCreate(listId){
        let createCntr = document.createElement('div');
        createCntr.id = 'taskCreator';
        let listHdr= document.createElement('div');
        let hdr = document.createElement('h2');
        hdr.textContent = commsMod.getList(listId).name + ':';
        listHdr.appendChild(hdr);
        createCntr.appendChild(listHdr);

        let form = document.createElement('form');

        let txtInputCntr = document.createElement('div');
        let title = document.createElement('textarea');
        title.placeholder = 'Title';
        let desc = document.createElement('textarea');
        desc.placeholder = 'Description';

        txtInputCntr.append(title, desc);
        form.appendChild(txtInputCntr);
        let date = addDatePicker(form);
        let priority = addPriorityMenu(form);
        let submitBtn = document.createElement('button');
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let taskId = commsMod.addTask(listId, title.value, desc.value, date.value, priority.value);
            let list = document.querySelector('#content '+'#'+listId);
            list.appendChild(showTask(listId, taskId));
            title.value = '';
            desc.value = '';
            date.value = '';
            priority.querySelector('#lowPriority').selected = true;
        });
        submitBtn.textContent = 'submit';
        form.appendChild(submitBtn);
        createCntr.appendChild(form);
        return createCntr;
    }

    function taskDisplay(listId){
        let listCntr = document.createElement('div');
        listCntr.id = listId;
        listCntr.classList.add('list');
        let tasks = commsMod.getList(listId).obj;
        if(tasks !== null){
            for(let taskId in tasks){
                let taskCntr = showTask(listId, taskId);
                listCntr.appendChild(taskCntr);
            }
        }
        return listCntr;
    }

    function addListBtn(cntr, listId, obj){
        let listBtn = document.createElement('div');
        listBtn.id = listId;
        let btn = document.createElement('button');
        btn.classList.add('listBtn');
        btn.textContent = obj[listId].name;

        let contentDiv = document.querySelector('#content');

        btn.addEventListener('click', ()=>{
            clearContent();
            contentDiv = document.querySelector('#content');
            contentDiv.append(taskCreate(listId), taskDisplay(listId));
        });

        let delBtn = document.createElement('button');
        delBtn.textContent = 'delete';
        delBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            commsMod.delList(listId);
            listBtn.remove();
            clearContent();
            let masterlist = commsMod.getLists();
            let listIds = Object.keys(masterlist);

            let contentDiv = document.querySelector('#content');
            if(listIds.length === 0){
                let hdr = document.createElement('h2');
                hdr.textContent = 'Wow such empty';
                contentDiv.appendChild(hdr);
            }
            else{
                contentDiv.append(taskCreate(listIds[0]), taskDisplay(listIds[0]));    
            }
        })
        listBtn.append(btn, delBtn);
        cntr.appendChild(listBtn);
    }

    function addListNavBtns(cntr, obj){
        for(let listId in obj){
            addListBtn(cntr, listId, obj);
        }
    }

    function clearContent(){
        let contentDiv = document.querySelector('#content'); 
        let DOMCntr = document.querySelector('#DOMCntr');
        contentDiv.remove();
        contentDiv = document.createElement('div');
        contentDiv.id = 'content';
        DOMCntr.appendChild(contentDiv);
    }

    function addNewListInput(cntr){
        let nameInput = document.createElement('input');
        nameInput.placeholder = 'New List Name';
        let addNewListBtn = document.createElement('button');
        addNewListBtn.textContent = 'add';
        addNewListBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            let name = nameInput.value;
            let listId = commsMod.addList(name);
            let obj = commsMod.getLists();
            let sidebarNav = document.querySelector('#sidebar nav');
            addListBtn(sidebarNav, listId, obj);
            nameInput.value = '';
        });
        cntr.append(nameInput, addNewListBtn);
    }
    return {taskDisplay, taskCreate, addListNavBtns, addNewListInput};
})();

export default DOMMod;