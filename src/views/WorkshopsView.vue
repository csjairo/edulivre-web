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