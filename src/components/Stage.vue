<template>
  <div class="p-4 rounded-md m-4 w-64 bg-gray-800 dark:bg-gray-700 shadow-2xl">
    <h2 class="text-lg font-bold mb-4 text-white dark:text-gray-200">
      {{ stage.title }}
    </h2>
    <div class="space-y-2">
      <draggable v-model="stage.tasks" tag="ul" group="meals">
        <template #item="{ element: task }">
          <Task
            :key="task.id"
            :task="task"
            @removeTask="removeTask"
            @editTask="editTask"
            @moveTask="moveTask"
          />
        </template>
      </draggable>
    </div>
    <div class="mt-4">
      <input
        v-model="newTaskText"
        class="border p-2 rounded-md bg-gray-700 dark:bg-gray-600 text-white dark:text-gray-400"
        type="text"
        placeholder="Введите задачу"
      />
      <button
        @click="addNewTask"
        class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition dark:bg-indigo-500 dark:hover:bg-indigo-600"
      >
        Добавить задачу
      </button>
    </div>
  </div>
</template>

<script setup>
  import draggable from 'vuedraggable'
  import Task from './Task.vue'
  import { useTodoStore } from '@/stores/toDo'
  import { ref } from 'vue'

  const props = defineProps(['stage'])
  const { emit } = defineEmits(['moveTask'])

  const store = useTodoStore()
  const newTaskText = ref('')

  const addNewTask = () => {
    if (newTaskText.value.trim() !== '') {
      store.addTask(props.stage.id, newTaskText.value)
      newTaskText.value = ''
    }
  }

  const removeTask = (taskId) => {
    store.removeTask(props.stage.id, taskId)
  }

  const editTask = (taskId, newText) => {
    store.editTask(props.stage.id, taskId, newText)
  }

  const moveTask = (toStageId, taskId) => {
    emit('moveTask', props.stage.id, toStageId, taskId)
  }
</script>

<style scoped></style>
