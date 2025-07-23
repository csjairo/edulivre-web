<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">Sobre</RouterLink>

        <div class="dropdown">
          <span class="dropdown-toggle">Management</span>
          <div class="dropdown-menu">
            <RouterLink to="/manage/users">Gerenciar Usuários</RouterLink>
            <RouterLink to="/manage/teachers">Gerenciar Professores</RouterLink>
            <RouterLink to="/manage/students">Gerenciar Alunos</RouterLink>
            <RouterLink to="/manage/workshops">Gerenciar Workshops</RouterLink>
            <RouterLink to="/manage/lessons">Gerenciar Aulas</RouterLink>
            <RouterLink to="/manage/frequency">Gerenciar Frequência</RouterLink>
            <RouterLink to="/manage/history">Ver Histórico</RouterLink>
          </div>
        </div>
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
  --link-hover-bg: #eef2ff;
  --section-gap: 2rem;
  --shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  --transition: all 0.2s ease-in-out;
}

header {
  background-color: var(--background-color);
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  font-family: "TikTok Sans", sans-serif;
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
  position: relative;
}

nav a,
.dropdown-toggle {
  text-decoration: none;
  color: var(--link-color);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: var(--transition);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

nav a:hover,
.dropdown-toggle:hover {
  background-color: var(--link-hover-bg);
  color: var(--primary-color);
}

nav a.router-link-exact-active {
  color: var(--primary-color);
  font-weight: 600;
  background-color: var(--link-hover-bg);
}

.dropdown {
  position: relative;
}

.dropdown-toggle::after {
  content: "▼";
  font-size: 0.65rem;
  margin-left: 0.25rem;
  transition: transform 0.2s ease;
}

.dropdown:hover .dropdown-toggle::after {
  transform: rotate(180deg);
}

/* NOVO efeito de transição suave */
.dropdown-menu {
  opacity: 0;
  visibility: hidden;
  transform: translateY(5px);
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  border-radius: 10px;
  padding: 0.5rem 0;
  z-index: 100;
  min-width: 240px;
  flex-direction: column;
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  display: flex;
}

.dropdown-menu a {
  display: block;
  padding: 0.6rem 1.2rem;
  white-space: nowrap;
  transition: var(--transition);
}

.dropdown-menu a:hover {
  background-color: #f1f3ff;
  color: var(--primary-color);
}

@media (max-width: 768px) {
  nav {
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
  }

  .dropdown-menu {
    position: static;
    border: none;
    box-shadow: none;
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
    display: flex !important;
  }
}
</style>
