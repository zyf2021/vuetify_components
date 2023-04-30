<template>
  <v-container>
    <v-card>
        <v-card-title>Темы новостей</v-card-title>
        <v-data-table
            :headers="headers"
            :items="themes"
            item-value="name"
        >
            <template v-slot:[`item.id`]="{ item }">
            <v-chip color="accent">
                {{ item.raw.id }}
            </v-chip>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-btn flat class="mr-2" size="small" color="accent" @click="editTheme(item.raw.id)">
                    <span dark class="text-h6">&#9998;</span>
                </v-btn>
                <v-btn flat color="error" size="small" @click="deleteTheme(item.raw.id)">
                    <span dark class="text-h6">&#128465;</span>
                </v-btn>
            </template>
        </v-data-table>
        <v-card-actions v-if="themes.length > 0">
          <v-btn @click="removeAllThemes">
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
                {title: "ID", align: "start", sortable: true, value:"id", key:"id"},
                {title: "Название темы", sortable: true, value:"name", key:"name"},
                {title: "Actions", sortable: false, value: "actions", key: 'actions' },
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
            console.log(id)
            this.$router.push({ path: `/update_theme/${id}` });
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