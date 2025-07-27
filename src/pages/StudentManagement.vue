<template>
    <div class="management-view">
        <form @submit.prevent="createStudent" class="form-container">
            <h1>Criar Aluno</h1>
            <input type="text" v-model="newStudent.uuid" placeholder="UUID do Usuário" required />
            <select v-model="newStudent.grade_level" required>
                <option disabled value="">Nível de Escolaridade</option>
                <option value="Fundamental">Fundamental</option>
                <option value="Medio">Médio</option>
                <option value="Superior">Superior</option>
            </select>
            <input type="text" v-model="newStudent.interests" placeholder="Interesses (Ex: Programação, Arte)" />
            <button type="submit">Criar Aluno</button>
        </form>
        <div class="table-container">
            <h1>Alunos</h1>
            <table>
                <thead>
                    <tr>
                        <th>UUID do Usuário</th>
                        <th>Nível de Escolaridade</th>
                        <th>Interesses</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in students" :key="student.uuid">
                        <td>{{ student.uuid }}</td>
                        <td>{{ student.grade_level }}</td>
                        <td>{{ student.interests }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'StudentManagementView',
    data() {
        return {
            students: [],
            newStudent: {
                uuid: '',
                grade_level: '',
                interests: '',
            },
        };
    },
    async created() {
        this.fetchStudents();
    },
    methods: {
        async fetchStudents() {
            try {
                const response = await axios.get('http://localhost:8000/students/');
                this.students = response.data;
            } catch (error) {
                console.error('Erro ao buscar alunos:', error);
            }
        },
        async createStudent() {
            try {
                await axios.post('http://localhost:8000/students/', this.newStudent);
                alert('Aluno criado com sucesso!');
                this.newStudent = { uuid: '', grade_level: '', interests: '' };
                this.fetchStudents();
            } catch (error) {
                console.error('Erro ao criar aluno:', error);
                alert('Erro ao criar aluno. É possível que este usuário já seja um professor ou aluno.');
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
