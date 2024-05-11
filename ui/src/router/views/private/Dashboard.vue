<script>
import { accountService } from '@/_services';
import Tasks from '@/components/Tasks.vue'

export default {
    name: 'Dashboard',
    components: {
        Tasks
    },
    methods: {
        logout() {
            accountService.logout()
            .then(() => {
                accountService.removeToken();
                this.$router.push('/login');
            })
        }
    }
}
</script>
<template>
    <div class="relative w-full h-full">
        <Tasks />
        <button @click="logout" class="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded">Déconnexion</button>
    </div>
</template>
