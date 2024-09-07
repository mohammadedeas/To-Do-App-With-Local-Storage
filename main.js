let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksdiv = document.querySelector(".tasks")

// empty array of tasks
let arrayoftasks= [];

//check if there is tasks in local storage
if (localStorage.getItem("tasks")){

    arrayoftasks=JSON.parse(localStorage.getItem("tasks"));
}


// triger get data from local storage function
getdatafromlocalstorge();

//click on task elemnt
tasksdiv.addEventListener("click",(e)=>{
//delete button
if (e.target.classList.contains("del")){
 // remove element from local storage
 deleteTaskwith(e.target.parentElement.getAttribute("data-id"));

    //remove element from page
    e.target.parentElement.remove();
   
}
// task element
if (e.target.classList.contains("task")){
    //toggle completed for the task
    toggletaskwithstatute(e.target.getAttribute("data-id"))
    // toggle done class
    e.target.classList.toggle("done");
}
}

)


// add task
submit.onclick =function(){
    if (input.value !== ""){
        addtasktoarray(input.value); // add task to array
        input.value = ""; // empty the input field 


    }
}
function addtasktoarray (tasktest){
        //task data
    const task={
        id : Date.now(),
        title : tasktest,
        completed: false,
    };
    // push task to array of tasks
    arrayoftasks.push(task);
    //console.log(arrayoftasks); (testing if it worked or not)
    //add elements to page 
    addelementstopagefrom(arrayoftasks);
    //add tasks to local storage
        storeatlocal(arrayoftasks);
        // for testing 
        //console.log(arrayoftasks);
        //console.log(JSON.stringify(arrayoftasks));
}
function addelementstopagefrom (arrayoftasks){
    //empty the tasks DIV
    tasksdiv.innerHTML="";
    // looping on array of tasks
    arrayoftasks.forEach(task => {
        // create main div
        let div= document.createElement("div");
        div.className = "task";
        //checkif task is done 
        if (task.completed){
            div.className="task done";

        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        //create delete buttopn
        let span = document.createElement("span");
        span.className="del";
        //abend button to main div
        span.appendChild(document.createTextNode("delete"));
        div.appendChild(span);
        //console.log(div);
        // add task div to task container
        tasksdiv.appendChild(div);
    });
}
function storeatlocal(arrayoftasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayoftasks));

}
function getdatafromlocalstorge(){
    let data=window.localStorage.getItem("tasks");
    if(data){
        let tasks=JSON.parse(data);
        addelementstopagefrom(tasks);

       
    }
}
function deleteTaskwith(taskId){
    arrayoftasks=arrayoftasks.filter((task)=>task.id !=taskId );

    addelementstopagefrom(arrayoftasks);
    storeatlocal(arrayoftasks);
}
function toggletaskwithstatute(taskId){
    for(let i = 0; i<arrayoftasks.length;i++){
        if (arrayoftasks[i].id ==taskId){
            arrayoftasks[i].completed == false ? (arrayoftasks [i].completed=true) : (arrayoftasks[i].completed = false);

        }
    }
    storeatlocal(arrayoftasks);
}
   