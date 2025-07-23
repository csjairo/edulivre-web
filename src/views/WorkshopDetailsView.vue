<template>
  <div class="workshop-details-view" v-if="workshop">
    <h2>{{ workshop.title }}</h2>
    <p><strong>Descrição:</strong> {{ workshop.description }}</p>
    <p><strong>Endereço:</strong> {{ workshop.address }}</p>
    <p><strong>Capacidade:</strong> {{ workshop.capacity }} alunos</p>
    <p><strong>Data de Início:</strong> {{ new Date(workshop.start_date).toLocaleDateString() }}</p>
    <p><strong>Data de Fim:</strong> {{ new Date(workshop.end_date).toLocaleDateString() }}</p>

    <h3>Aulas do Workshop</h3>
    <ul>
      <li v-for="lesson in lessons" :key="lesson.uuid">
        {{ lesson.title }}
      </li>
    </ul>

    <button @click="enroll" v-if="isStudent">Inscrever-me</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WorkshopDetailsView',
  data() {
    return {
      workshop: null,
      lessons: [],
      isStudent: true,
    };
  },
  async created() {
    const workshop_uuid = this.$route.params.workshop_uuid;
    try {
      const workshopResponse = await axios.get(`http://localhost:8000/workshops/${workshop_uuid}`);
      this.workshop = workshopResponse.data;

      const lessonsResponse = await axios.get(`http://localhost:8000/lessons/workshop/${workshop_uuid}`);
      this.lessons = lessonsResponse.data;
    } catch (error) {
      console.error('Erro ao obter detalhes do workshop:', error);
    }
  },
  methods: {
    async enroll() {
      alert('Inscrição realizada com sucesso!');
    },
  },
};
</script>