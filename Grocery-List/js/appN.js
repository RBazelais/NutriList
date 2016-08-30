/* APP Javascript File */

var taskInput = document.getElementById("new-task"); //new-tasks
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incompleted-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New Task List Item
var createNewTaskElement = function(taskString){
    //create List Item
    var listItem = document.createElement("li");// list item
    
    //input (checkbox)
    var checkBox = document.createElement("input");// checkBox
    
	//label
    var label = document.createElement("label");// label
    
	//input (text)
     var editInput = document.createElement("input");// text
    
	//button.edit
    var editButton = document.createElement("button");// edit btn
    
	//button.delete
    var deleteButton = document.createElement("button");// delete btn
    
	//Each element needs to be modified 
    checkBox.type = "checkbox";
    editInput.type = "text";
    
    editButton.innerText = "Edit";
    editButton.className = "edit";
    
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    
    label.innerText = taskString;
    
    //Each element needs to be appended
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    
    return listItem;
}

//add a new task
var addTask = function(){
	if (taskInput.value !== ""){
		console.log("Add Task...");

		//Create a new list item with the text from #new-task:
		var listItem = createNewTaskElement(taskInput.value);

		//Append listItem to the incompleteTasksHolder
		incompleteTasksHolder.appendChild(listItem);
		bindTaskEvents(listItem, taskCompleted);

		//assign an empty string to clear out input
		taskInput.value = "";
	}else{
		alert("This field is empty! Type in the field to add a new item to your current list.");
	}
}

//update chart every time the add task button is clicked
var updateChart = function(){
	console.log("The updateChart function is running...");
	
	//look into ever val in list
	//sum each tag
	//look through each item in list
	//map text to the data
	
	myChart.data.datasets[0].data = [ //randomize chart values
		Math.abs(Math.random()), 
		Math.abs(Math.random()),
		Math.abs(Math.random()), 
		Math.abs(Math.random()), 
		Math.abs(Math.random())
	];
	myChart.update();
}

//http://localhost:3030/Product?query={%22topology.subCategory%22:%22Fresh%20Fruits%22}

//edit an existing task
var editTask = function(){
	console.log("Edit Task...");
    
    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    
    var containsClass = listItem.classList.contains("editMode");
	//if the class of the parent is in .editMode
    if(containsClass){
    
		//switch from .editMode
		//the label text becomes input's the value
        label.innerText = editInput.value;
    }else{
	//else
		//switch to .editMode
		//the label value becomes label's the text
        editInput.value = label.innerText;
    }
	//toggle .editMode on the list item(parent)
    listItem.classList.toggle("editMode");        
}

//delete an existing task
var deleteTask = function() {
	console.log("Delete Task...");
	//when the delete button is pressed 
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    
    //remove the parent (li) list item from the (ul)unordered list
    ul.removeChild(listItem);
}

//mark a task as complete
var taskCompleted = function(){
	console.log("Task Complete ...");
    //append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}	
	
//mark a task as incomplete
var taskIncomplete = function(){
	console.log("Task Incomplete...");
    //append the task list item to the #incompleted-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
	console.log("Bind list item events");
	//select taskListItem's children
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");
		
		//bind editTask to edit button
		editButton.onclick = editTask;
		
		//bind deleteTask to the delete button
		deleteButton.onclick = deleteTask;
		
		//bind checkBoxEventHandler to checkbox
		checkBox.onchange = checkBoxEventHandler;
}

//var ajaxRequest = function(){
//    console.log("AJAX request");
//}

//set the click handler to the add task function
//call the function when the user interacts with the button
addButton.onclick = addTask;
addButton.addEventListener("click", updateChart);

//cycle over incompleteTaskHolder ul list item
for (var i = 0; i < incompleteTasksHolder.children.length; i++){
	//bind events to list item's children (taskCompleted)
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completeTaskHolder ul list item
for (var i = 0; i < completedTasksHolder.children.length; i++){
	//bind events to list item's children (taskIncomplete);
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}


/* Improvements to be made:
    1. alter the edit button to say, save when the text input is being edited
*/
