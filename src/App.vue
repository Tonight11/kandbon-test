<template>
  <div class="flex">
    <div class="flex items-start justify-center min-h-screen bg-gray-100">
      <div class="flex">
        <Stage
          v-for="meal in stages"
          :key="meal.id"
          :stage="meal"
          @addTask="addTask"
          @removeTask="removeTask"
          @editTask="editTask"
          @moveTask="moveTask"
        />
      </div>
    </div>
    <div class="p-4 bg-gray-200 border rounded-md ml-4">
      <input
        v-model="newStageTitle"
        class="border p-2 rounded-md"
        type="text"
        placeholder="Enter stage title"
      />
      <button
        @click="addNewStage"
        class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Add Stage
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
