<template>
  <div class="workshops-view">
    <h2>Workshops Disponíveis</h2>
    <div v-for="workshop in workshops" :key="workshop.uuid">
      <WorkshopCard :workshop="workshop" />
    </div>
  </div>
</template>

<script>
import WorkshopCard from '../components/WorkshopCard.vue';
import axios from 'axios';

export default {
  name: 'WorkshopsView',
  components: {
    WorkshopCard,
  },
  data() {
    return {
      workshops: [],
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:8000/workshops/');
      this.workshops = response.data;
    } catch (error) {
      console.error('Erro ao obter os workshops:', error);
    }
  },
};
</script>

<style scoped>
.workshops-view {
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 1rem;
  font-family: 'Segoe UI', sans-serif;
}

.workshops-view h2 {
  text-align: center;
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 2rem;
}

.workshops-view > div {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
</style>
