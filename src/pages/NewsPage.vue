<template>
  <v-container class="bg-secondary">
    <v-row>
        <v-col cols="12" sm="12">
            <h1>Новости</h1>
        </v-col>
    </v-row>
    <v-row>
        <v-select
            label="Тема новостей"
            v-model="select_theme"
            :items="themes"
            item-title="name"
            item-value="id"
            return-object
        ></v-select>
    </v-row>
    <v-row>
        <v-col
            cols="12" sm="4"
            v-for="n in news"
            :key="n.id"
        >
            <my-card-news :item="n" :path="$route.name">
                <template v-slot:btn>Подробнее</template>
            </my-card-news>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewsService from '@/services/NewsService'
import ThemesNewsService from '@/services/ThemesNewsService'
export default {

    data() {
        return {
            title:'Title',
            news: [],
            select_theme: {name:'Выбрать тему новости', id:''},
            themes: [],
        }
    },
    methods: {
        GetAllNews(){
            NewsService.getAll()
            .then((response)=> {
                this.news = response.data
                console.log(this.news)
            })
            .catch((e) => {
                console.log(e)
            })
        },
        GetNewsByThemeId(id){
            NewsService.getNewsByThemeId(id)
            .then((response)=> {
                this.news = response.data
                console.log(this.news)
            })
            .catch((e) => {
                console.log(e)
            })
        },
        GetAllThemes(){
            ThemesNewsService.getAll()
            .then((response)=> {
                this.themes = response.data
                console.log(this.themes)
            })
            .catch((e) => {
                console.log(e)
            })

        }
    },
    watch: {
        select_theme(newData){
            this.GetNewsByThemeId(newData.id)
        }
    },

    mounted() {
        this.GetAllNews()
        this.GetAllThemes()
    }
}
</script>

<style>

</style>