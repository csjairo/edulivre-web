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
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>