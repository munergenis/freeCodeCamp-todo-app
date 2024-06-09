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
const taskData = []
let currentTask = {}

// EVENT LISTENERS
openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden")
})
closeTaskFormBtn.addEventListener("click", () => {
  confirmCloseDialog.showModal()
})
cancelBtn.addEventListener("click", () => {
  confirmCloseDialog.close()
})
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close()
  taskForm.classList.toggle("hidden")
})
taskForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const dataArrIndex = taskData.findIndex(item => item.id === currentTask.id)

  const taskObj = {
    id: `${titleInput.value.toLowerCase().replace(" ", "-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value
  }

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj)
  }

  taskData.forEach(({id, title, date, description}) => {
    tasksContainer.innerHTML += `
      <div class="task" id="${id}">
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Description:</strong> ${description}</p>
        <button type="button" class="btn">Edit</button>
        <button type="button" class="btn">Delete</button>
      </div>
    `
  })

  taskForm.classList.toggle("hidden")
})
