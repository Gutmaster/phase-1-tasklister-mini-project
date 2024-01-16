document.addEventListener("DOMContentLoaded", () => {
  // your code here
  document.getElementById("create-task-form").addEventListener('submit', function(event){
    event.preventDefault()
    createTask(document.getElementById('new-task-description').value, document.getElementById('new-task-user').value)
  })
});


function prioritySelect(){
  switch(this.value){
    case 'TOP!!!':
      this.parentNode.style.color = '#FF0000'
      break
    case 'High!':
      this.parentNode.style.color = '#FFA500'
      break
    case 'Medium':
      this.parentNode.style.color = '#00FFFF'
      break
    case 'Low':
      this.parentNode.style.color = '#00FF00'
      break
  }
  sortTasks()
}


function createTask(task, user){
  if(task === "")
    return

  let div = document.createElement('div')
  document.getElementById('tasks').appendChild(div)

  let p = document.createElement('p')
  if(user === ""){
    p.textContent = `${task}  `
  }
  else{
    p.textContent = `${user}: ${task}  `
  }
  p.style.display = 'inline-block'
  p.style.fontWeight = 'bold'
  p.style.marginRight = '5px'
  div.appendChild(p)

  let edit = document.createElement('button')
  edit.textContent = 'e'
  div.appendChild(edit)
  edit.addEventListener('click', editStart)


  let priority = document.createElement('select')
  priority.innerHTML = 
  `<option value="" selected disabled hidden>priority</option>
  <option value="TOP!!!">TOP!!!</option>
  <option value="High!">High!</option>
  <option value="Medium">Medium</option>
  <option value="Low">Low</option>`
  div.appendChild(priority)
  priority.onchange = prioritySelect

  let btn = document.createElement('button')
  btn.textContent = ' X '
  div.appendChild(btn)
  btn.addEventListener('click', function(event){
    event.target.parentNode.remove()
  })
}

function sortTasks(){
  let taskList = document.getElementById('tasks')
  let taskArray = [...taskList.children]
  let newTask = []

  for(let task of taskArray){
    task.remove()
  }
  
  priorityOrder = ['', 'TOP!!!', 'High!', 'Medium', 'Low']

  for(let pr of priorityOrder){
    for(let task of taskArray){
      if(task.children[2].value === pr){
        taskList.appendChild(task)
      }
    }
  }
}

function editStart(event){
  let newField = document.createElement('form')
  newField.innerHTML = 
  `<input type="text" id="edit-description" 
  name="edit-description" placeholder="description">
  <input type="text" id="edit-user" 
  name="edit-user" placeholder="user">
  <input type="submit" value="Edit Task">`
  event.target.parentNode.appendChild(newField)

  newField.addEventListener('submit', function(event){
    event.preventDefault()
    editTask(event.target.parentNode, newField.children[0].value, newField.children[1].value)
    event.target.remove()
  })
}

function editTask(task, text, user){
  task.children[0].innerText = `${user}: ${text}`
}