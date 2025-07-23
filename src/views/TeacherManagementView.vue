<template>
    <div class="management-view">
        <form @submit.prevent="createTeacher" class="form-container">
            <h1>Criar Professor</h1>
            <input type="text" v-model="newTeacher.uuid" placeholder="UUID do Usuário (Ex: c1dae82d-fcf8-42e9...)"
                required />

            <input type="text" v-model="newTeacher.degree" placeholder="Formação (Ex.: Doutorado em Educação)"
                required />
            <input type="text" v-model="newTeacher.specialties"
                placeholder="Especialidades (Ex.: Matemática, Português)" required />
            <button type="submit">Criar Professor</button>
        </form>

        <div class="table-container">
            <h1>Professores</h1>
            <table>
                <thead>
                    <tr>
                        <th>UUID do Usuário</th>
                        <th>Formação</th>
                        <th>Especialidades</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="teacher in teachers" :key="teacher.uuid">
                        <td>{{ teacher.uuid }}</td>
                        <td>{{ teacher.degree }}</td>
                        <td>{{ teacher.specialties }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'TeacherManagementView',
    data() {
        return {
            users: [],
            teachers: [],
            newTeacher: {
                uuid: '',
                degree: '',
                specialties: '',
            },
        };
    },
    async created() {
        this.fetchUsers();
        this.fetchTeachers();
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axios.get('http://localhost:8000/users/');
                this.users = response.data;
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        },
        async fetchTeachers() {
            try {
                const response = await axios.get('http://localhost:8000/teachers/');
                this.teachers = response.data;
            } catch (error) {
                console.error('Erro ao buscar professores:', error);
            }
        },
        async createTeacher() {
            try {
                await axios.post('http://localhost:8000/teachers/', this.newTeacher);
                alert('Professor criado com sucesso!');
                this.newTeacher = { uuid: '', degree: '', specialties: '' };
                this.fetchTeachers();
            } catch (error) {
                console.error('Erro ao criar professor:', error);
                alert('Erro ao criar professor. É possível que este usuário já seja um professor ou aluno.');
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

h2,
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

.form-container input,
.form-container select {
    display: block;
    width: 100%;
    padding: 0.8rem 1rem;
    margin-bottom: 1.2rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    transition: border 0.2s;
    font-size: 1em;
}

.form-container input:focus,
.form-container select:focus {
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
}

table {
    width: 100%;
    border-collapse: collapse;
    min-width: 700px;
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
</style>
