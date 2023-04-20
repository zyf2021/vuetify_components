<template>
    <v-alert 
        :text="text"
        closable 
        title="Уведомление"
        type="success"
    >
    </v-alert>
</template>

<script>
export default {
    props: {
        text: {
            type: String
        }
    }
}
</script>

<style>

</style>