<template>
    <div class="management-view">
        <div class="form-container">
            <h1>Registrar Frequência</h1>

            <div class="selection-group">
                <div class="select-item">
                    <label>Escolha o Workshop:</label>
                    <select v-model="selectedWorkshop" @change="onWorkshopSelect" required>
                        <option disabled value="">Workshop</option>
                        <option v-for="workshop in workshops" :key="workshop.uuid" :value="workshop.uuid">
                            {{ workshop.title }}
                        </option>
                    </select>
                </div>

                <div class="select-item">
                    <label>Escolha uma Aula:</label>
                    <select v-model="selectedLesson" :disabled="!selectedWorkshop" @change="onLessonSelect" required>
                        <option disabled value="">Aula</option>
                        <option v-for="lesson in lessons" :key="lesson.uuid" :value="lesson.uuid">
                            {{ lesson.title }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div v-if="selectedLesson && students.length > 0" class="table-container">
            <h2>Registrar Frequência</h2>
            <table>
                <thead>
                    <tr>
                        <th>Aluno (UUID)</th>
                        <th>Status da Presença</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in students" :key="student.student_uuid">
                        <td>{{ student.student_uuid }}</td>
                        <td>
                            <select v-model="attendanceData[student.student_uuid]" class="status-select">
                                <option value="Presente">Presente</option>
                                <option value="Ausente">Ausente</option>
                                <option value="Justificado">Justificado</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button @click="saveAllFrequencies" class="save-all-btn">Salvar Frequências</button>
        </div>
        <p v-else-if="selectedWorkshop && !students.length">
            Nenhum aluno inscrito neste workshop.
        </p>

    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "FrequencyManagementView",
    data() {
        return {
            workshops: [],
            lessons: [],
            students: [],
            selectedWorkshop: "",
            selectedLesson: "",
            attendanceData: {},
        };
    },
    async created() {
        this.fetchWorkshops();
    },
    methods: {
        async fetchWorkshops() {
            try {
                const { data } = await axios.get("http://localhost:8000/workshops/");
                this.workshops = data;
            } catch (error) {
                console.error("Erro ao buscar workshops:", error);
            }
        },
        async onWorkshopSelect() {
            this.lessons = [];
            this.students = [];
            this.selectedLesson = "";
            this.attendanceData = {};

            if (!this.selectedWorkshop) return;

            try {
                const [lessonsRes, studentsRes] = await Promise.all([
                    axios.get(`http://localhost:8000/lessons/workshop/${this.selectedWorkshop}`),
                    axios.get(`http://localhost:8000/participate/workshop/${this.selectedWorkshop}`)
                ]);
                this.lessons = lessonsRes.data;
                this.students = studentsRes.data;
            } catch (error) {
                console.error("Erro ao buscar dados do workshop:", error);
            }
        },
        onLessonSelect() {
            const initialAttendance = {};
            this.students.forEach(student => {
                initialAttendance[student.student_uuid] = 'Presente';
            });
            this.attendanceData = initialAttendance;
        },
        async saveAllFrequencies() {
            if (!this.selectedLesson) {
                alert("Por favor, selecione uma aula.");
                return;
            }

            const requests = Object.entries(this.attendanceData).map(([student_uuid, status]) => {
                const payload = {
                    lesson_uuid: this.selectedLesson,
                    student_uuid: student_uuid,
                    status: status,
                };
                return axios.post("http://localhost:8000/frequency/", payload);
            });

            try {
                await Promise.all(requests);
                alert("Frequências salvas com sucesso!");
            } catch (error) {
                console.error("Erro ao salvar frequências:", error);
                alert("Ocorreu um erro ao salvar as frequências.");
            }
        },
    },
};
</script>

<style scoped>
* {
    font-family: "TikTok Sans", sans-serif;
    box-sizing: border-box;
}

.management-view {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 1rem;
    color: #1f2937;
}

h1,
h2 {
    color: #111827;
    margin-bottom: 1rem;
}

.form-container,
.table-container {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    margin-bottom: 2.5rem;
}

.selection-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

label {
    margin-bottom: 0.5rem;
    display: block;
    color: #111827;
    font-weight: 600;
}

select {
    display: block;
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1em;
    background-color: #fff;
}

select:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
}

select:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}

th,
td {
    border-bottom: 1px solid #e5e7eb;
    padding: 1rem;
    text-align: left;
}

th {
    background-color: #f3f4f6;
    font-weight: 600;
}

.status-select {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #d1d5db;
}

.save-all-btn {
    margin-top: 1.5rem;
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

.save-all-btn:hover {
    background-color: #4338ca;
}
</style>
