<template>
    <v-footer 
        padless
        class="my-footer"
    >
        <v-card
            flat
            width="100%"
            color="#EFEBE9"
            height="100px"
            class="d-flex align-center justify-center"
        >
            &copy; {{ new Date().getFullYear() }} Компьютерная помощь
        </v-card>
    </v-footer>
</template>

<script>
export default {
    name:'my-footer'
}
</script>

<style scoped>
    .my-footer {
        padding: 0;
        margin: 0;
    }
    v-card {
        margin: 0;
    }
</style>