<template>
    <div class="login-container">
      <h1>Login Page</h1>
      <button @click="login">Log In</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      login() {
        this.$auth.loginWithRedirect({
          redirect_uri: `${window.location.origin}/app`
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  </style>
  