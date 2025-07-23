<template>
  <div class="profile-view">
    <h2>Meu Perfil</h2>
    <div v-if="user">
      <p><strong>Nome:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>

      <h3>Meus Workshops</h3>
      <ul>
        <li v-for="participation in participations" :key="participation.uuid">
          Workshop ID: {{ participation.workshop_uuid }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProfileView',
  data() {
    return {
      user: null,
      participations: [],
    };
  },
  async created() {
    const user_uuid = 'uuid-do-utilizador-logado';
    try {
      const userResponse = await axios.get(`http://localhost:8000/users/${user_uuid}`);
      this.user = userResponse.data;

      const participationsResponse = await axios.get(`http://localhost:8000/participate/student/${user_uuid}`);
      this.participations = participationsResponse.data;
    } catch (error) {
      console.error('Erro ao obter dados do perfil:', error);
    }
  },
};
</script>