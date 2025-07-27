<template>
    <div class="management-view">
        <div class="form-container">
            <h1>Editar Usuário</h1>
            <form @submit.prevent="updateUser">
                <input type="text" v-model="user.name" placeholder="Nome Completo" required />
                <input type="email" v-model="user.email" placeholder="Email" required />
                <input type="tel" v-model="user.phone" placeholder="Telefone" />
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserEditView',
    data() {
        return {
            user: {
                uuid: '',
                name: '',
                email: '',
                phone: '',
            },
        };
    },
    async created() {
        this.user.uuid = this.$route.params.uuid;
        this.fetchUser();
    },
    methods: {
        async fetchUser() {
            try {
                const response = await axios.get(`http://localhost:8000/users/${this.user.uuid}`);
                this.user = response.data;
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
                alert('Não foi possível carregar os dados do usuário.');
            }
        },
        async updateUser() {
            try {
                await axios.put(`http://localhost:8000/users/${this.user.uuid}`, this.user);
                alert('Usuário atualizado com sucesso!');
                this.$router.push('/manage/users');
            } catch (error) {
                console.error('Erro ao atualizar usuário:', error);
                alert('Erro ao atualizar usuário. Verifique o console para mais detalhes.');
            }
        },
    },
};
</script>

<style scoped>
* {
    font-family: 'TikTok Sans', sans-serif;
    box-sizing: border-box;
}

.management-view {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 1rem;
    color: #1f2937;
}

h1 {
    color: #111827;
    margin-bottom: 1rem;
}

.form-container {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    margin-bottom: 2.5rem;
}

.form-container input {
    display: block;
    width: 100%;
    padding: 0.8rem 1rem;
    margin-bottom: 1.2rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    transition: border 0.2s;
    font-size: 1em;
}

.form-container input:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.form-container button {
    padding: 0.8rem 1.5rem;
    background-color: #4f46e5;
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 1em;
}

.form-container button:hover {
    background-color: #4338ca;
}
</style>