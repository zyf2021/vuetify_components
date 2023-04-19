<template>
  <v-container class="bg-secondary">
    <v-row>
        <v-col cols="12" sm="12">
            <h1>Новости</h1>
        </v-col>
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
import axios from 'axios'

export default {

    data() {
        return {
            title:'Title',
            news: [],
            limit: 21
        }
    },
    methods: {
        async fetchNews(){
            try {
                ///this.isPostLoading = true
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: this.limit
                    }
                })
                this.news = response.data
                console.log(this.news[1])
            } catch(e) {
                alert(e)
            }
        }
    },
    mounted() {
        this.fetchNews()
    }
}
</script>

<style>

</style>