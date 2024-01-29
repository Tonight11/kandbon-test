<template>
  <div class="border p-4 rounded-md m-4 w-64 bg-white shadow-md">
    <h2 class="text-lg font-bold mb-4">{{ stage.title }}</h2>
    <div class="space-y-2">
      <draggable v-model="stage.tasks" tag="ul" group="meals">
        <template #item="{ element: task  }">
          <Task
            :key="task.id"
            :task="task"
            @removeTask="removeTask"
            @editTask="editTask"
            @moveTask="moveTask"
          /> </template
      ></draggable>
    </div>
    <div class="mt-4">
      <input
        v-model="newTaskText"
        class="border p-2 rounded-md"
        type="text"
        placeholder="Enter task text"
      />
      <button
        @click="addNewTask"
        class="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
      >
        Add Task
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
