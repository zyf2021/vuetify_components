<template>
    <v-container class="bg-secondary mb-2">
        <v-row class="mb-2">
            <v-col md-12>
                <my-carousel
                    :images="image_name"
                ></my-carousel>
            </v-col>
        </v-row>
        <v-row class="mb-2">
            <v-col class="md-12">
                <h1>Новости </h1>
                <v-icon icon="mdi-minus" />
            </v-col>
        </v-row>
        <v-row no-gutters class="mb-6">
            <v-col
                class="pa-0 ma-0"
                v-for="n in news"
                :key="n.id"
                :value="n.id"
                cols="12"
                sm="4"
            >
                <my-card-news :item="n" :path="'news'">
                    <template v-slot:btn>Подробнее</template>
                </my-card-news>
            </v-col>
        </v-row>
        <v-row no-gutters class="mb-2">
            <v-col cols = "4"></v-col>
            <v-col cols = "4">
                <my-btn 
                    flat
                    @click="$router.push('/news')"
                >
                    Больше новостей
                </my-btn>
            </v-col>
            <v-col cols = "4"></v-col>
        </v-row>
        <v-row v-show="false" class="mb-2">
            <v-col class="md-12">
                <h1>Популярные услуги</h1>
            </v-col>
        </v-row>
        <v-row v-show="false" no-gutters class="mb-6">
            <v-col
                class="pa-0 ma-0"
                v-for="n in news"
                :key="n.id"
                :value="n.id"
                cols="12"
                sm="4"
            >
                <my-card-news :item="n" :path="'services'">
                    <template v-slot:btn>Подробнее</template>
                </my-card-news>
            </v-col>
        </v-row>
        <v-row v-show="false" no-gutters class="mb-2">
            <v-col cols = "4"></v-col>
            <v-col cols = "4">
                <my-btn flat>Больше услуг</my-btn>
            </v-col>
            <v-col cols = "4"></v-col>
        </v-row>
    </v-container>
</template>

<script>
import NewsService from '@/services/NewsService'
import FileService from '@/services/FileService'
export default {
    components: {},
    data() {
        return {
            page: 3,
            limit: 3,
            news:[],
            image_name: [],
        }
    },
    methods: {
        getImagesName(){
            FileService.getListFilesForMain()
            .then(res => {
                this.image_name = res.data
                console.log("images", this.image_name)
            })
        },

        async fetchNews(){
            try {
                ///this.isPostLoading = true
                    NewsService.getThree()
                    .then((response)=> {
                        this.news = response.data
                        console.log(this.news)
                    })
                    
            }
            catch(e) {
                alert(e)
            }
        }
    },
    mounted(){
        this.fetchNews()
        this.getImagesName()
    }
}
</script>

<style>

</style>