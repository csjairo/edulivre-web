<template>
    <div class="management-view">
        <form @submit.prevent="createWorkshop" class="form-container">
            <h1>Criar Workshop</h1>
            <input type="text" v-model="newWorkshop.title" placeholder="Título do Workshop" required />
            <input type="text" v-model="newWorkshop.category" placeholder="Categoria" />
            <textarea v-model="newWorkshop.description" placeholder="Descrição"></textarea>
            <input type="text" v-model="newWorkshop.address" placeholder="Endereço" />
            <input type="number" v-model="newWorkshop.capacity" placeholder="Capacidade" />
            <label>Data de Início:</label>
            <input type="datetime-local" v-model="newWorkshop.start_date" required />
            <label>Data de Fim:</label>
            <input type="datetime-local" v-model="newWorkshop.end_date" required />
            <label>Professor Responsável:</label>
            <select v-model="newWorkshop.teacher_uuid" required>
                <option disabled value="">Selecione um Professor</option>
                <option v-for="teacher in teachers" :key="teacher.uuid" :value="teacher.uuid">
                    UUID: {{ teacher.uuid }}
                </option>
            </select>
            <button type="submit">Criar Workshop</button>
        </form>

        <div class="table-container">
            <h1>Workshops</h1>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Categoria</th>
                        <th>Capacidade</th>
                        <th>Data de Início</th>
                        <th>Professor UUID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="workshop in workshops" :key="workshop.uuid">
                        <td>{{ workshop.title }}</td>
                        <td>{{ workshop.category }}</td>
                        <td>{{ workshop.capacity }}</td>
                        <td>{{ new Date(workshop.start_date).toLocaleString() }}</td>
                        <td>{{ workshop.teacher_uuid }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'WorkshopManagementView',
    data() {
        return {
            teachers: [],
            workshops: [],
            newWorkshop: {
                title: '',
                category: '',
                description: '',
                address: '',
                capacity: null,
                start_date: '',
                end_date: '',
                teacher_uuid: '',
            },
        };
    },
    async created() {
        this.fetchTeachers();
        this.fetchWorkshops();
    },
    methods: {
        async fetchTeachers() {
            try {
                const response = await axios.get('http://localhost:8000/teachers/');
                this.teachers = response.data;
            } catch (error) {
                console.error('Erro ao buscar professores:', error);
            }
        },
        async fetchWorkshops() {
            try {
                const response = await axios.get('http://localhost:8000/workshops/');
                this.workshops = response.data;
            } catch (error) {
                console.error('Erro ao buscar workshops:', error);
            }
        },
        async createWorkshop() {
            try {
                const workshopData = { ...this.newWorkshop, capacity: parseInt(this.newWorkshop.capacity) };
                await axios.post('http://localhost:8000/workshops/', workshopData);
                alert('Workshop criado com sucesso!');
                // Limpar formulário
                for (const key in this.newWorkshop) {
                    this.newWorkshop[key] = (typeof this.newWorkshop[key] === 'number') ? null : '';
                }
                this.fetchWorkshops();
            } catch (error) {
                console.error('Erro ao criar workshop:', error);
                alert('Erro ao criar workshop.');
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

td {
    color: #4b5563;
}

tr:hover {
    background-color: #f9fafb;
}
</style>
