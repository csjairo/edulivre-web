<template>
  <div class="login-view">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Palavra-passe" required />
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      console.log('A fazer login com:', this.email, this.password);
    },
  },
};
</script>

<style scoped>
.login-view {
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  font-family: 'Segoe UI', sans-serif;
}

.login-view h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #111827;
  font-size: 1.75rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  border-color: #4f46e5;
  outline: none;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}

button {
  padding: 0.75rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #4338ca;
}

@media (max-width: 500px) {
  .login-view {
    margin: 2rem 1rem;
    padding: 1.5rem;
  }
}
</style>
