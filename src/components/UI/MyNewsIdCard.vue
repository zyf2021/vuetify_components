<template>
    <v-card
      class="mx-auto"
      max-width="100%"
      flat
    >
        <v-card-title class="text-h4 font-weight-bold">{{ newsId.name }}</v-card-title>
        <v-card-subtitle class="text-subtitle-1">{{ newsId.createdAt }}</v-card-subtitle>
        <v-card-text class="text-body-1 text-justify">{{ newsId.text }}</v-card-text>

        <v-img
            :src="url_img"
            alt="Image 1"
            height="200px"
            cover
        ></v-img>
        <v-card-actions class="px-2">
            <v-row>
                <v-col cols="12" sm="3"></v-col>
                <v-col cols="12" sm="6">        
                    <my-btn
                        @click = "showDialog"
                    >Оставить комментарий</my-btn>
                </v-col>
                <v-col cols="12" sm="3"></v-col>
            </v-row>

      </v-card-actions>
      <my-dialog v-model:show = dialogVisible>
        <FormComment
            @create="createComment"
        />
      </my-dialog>
    </v-card>

</template>

<script>
import FormComment from '@/components/FormComment.vue'
import MediaService from '@/services/MediaService'
//import FileService from '@/services/FileService'
export default {
    name: 'my-news-id-card',
    components: {FormComment},
    props: {
        newsId: {
            type: Object
        }
    },
    data() {
        return {
            dialogVisible: false,
            url_img: '',
        }
    },
    methods: {
        getImageUrl(id) {
            //const id = this.newsId.id
            MediaService.getAllByNewsId(id)
            .then (res => {
                
                this.url_img = res.data[0].file;
                this.check = true;
                
                })
            .catch(e => {
                console.log(e);
            })
            //this.url_img = 'http://localhost:3000/api/files/image_2.jpg'
        },
        showDialog() {
            this.dialogVisible = true
        },
        createComment(comment){
            this.$emit('create', comment)
        }
    },
    watch: {
        newsId(newData) {
            newData.createdAt = newData.createdAt.substring(0,10)
            this.getImageUrl(newData.id)
        }
    },
    mounted(){
        
    }
}
</script>

<style>

</style>