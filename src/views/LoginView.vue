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