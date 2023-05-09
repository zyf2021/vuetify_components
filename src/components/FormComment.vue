<template>
    <div >
         <form @submit.prevent>
             <h3>Оставить комментарий</h3>
             <v-textarea placeholder="Текст"
                       v-model = "comment.text"
                       type="text"></v-textarea> 
             <my-btn @click = "addComment">
                 Создать
             </my-btn>
         </form>
     </div>
 </template>
 
 <script>
 export default {
     name: 'my-comment-form',
     data(){
         return {
             comment: {
                 userId: 0,
                 newsId: 0,
                 text: '',
             }
         }
     },
     methods: {
        addComment() {
             this.comment.userId= 10
             this.comment.newsId = this.$route.params.id
             this.$emit('create', this.comment)
             this.comment = {
                userId: 0,
                newsId: 0,
                text: '',
             }
         }
     }
 }
 </script>
 
 <style>
     form {
         display:flex;
         flex-direction: column;
     }
 </style>