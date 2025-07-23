<template>
    <div class="management-view">
        <form @submit.prevent="createLesson" class="form-container">
            <h1>Criar Aula</h1>
            <input type="text" v-model="newLesson.title" placeholder="Título da Aula" required />
            <textarea v-model="newLesson.description" placeholder="Descrição da Aula"></textarea>
            <label>Workshop UUID:</label>
            <input type="text" v-model="newLesson.workshop_uuid" placeholder="UUID do Workshop" required />
            <label>Professor UUID:</label>
            <input type="text" v-model="newLesson.teacher_uuid" placeholder="UUID do Professor" required />
            <label>Tipo de Aula:</label>
            <select v-model="newLesson.class_type" required>
                <option value="Presencial">Presencial</option>
                <option value="Online">Online</option>
            </select>
            <label>Status:</label>
            <select v-model="newLesson.status" required>
                <option value="Draft">Rascunho</option>
                <option value="Published">Publicado</option>
            </select>
            <label>URL da Gravação (opcional):</label>
            <input type="text" v-model="newLesson.recording_url" placeholder="https://..." />
            <button type="submit">Criar Aula</button>
        </form>
        <div class="table-container">
            <h1>Aulas</h1>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Workshop UUID</th>
                        <th>Professor UUID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="lesson in lessons" :key="lesson.uuid">
                        <td>{{ lesson.title }}</td>
                        <td>{{ lesson.description }}</td>
                        <td>{{ lesson.workshop_uuid }}</td>
                        <td>{{ lesson.teacher_uuid }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LessonManagementView',
    data() {
        return {
            lessons: [],
            newLesson: {
                title: '',
                description: '',
                workshop_uuid: '',
                teacher_uuid: '',
                class_type: '',
                status: '',
                recording_url: '',
            },
        };
    },
    async created() {
        this.fetchLessons();
    },
    methods: {
        async fetchLessons() {
            try {
                const { data } = await axios.get('http://localhost:8000/lessons/');
                this.lessons = data;
            } catch (error) {
                console.error('Erro ao buscar aulas:', error);
            }
        },
        async createLesson() {
            try {
                await axios.post('http://localhost:8000/lessons/', this.newLesson);
                alert('Aula criada com sucesso!');
                this.newLesson = {
                    title: '',
                    description: '',
                    workshop_uuid: '',
                    teacher_uuid: '',
                    class_type: '',
                    status: '',
                    recording_url: ''
                };
                this.fetchLessons();
            } catch (error) {
                console.error('Erro ao criar aula:', error);
                alert('Erro ao criar aula.');
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

.form-container label {
    margin-bottom: 0.35rem;
    display: block;
    font-weight: 600;
    color: #374151;
}

.form-container input,
.form-container select,
.form-container textarea {
    display: block;
    width: 100%;
    padding: 0.8rem 1rem;
    margin-bottom: 1.2rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-size: 1rem;
    font-family: inherit;
    background-color: #fff;
}

.form-container input:focus,
.form-container select:focus,
.form-container textarea:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.form-container textarea {
    min-height: 120px;
    resize: vertical;
}

.form-container button {
    padding: 0.8rem 1.6rem;
    background-color: #4f46e5;
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 1rem;
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

td {
    color: #4b5563;
}

tr:hover {
    background-color: #f9fafb;
}
</style>
