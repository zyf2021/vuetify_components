<template>
  <v-container>
    <v-card>
        <v-card-title>Темы новостей</v-card-title>
        <v-data-table
            :headers="headers"
            :items="themes"
            :hide-default-footer="true"
        >
            <template v-slot:[`item.actions`]="{ item }">
                <v-btn small class="mr-2" @click="editTheme(item.id)">mdi-pencil</v-btn>
                <v-btn small @click="deleteTheme(item.id)">mdi-delete</v-btn>
            </template>
        </v-data-table>
        <v-card-actions v-if="themes.length > 0">
          <v-btn small color="error" @click="removeAllThemes">
            Удалить все
          </v-btn>
        </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import ThemesNewsService from '@/services/ThemesNewsService';
export default {
    name:"themes-list",
    data() {
        return {
            themes: [],
            title: "",
            headers: [
                {text: "ID", sortable: true, value:"id"},
                {text: "Название темы", sortable: true, value:"name"},
                {text: "Actions", value: "actions", sortable: false },
            ]
        }
    },
    methods: {
        getAllThemes(){
            ThemesNewsService.getAll()
            .then((response) => {
                console.log(response.data)
                this.themes = response.data.map(this.getDisplayThemes)
                console.log(response.data)
            })
            .catch((e) => {
                console.log(e);
            })
        },
        refreshList() {
            this.getAllThemes();
        },
        getDisplayThemes(theme) {
            return {
                id: theme.id,
                name: theme.name.length > 30 ? theme.name.substr(0, 30) + "..." : theme.name,
            };
        },
        removeAllThemes(){
            ThemesNewsService.deleteAll()
            .then((response) => {
                console.log(response.data)
            })
            .catch((e) => {
                console.log(e);
            })
        },
        editTheme(id){
            this.$router.push({ name: "tutorial-details", params: { id: id } });
        },
        deleteTheme(id){
            ThemesNewsService.delete(id)
            .then(() => {
                this.refreshList();
            })
            .catch((e) => {
                console.log(e)
            })
        }
    },
    mounted() {
        this.getAllThemes();
    },

    
}
</script>

<style>

</style>