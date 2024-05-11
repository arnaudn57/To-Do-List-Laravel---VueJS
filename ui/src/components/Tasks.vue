<template>
    <div class="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
        <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
            <h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-200">Gestionnaire de tâches</h1>
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold dark:text-gray-200">Liste des taches</h2>
                <button @click="toggleDialog('add')" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Ajouter</button>
            </div>
            <div class="flex flex-col">
                <div v-for="(task, index) in tasks" :key="index" class="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2">
                    <div class="flex items-center">
                        <input :checked="task.completed" type="checkbox" :id="'task-' + task.id" class="h-4 w-4 rounded border-gray-300 text-indigo-600" @change="markAsDone(task)">
                        <label :for="'task-' + task.id" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">{{ task.title }}</label>
                    </div>
                    <div class="flex items-center">
                        <button @click="editTask(task)" class="text-indigo-600 hover:text-indigo-700">Editer</button>
                        <button @click="deleteTask(task)" class="text-red-600 hover:text-red-700">Supprimer</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showModal" class="fixed inset-0 bg-gray-500 bg-opacity-75">
            <div class="flex items-center justify-center min-h-screen">
                <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-lg leading-6 font-medium text-gray-900" v-if="editMode">Edition d'une tache</h3>
                                <h3 class="text-lg leading-6 font-medium text-gray-900" v-else>Ajout d'une tache</h3>
                                <div>
                                    <input v-model="form.newTask.title" placeholder="Nom de la tache" class="mt-2 w-full border-gray-300">
                                </div>
                                <div>
                                    <input v-model="form.newTask.description" placeholder="Description de la tache" class="mt-2 w-full border-gray-300">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button @click="addTask" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm">Sauvegarder</button>
                        <button @click="resetForm" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Annuler</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from '@/_services/_caller.service.js'

export default {
    name: 'Tasks',
    data() {
        return {
            tasks: [],
            showModal: false,
            editMode: false,
            form: {
                newTask: {
                    id: '',
                    title: '',
                    description: ''
                }
            },
        }
    },
    methods: {
        getTasks() {
            Axios.get('/tasks')
            .then(res => {
                this.tasks = res.data;
            })
            .catch(error => console.error('Error fetching tasks:', error));
        },
        toggleModal() {
            this.showModal = !this.showModal;
        },
        toggleDialog(mode) {
            this.editMode = (mode === 'edit');
            this.toggleModal();
        },
        resetForm() {
            this.form.newTask = { id: '', title: '', description: '' };
            this.editMode = false;
            this.toggleModal();
        },
        addTask() {
            if (this.editMode) {
                Axios.put(`/tasks/${this.form.newTask.id}`, {
                    title: this.form.newTask.title,
                    description: this.form.newTask.description
                }).then(res => {
                    const index = this.tasks.findIndex(t => t.id === this.form.newTask.id);
                    this.tasks.splice(index, 1, res.data);
                    this.resetForm();
                }).catch(error => console.error('Error updating task:', error));
            } else {
                if (this.form.newTask.title.trim()) {
                    Axios.post('/tasks', { title: this.form.newTask.title, description: this.form.newTask.description })
                    .then(res => {
                        this.tasks.push(res.data);
                        this.resetForm();
                    })
                    .catch(error => console.error('Error adding task:', error));
                }
            }
        },
        markAsDone(task) {
            let completedDate = task.completed ? null : new Date().toISOString().slice(0, 19).replace('T', ' ');
            Axios.put(`/tasks/${task.id}`, { completed: !task.completed, completed_at: completedDate })
            .then(res => {
                task.completed = !task.completed;
            })
            .catch(error => console.error('Error updating task:', error));
        },
        deleteTask(task) {
            Axios.delete(`/tasks/${task.id}`)
            .then(res => {
                this.tasks = this.tasks.filter(t => t.id !== task.id);
            })
            .catch(error => console.error('Error deleting task:', error));
        },
        editTask(task) {
            this.form.newTask = { ...task };
            this.toggleDialog('edit');
        },
    },
    mounted() {
        this.getTasks();
    }
}
</script>
