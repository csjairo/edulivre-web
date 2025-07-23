<template>
    <div class="management-view">
        <form @submit.prevent="createFrequency" class="form-container">
            <h1>Registrar Frequência</h1>
            <label>Aula:</label>
            <select v-model="newFrequency.lesson_uuid" required>
                <option disabled value="">Selecione uma Aula</option>
                <option v-for="lesson in lessons" :key="lesson.uuid" :value="lesson.uuid">
                    {{ lesson.title }}
                </option>
            </select>
            <label>Aluno:</label>
            <select v-model="newFrequency.student_uuid" required>
                <option disabled value="">Selecione um Aluno</option>
                <option v-for="student in students" :key="student.uuid" :value="student.uuid">
                    UUID: {{ student.uuid }}
                </option>
            </select>
            <label>Status:</label>
            <select v-model="newFrequency.status" required>
                <option value="Presente">Presente</option>
                <option value="Ausente">Ausente</option>
                <option value="Justificado">Justificado</option>
            </select>
            <button type="submit">Registrar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'FrequencyManagementView',
    data() {
        return {
            lessons: [],
            students: [],
            newFrequency: {
                lesson_uuid: '',
                student_uuid: '',
                status: 'Presente',
            },
        };
    },
    async created() {
        this.fetchLessons();
        this.fetchStudents();
    },
    methods: {
        async fetchLessons() {
            const { data } = await axios.get('http://localhost:8000/lessons/');
            this.lessons = data;
        },
        async fetchStudents() {
            const { data } = await axios.get('http://localhost:8000/students/');
            this.students = data;
        },
        async createFrequency() {
            try {
                await axios.post('http://localhost:8000/frequency/', this.newFrequency);
                alert('Frequência registrada com sucesso!');
                this.newFrequency.lesson_uuid = '';
                this.newFrequency.student_uuid = '';
            } catch (error) {
                console.error('Erro ao registrar frequência:', error);
                alert('Erro ao registrar frequência.');
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

.form-container select:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.form-container label {
    margin-bottom: 0.25rem;
    display: block;
    color: #111827;
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
