<template>
  <div class="workshop-card">
    <h3>{{ workshop.title }}</h3>
    <p><strong>Categoria:</strong> {{ workshop.category }}</p>
    <p><strong>Professor:</strong> {{ teacherName }}</p>
    <router-link :to="{ name: 'WorkshopDetails', params: { workshop_uuid: workshop.uuid } }">
      Ver Detalhes
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'WorkshopCard',
  props: {
    workshop: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      teacherName: '',
    };
  },
  async created() {
    this.teacherName = 'Nome do Professor';
  },
};
</script>

<style scoped>
.workshop-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}
</style>
