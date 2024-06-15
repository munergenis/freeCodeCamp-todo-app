// DOM ELEMENTS
const taskForm = document.getElementById("task-form")
const confirmCloseDialog = document.getElementById("confirm-close-dialog")
const openTaskFormBtn = document.getElementById("open-task-form-btn")
const closeTaskFormBtn = document.getElementById("close-task-form-btn")
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn")
const cancelBtn = document.getElementById("cancel-btn")
const discardBtn = document.getElementById("discard-btn")
const tasksContainer = document.getElementById("tasks-container")
const titleInput = document.getElementById("title-input")
const dateInput = document.getElementById("date-input")
const descriptionInput = document.getElementById("description-input")

// SETTING UP
const taskData = JSON.parse(localStorage.getItem("data")) || []
if (taskData.length) {
  updateTaskContainer()
}

let currentTask = {}

// FUNCTIONS
const addOrUpdateTask = () => {
  const dataArrIndex = taskData.findIndex(item => item.id === currentTask.id)

  const taskObj = {
    id: `${titleInput.value.toLowerCase().replace(" ", "-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value
  }

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj)
  } else {
    taskData[dataArrIndex] = taskObj
  }

  localStorage.setItem("data", JSON.stringify(taskData))

  updateTaskContainer()
  reset()
}
const updateTaskContainer = () => {
  tasksContainer.innerHTML = ""

  taskData.forEach(({id, title, date, description}) => {
    tasksContainer.innerHTML += `
      <div class="task" id="${id}">
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Description:</strong> ${description}</p>
        <button type="button" class="btn" onclick="editTask(this)">Edit</button>
        <button type="button" class="btn" onclick="deleteTask(this)">Delete</button>
      </div>
    `
  })
}
const deleteTask = buttonEl => {
  const dataArrIndex = taskData.findIndex(item => item.id === buttonEl.parentElement.id)

  buttonEl.parentElement.remove()

  taskData.splice(dataArrIndex, 1)

  localStorage.setItem("data", JSON.stringify(taskData))
}
const editTask = buttonEl => {
  const dataArrIndex = taskData.findIndex(item => item.id === buttonEl.parentElement.id)

  currentTask = taskData[dataArrIndex]
  titleInput.value = currentTask.title
  dateInput.value = currentTask.date
  descriptionInput.value = currentTask.description

  addOrUpdateTaskBtn.innerText = "Update Task"

  taskForm.classList.toggle("hidden")
}
const reset = () => {
  titleInput.value = ""
  dateInput.value = ""
  descriptionInput.value = ""

  addOrUpdateTaskBtn.innerText = "Add Task"

  taskForm.classList.toggle("hidden")
  currentTask = {}
}

// EVENT LISTENERS
openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden")
})
closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value
  const formInputValuesUpdated = (
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description
  )
  
  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal()
  } else {
    reset()
  }
})
cancelBtn.addEventListener("click", () => {
  confirmCloseDialog.close()
})
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close()
  reset()
})
taskForm.addEventListener("submit", (e) => {
  e.preventDefault()

  addOrUpdateTask()
})
