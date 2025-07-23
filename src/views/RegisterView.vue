<template>
  <div class="register-view">
    <h2>Registro</h2>
    <form @submit.prevent="register">
      <input type="text" v-model="name" placeholder="Nome Completo" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Palavra-passe" required />
      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:8000/users/', {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        alert('Registo efetuado com sucesso!');
        this.$router.push('/login');
      } catch (error) {
        console.error('Erro no registo:', error);
      }
    },
  },
};
</script>