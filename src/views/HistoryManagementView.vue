<template>
    <div class="management-view">
        <div class="form-container">
            <h1>Ver Histórico</h1>
            <input type="text" v-model="selectedUser" @blur="fetchHistory" @keyup.enter="fetchHistory"
                placeholder="Digite o ID do usuário (UUID)" />
        </div>
        <div class="table-container" v-if="history.length > 0">
            <h3>Histórico de {{ selectedUserName }}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Ação</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in history" :key="item.uuid">
                        <td>{{ item.action }}</td>
                        <td>{{ new Date(item.created_at).toLocaleString() }}</td>
                        <td>
                            <button @click="editHistory(item)" class="edit-btn">Editar</button>
                            <button @click="deleteHistory(item.uuid)" class="delete-btn">Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p v-else>Digite um ID de usuário válido para ver o histórico ou este usuário não possui histórico.</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'HistoryManagementView',
    data() {
        return {
            users: [],
            history: [],
            selectedUser: '',
        };
    },
    computed: {
        selectedUserName() {
            const user = this.users.find(u => u.uuid === this.selectedUser);
            return user ? user.name : this.selectedUser || '';
        }
    },
    async created() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const { data } = await axios.get('http://localhost:8000/users/');
                this.users = data;
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        },
        async fetchHistory() {
            if (!this.selectedUser) {
                this.history = [];
                return;
            }
            try {
                const { data } = await axios.get(`http://localhost:8000/history/user/${this.selectedUser}`);
                this.history = data;
            } catch (error) {
                console.error('Erro ao buscar histórico:', error);
                this.history = [];
            }
        },
        async editHistory(item) {
            const newAction = prompt("Editar Ação:", item.action);
            if (newAction && newAction !== item.action) {
                try {
                    await axios.put(`http://localhost:8000/history/${item.uuid}`, { action: newAction });
                    alert('Histórico atualizado com sucesso!');
                    this.fetchHistory();
                } catch (error) {
                    console.error('Erro ao atualizar histórico:', error);
                    alert('Erro ao atualizar histórico.');
                }
            }
        },
        async deleteHistory(history_uuid) {
            if (confirm("Tem certeza que deseja excluir este item do histórico?")) {
                try {
                    await axios.delete(`http://localhost:8000/history/${history_uuid}`);
                    alert('Histórico excluído com sucesso!');
                    this.fetchHistory();
                } catch (error) {
                    console.error('Erro ao excluir histórico:', error);
                    alert('Erro ao excluir histórico.');
                }
            }
        }
    }
}
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

h1,
h3 {
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

.table-container {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
    padding: 2rem;
    overflow-x: auto;
    font-size: 12pt;
}

table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;
}

th,
td {
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

.edit-btn,
.delete-btn {
    padding: 0.4rem 0.8rem;
    color: white;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 0.9em;
    margin-right: 0.5rem;
}

.edit-btn {
    background-color: #3b82f6;
}

.edit-btn:hover {
    background-color: #2563eb;
}

.delete-btn {
    background-color: #ef4444;
}

.delete-btn:hover {
    background-color: #dc2626;
}
</style>
