<template>
    <v-card
      class="mx-auto"
      max-width="100%"
      flat
    >
        <v-card-title class="text-h4 font-weight-bold">{{ newsId.title }}</v-card-title>
        <v-card-subtitle class="text-subtitle-1">18.03.2023</v-card-subtitle>
        <v-card-text class="text-body-1 text-justify">{{ newsId.body }}</v-card-text>
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
        }
    },
    methods: {
        showDialog() {
            this.dialogVisible = true
        },
        createComment(comment){
            this.$emit('create', comment)
        }
    }
}
</script>

<style>

</style>