<template>
  <div
    class="border p-2 mb-2 rounded-md bg-gray-700 dark:bg-gray-600 shadow-md cursor-move"
    draggable="true"
  >
    <p class="mb-2 text-white dark:text-gray-400">{{ task.text }}</p>
    <div class="flex space-x-2">
      <button
        @click="removeTask"
        class="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Удалить
      </button>
      <button
        @click="editTask"
        class="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition dark:bg-indigo-500 dark:hover:bg-indigo-600"
      >
        Редактировать
      </button>
    </div>
  </div>
</template>

<script setup>

  import { useTodoStore } from '@/stores/toDo'

  const props = defineProps(['task'])
  const emit = defineEmits(['removeTask', 'editTask', 'moveTask'])

  const store = useTodoStore()
  const removeTask = () => {
    emit('removeTask', props.task.id)
  }

  const editTask = () => {
    const newText = prompt('Enter new text:', props.task.text)
    if (newText !== null) {
      emit('editTask', props.task.id, newText)
    }
  }
</script>

<style scoped></style>
