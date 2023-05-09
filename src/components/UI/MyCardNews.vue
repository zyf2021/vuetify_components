<template>
<v-card
    class="mx-2"
    max-width="100%"
    flat
  >
    <v-img
      :src="url_img"
      height="200px"
      cover
    ></v-img>

    <v-card-title>
      {{ this.item.name }}
    </v-card-title>

    <v-card-subtitle>
      {{ this.item.createdAt.substring(0,10) }}
    </v-card-subtitle>
    <v-card-subtitle>
      {{ this.item.theme }}
    </v-card-subtitle>

    <v-card-text
      class="d-block text-truncate"
    >
      {{ this.item.text }}

    </v-card-text>

    <v-card-actions>
      <my-btn
        color="#504136"
        variant="flat"
        @click="this.$router.push(`/${path}/${item.id}`)"
      >
        <slot name='btn'></slot>
        
      </my-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import MediaService from '@/services/MediaService'
export default {
  //`/news/${news_item.id}`
    name:'my-card-news',
    props: {
      item:{
        type: Object
      },
      path: {
        type: String
      }
    },
    data() {
      return {
        url_img: ''
      }
    },
    methods: {
      getImageUrl(id) {
            //const id = this.newsId.id
            MediaService.getAllByNewsId(id)
            .then (res => {
                this.url_img = res.data[0].file
                this.check = true
                console.log(res.data)

                })
            .catch(e => {
                console.log(e);
            })
        },
    },
    watch: {
        item(newData) {
            newData.createdAt = newData.createdAt.substring(0,10)
            this.getImageUrl(newData.id)
        }
    },
    mounted() {
      this.getImageUrl(this.item.id)
    }

}
</script>

<style>

</style>