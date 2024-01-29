import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', () => {
  const stages = ref([
    {
      id: 1,
      title: 'To Do',
      tasks: [
        { id: 1, text: 'Task 1' },
        { id: 2, text: 'Task 2' },
      ],
    },
    { id: 2, title: 'In Progress', tasks: [] },
    { id: 3, title: 'Done', tasks: [] },
  ])

  const addStage = (title) => {
    const newStage = { id: Date.now(), title, tasks: [] }
    stages.value.push(newStage)
  }
  const removeStage = (id) => {
    stages.value = stages.value.filter((stage) => stage.id !== id)
  }
  const addTask = (stageId, text) => {
    const newTask = { id: Date.now(), text }
    const stage = stages.value.find((stage) => stage.id === stageId)
    if (stage) {
      stage.tasks.push(newTask)
    }
  }
  const removeTask = (stageId, taskId) => {
    const stage = stages.value.find((stage) => stage.id === stageId)
    console.log(stageId, taskId)
    console.log(stage)
    if (stage) {
      stage.tasks = stage.tasks.filter((task) => task.id !== taskId)
    }
  }
  const editTask = (stageId, taskId, newText) => {
    const stage = stages.value.find((stage) => stage.id === stageId)
    const task = stage.tasks.find((task) => task.id === taskId)
    if (task) {
      task.text = newText
    }
  }
  const moveTask = (fromStageId, toStageId, taskId) => {
    const fromStage = stages.value.find((stage) => stage.id === fromStageId)
    const toStage = stages.value.find((stage) => stage.id === toStageId)
    const taskIndex = fromStage.tasks.findIndex((task) => task.id === taskId)

    if (taskIndex !== -1) {
      const movedTask = fromStage.tasks.splice(taskIndex, 1)[0]
      toStage.tasks.push(movedTask)
    }
  }

  return {
    stages,
    addStage,
    moveTask,
    editTask,
    removeTask,
    addTask,
    removeStage,
  }
})
