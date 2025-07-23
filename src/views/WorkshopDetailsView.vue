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

<style scoped>
.workshop-details-view {
  max-width: 800px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  font-family: 'Segoe UI', sans-serif;
}

.workshop-details-view h2 {
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 1.5rem;
  text-align: center;
}

.workshop-details-view p {
  margin-bottom: 0.75rem;
  color: #4b5563;
  line-height: 1.5;
}

.workshop-details-view strong {
  color: #111827;
}

.workshop-details-view h3 {
  font-size: 1.25rem;
  color: #374151;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.workshop-details-view ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 2rem;
  color: #374151;
}

.workshop-details-view li {
  margin-bottom: 0.5rem;
}

button {
  padding: 0.75rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: block;
  margin: 0 auto;
}

button:hover {
  background-color: #4338ca;
}
</style>
