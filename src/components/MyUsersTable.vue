<template>
  <v-card flat class="ma-0"> 
    <v-card-title>{{ header }}</v-card-title>
    <v-data-table
        :headers="headers"
        :items="items"
    >
        <template v-slot:[`item.date_birth`] = "{item}">
            {{ item.raw.date_birth.substring(0,10)}}
        </template>
        <template v-slot:[`item.date_close`] = "{item}">
            {{ item.raw.date_close ? item.raw.date_close.substring(0,10) : 'n/a'}}
        </template>
        <template v-slot:[`item.date_open`] = "{item}">
            {{ item.raw.date_open ? item.raw.date_open.substring(0,10) : 'n/a'}}
        </template>
        <template v-slot:[`item.actions`]= "{ item }">
            <v-btn flat class="mr-2" size="small" color="accent" @click="editTheme(item.raw.id)">
                    <span dark class="text-h6">&#9998;</span>
                </v-btn>
                <v-btn flat color="error" size="small" @click="deleteTheme(item.raw.id)">
                    <span dark class="text-h6">&#128465;</span>
                </v-btn>
        </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
    name: 'MyUsersTableVue',
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
    },
    data() {
        return {
        };
    },
    methods: {
        WirteId(id){
            console.log(id)
        }
    },
}
</script>

<style>

</style>