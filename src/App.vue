<script setup>
import { ref, computed, watch, onMounted } from "vue";

const todos = ref([]);

const name = ref("");
const input_content = ref("");
const input_category = ref(null);

const todos_asc = computed(() => {
  return todos.value.sort((a, b) => b.createdAt - a.createdAt);
});

const addTodo = () => {
  if (input_content.value.trim() === "" || input_category.value === null) {
    return;
  }
  todos.value.push({
    content: input_content.value,
    category: input_category.value,
    done: false,
    editable: false,
    createdAt: new Date().getTime(),
  });
};

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
};
watch(name, (newVal) => {
  localStorage.setItem("name", newVal);
});

watch(
  todos,
  (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  },
  { deep: true }
);

onMounted(() => {
  name.value = localStorage.getItem("name") || "";
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
});
</script>

<template>
  <button @click="$auth.loginWithPopup()">Login with Auth0</button>
  <main class="app">
    <section class="greetings">
      <h2 class="title" v-if="$auth.isAuthenticated">
        Hello,
        {{ $auth.user.name }}
      </h2>
    </section>
    <section class="create-todo">
      <h3>Create a TODO</h3>
      <form @submit.prevent="addTodo">
        <h4>What's on your to do?</h4>
        <input
          type="text"
          v-model="input_content"
          placeholder="e.g Make a video"
        />
        <h4>Pick a Category</h4>
        <div class="options">
          <label>
            <input
              type="radio"
              name="category"
              value="business"
              v-model="input_category"
            />
            <span class="bubble business"></span>
            <div>Business</div>
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="personal"
              v-model="input_category"
            />
            <span class="bubble personal"></span>
            <div>Personal</div>
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="other"
              v-model="input_category"
            />
            <span class="bubble other"></span>
            <div>Other</div>
          </label>
        </div>
        <input type="submit" value="Add todo" />
      </form>
    </section>
    <section class="todo-list">
      <h3>TODO List</h3>
      <div class="list">
        <div
          v-for="todo in todos_asc"
          :key="todo.createdAt"
          :class="`todo-item ${todo.done && 'done'}`"
        >
          <label :for="'checkbox-' + todo.createdAt">
            <input
              type="checkbox"
              :id="'checkbox-' + todo.createdAt"
              v-model="todo.done"
            />
            <span :class="`bubble ${todo.category}`"></span>
          </label>

          <div class="todo-content">
            <input type="text" v-model="todo.content" />
          </div>
          <div class="actions">
            <button class="delete" @click="removeTodo(todo)">Delete</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
