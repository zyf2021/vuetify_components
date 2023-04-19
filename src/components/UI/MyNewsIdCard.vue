<template>
  <v-card
    class="mx-auto"
    max-width="100%"
    flat
  >
    <v-card-title class="text-h4 font-weight-bold">{{ newsId.title }}</v-card-title>
    <v-card-subtitle class="text-subtitle-1">18.03.2023</v-card-subtitle>
    <v-card-text class="text-body-1 text-justify">{{ newsId.body }}</v-card-text>
    <v-card-action class="px-2">
        <v-row>
            <v-col cols="12" sm="3"></v-col>
            <v-col cols="12" sm="6">        
                <my-btn
                    @click = "showDialog"
                >Оставить комментарий</my-btn>
            </v-col>
            <v-col cols="12" sm="3"></v-col>
        </v-row>
    </v-card-action>
  </v-card>
    <my-dialog v-model:show = dialogVisible>
        <comment-form  
            @create = "addComment"
        />
    </my-dialog>
</template>

<script>
export default {
    name: 'my-news-id-card',
    props: {
        newsId: {
            type: Object
        }
    },
    data() {
        return {
            dialogVisible: false,
        }
    }
}
</script>

<style>

</style>