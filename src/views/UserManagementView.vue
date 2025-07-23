<template>
    <div class="management-view">
        <form @submit.prevent="createUser" class="form-container">
            <h1>Criar Usuário</h1>
            <input type="text" v-model="newUser.name" placeholder="Nome Completo" required />
            <input type="email" v-model="newUser.email" placeholder="Email" required />
            <input type="tel" v-model="newUser.phone" placeholder="Telefone" />
            <input type="password" v-model="newUser.password" placeholder="Senha" required />
            <button type="submit">Criar Usuário</button>
        </form>

        <div class="table-container">
            <h1>Usuários</h1>
            <table>
                <thead>
                    <tr>
                        <th>UUID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Data de Criação</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.uuid">
                        <td>{{ user.uuid }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ new Date(user.created_at).toLocaleString() }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserManagementView',
    data() {
        return {
            users: [],
            newUser: {
                name: '',
                email: '',
                phone: '',
                password: '',
            },
        };
    },
    async created() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axios.get('http://localhost:8000/users/');
                this.users = response.data;
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                alert('Não foi possível carregar os usuários.');
            }
        },
        async createUser() {
            try {
                await axios.post('http://localhost:8000/users/', this.newUser);
                alert('Usuário criado com sucesso!');
                this.newUser = { name: '', email: '', phone: '', password: '' };
                this.fetchUsers();
            } catch (error) {
                console.error('Erro ao criar usuário:', error);
                alert('Erro ao criar usuário. Verifique o console para mais detalhes.');
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

h2, h3 {
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

.table-container {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
    padding: 1.5rem;
    overflow-x: auto;
    font-size: 12pt;
}

table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;
}

th, td {
    border-bottom: 1px solid #e5e7eb;
    padding: 1rem;
    text-align: left;
}

th {
    background-color: #f3f4f6;
    color: #374151;
    font-weight: 600;
}

tr:hover {
    background-color: #f9fafb;
}

td {
    color: #4b5563;
}
</style>
