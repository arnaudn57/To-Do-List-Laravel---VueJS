<script>
import { accountService } from '@/_services';
export default {
    name: 'Register',
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    },
    methods: {
        register(){
            accountService.register(this.user)
            .then((res) => {
                accountService.saveToken(res.data.token)
                this.$router.push('/dashboard')
            })
        }
    },
    mounted() {
        //
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
        <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
            <h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-200">Inscription</h1>
            <form @submit.prevent = "register()">
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                    <input v-model="user.name" type="text" id="name" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your name" required>
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                    <input v-model="user.email" type="email" id="email" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required>
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                    <input v-model="user.password" type="password" id="password" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required>
                </div>
                <div class="mb-4">
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                    <input v-model="user.confirmPassword" type="password" id="confirmPassword" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Confirm your password" required>
                </div>

                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">S'inscrire</button>
            </form>
        </div>
    </div>
</template>
