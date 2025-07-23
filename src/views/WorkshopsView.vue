<script setup>
import WorkshopCard from '../components/WorkshopCard.vue'
const workshops = [
  { id: 1, title: 'Oficina de Vue.js' },
  { id: 2, title: 'Oficina de Design' }
];
</script>

<template>
  <div>
    <h1>Nossas Oficinas</h1>
    <div class="workshop-list">
      <WorkshopCard v-for="ws in workshops" :key="ws.id" :workshop="ws" />
    </div>
  </div>
</template>