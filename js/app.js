var todoTaskList=[];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

var todoListTitles=[];

var listCount=0;

var selectedList=0;
function onPageLoad()
{
    setInterval(setDate, 1);
    setInterval(hideListForm, 1);
}




function setDate()
{
var dt= new Date();


var dayName = days[dt.getDay()];
var date = dt.getDate();
var month=monthNames[dt.getMonth()];
var year=dt.getFullYear();


var hours=dt.getHours();
var minutes=dt.getMinutes();
var secs=dt.getSeconds();
var md;
md=hours>=12? "PM" : "AM";

hours=hours%12;
if(hours==0)

{
    hours=12
}
hours=hours>9? hours: "0"+hours;
minutes=minutes>9? minutes: "0"+minutes;
secs=secs>9? secs: "0"+secs;

var time = hours+":"+minutes+":"+secs + " " +md;
var fullDate=dayName + ", " +date+" "+month+" "+year + ", " +time;

var dateSlot=document.getElementById("date-slot");
dateSlot.innerHTML=fullDate;
}

var formenabled=false;
function enableListForm()
{
    if(formenabled==true)
    {
        document.getElementById("add-list-form").style.display="none";
        formenabled=false;
        return;
    }
    if(screen.width>830)
    {
        formenabled=true
        document.getElementById("add-list-form").style.display="inline-block";
    }
    else
    {
        var listTitle=prompt("Enter to-do list title");
        addList(listTitle);
    }
}

function hideListForm()
{
    if(screen.width<830)
    {
        document.getElementById("add-list-form").style.display="none";
        formenabled=false;
    }
    return;
}


function addList(lt)
{
    var titleField=document.getElementById("list-title");
    listTitle=titleField.value==""? lt:titleField.value;
    if(listTitle==undefined || listTitle=="" || listTitle==" ")
    {
        return;
    }
    var list=document.createElement("li");
    var listRef=document.createElement("a");
    listRef.setAttribute("href", "javascript:void(0)");
    listRef.setAttribute("id", listCount);
    listTitle=document.createTextNode(listTitle );
    listRef.appendChild(listTitle);
    var delButton=document.createElement("button");
    delButton.setAttribute("id", todoListTitles.length);
    delButton.setAttribute("class", "delete-list-btn")
    delButton.setAttribute("onclick", "deleteList(this.getAttribute('id'))");
    var delBtText=document.createTextNode("Delete");
    delButton.appendChild(delBtText);
    var listItem=document.createElement("span");
    listItem.setAttribute("class", "todo-title-list-item")
    listItem.appendChild(listRef);
    listItem.appendChild(delButton);
    list.setAttribute("id", todoListTitles.length)
    list.setAttribute("onclick","createList(this.getAttribute('id'))");
    list.appendChild(listItem);
    todoListTitles.push(list);
    todoTaskList.push([]);
    addTitles();
    titleField.value="";
}


function addTitles()
{
    var todoLists=document.getElementById("todo-lists");
    todoLists.innerHTML="";
    for(var i=0; i<todoListTitles.length; i++)
    {
    todoLists.appendChild(todoListTitles[i]);
    }
    resetTitleNumber();
}


function resetTitleNumber()
{
    var lists = document.getElementsByClassName("delete-list-btn");
    for(var i=0; i<lists.length; i++)
    {
        lists[i].setAttribute("id", i);
        todoListTitles[i].setAttribute("id", i);
    }
    showTasks(selectedList);
}



function deleteList(title_num)
{
title_num=Number(title_num);
if(title_num==0)
{
    todoListTitles.shift();
    todoTaskList.shift();
}
else if(title_num==todoListTitles.length-1)
{
    todoListTitles.pop();
    todoTaskList.pop();
}
else
{
    todoListTitles=todoListTitles.slice(0, title_num).concat(todoListTitles.slice(title_num+1));
    todoTaskList=todoTaskList.slice(0, title_num).concat(todoTaskList.slice(title_num+1));
}
addTitles();
}


function addTodoTask(todoListId)
{
    todoListId=Number(todoListId);
    var task=prompt("Add task");
    if(task==null || task==" " || task=="" || task==undefined)
    {
        return;
    }
    todoTaskList[todoListId].push(task);

    showTasks(todoListId);


}

function createList(list_id)
{
    var addTaskBt=document.getElementById("add-todo-task-bt");
    addTaskBt.setAttribute("todo-list-number", list_id)
    addTaskBt.style.display="inline-block";
    showTasks(list_id);
    
}

function showTasks(list_id)
{
    if(todoTaskList[list_id]==undefined)
    return;
    else
    {
    selectedList=list_id
    document.getElementById("todo-item-list").innerHTML="";
    list_id=Number(list_id);
    var taskList=document.getElementById("todo-item-list");
    for(var i=0; i<todoTaskList[list_id].length; i++)
    {
    var icon=document.createElement("i");
    icon.setAttribute("class", "fa fa-list-alt list-icon");
    icon.setAttribute("aria-hidden", "true");
    var listItem = document.createElement("li");
    listItem.setAttribute("id", i);
    var taskTodo=document.createTextNode(todoTaskList[list_id][i]);
    var delButton=document.createElement("button");
    var btText=document.createTextNode("Delete");
    delButton.appendChild(btText);
    delButton.setAttribute("id", i);
    delButton.setAttribute("class", "delete-task-btn")
    delButton.setAttribute("onclick", "deleteTask(this.getAttribute('id'))");
    var todoItem=document.createElement("span");
    todoItem.setAttribute("class", "todo-item");
    todoItem.appendChild(icon);
    todoItem.appendChild(taskTodo);
    todoItem.appendChild(delButton);
    listItem.appendChild(todoItem);
    taskList.appendChild(listItem);
    }
}
}

function deleteTask(taskId)
{
    taskId=Number(taskId);
    todoTaskList[selectedList]=todoTaskList[selectedList].slice(0, taskId).concat(todoTaskList[selectedList].slice(taskId+1));
    showTasks(selectedList);
}