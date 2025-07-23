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
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-family: 'Segoe UI', sans-serif;
}

.workshop-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.workshop-card h3 {
  font-size: 1.25rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.workshop-card p {
  color: #4b5563;
  margin: 0.25rem 0;
  font-size: 0.95rem;
}

.workshop-card a {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4f46e5;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.workshop-card a:hover {
  background-color: #4338ca;
}
</style>
