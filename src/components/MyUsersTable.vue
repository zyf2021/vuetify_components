<template>
  <v-card flat>
    <v-card-title>{{ header }}</v-card-title>
    <v-data-table
        :headers="headers"
        :items="items"
    >
        <template v-slot:[`item.date_birth`] = "{item}">
            {{ item.raw.date_birth.substring(0,10)}}
        </template>
        <template v-slot:[`item.date_open`] = "{item}">
            {{ item.raw.date_open.substring(0,10)}}
        </template>
        <template v-slot:[`item.date_close`] = "{item}">
            {{ item.raw.date_close ? item.raw.date_close.substring(0, 10) : 'N/A'}}
        </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
    name: 'MyUserTable',
    props: {
        header: {
            type: String
        },
        headers: {
            type: Array
        },
        items: {
            type: Array
        }
    }
}
</script>

<style>

</style>