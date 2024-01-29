<template>
  <div class="flex min-h-screen dark:bg-gray-900">
    <div class="flex items-start bg-gray-800 dark:bg-white-700 overflow-x-auto">
      <div class="flex space-x-4">
        <Stage
          v-for="stage in stages"
          :key="stage.id"
          :stage="stage"
          @addTask="addTask"
          @removeTask="removeTask"
          @editTask="editTask"
          @moveTask="moveTask"
        />
      </div>
    </div>
    <div class="p-4 bg-gray-700 dark:bg-gray-600 rounded-md">
      <input
        v-model="newStageTitle"
        class="block border p-2 rounded-md dark:bg-gray-800 dark:text-gray-300"
        type="text"
        placeholder="Новая группа"
      />
      <button
        @click="addNewStage"
        class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition dark:bg-indigo-500 dark:hover:bg-indigo-600"
      >
        Добавит группу
      </button>
    </div>
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useTodoStore } from '@/stores/toDo'
  import { ref } from 'vue'
  import Stage from './components/Stage.vue'

  const store = useTodoStore()

  const newStageTitle = ref('')

  const addNewStage = () => {
    if (newStageTitle.value.trim() !== '') {
      store.addStage(newStageTitle.value)
      newStageTitle.value = ''
    }
  }

  const { stages } = storeToRefs(useTodoStore())

  console.log(stages)
</script>
