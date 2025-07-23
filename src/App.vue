<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/workshops">Workshops</RouterLink>
        <RouterLink to="/about">Sobre</RouterLink>

        <template v-if="!isAuthenticated">
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/register">Registro</RouterLink>
        </template>
        <template v-else>
          <RouterLink to="/profile">Meu Perfil</RouterLink>
          <a href="#" @click.prevent="logout">Logout</a>
        </template>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: {
    RouterLink,
    RouterView,
  },
  data() {
    return {
      isAuthenticated: false,
    };
  },
  methods: {
    logout() {
      this.isAuthenticated = false;
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
:root {
  --primary-color: #4f46e5;
  --primary-hover: #4338ca;
  --text-color: #1f2937;
  --background-color: #f9fafb;
  --border-color: #e5e7eb;
  --link-color: #374151;
  --link-hover-bg: #e0e7ff;
  --section-gap: 2rem;
}

header {
  background-color: var(--background-color);
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-family: "Segoe UI", sans-serif;
}

.wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 1rem;
}

nav a {
  text-decoration: none;
  color: var(--link-color);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

nav a:hover {
  background-color: var(--link-hover-bg);
  color: var(--primary-color);
}

nav a.router-link-exact-active {
  color: var(--primary-color);
  font-weight: 600;
  background-color: var(--link-hover-bg);
}

nav a.router-link-exact-active:hover {
  background-color: var(--link-hover-bg);
}

@media (max-width: 768px) {
  nav {
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
  }
}
</style>
