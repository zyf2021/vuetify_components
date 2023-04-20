<template>
    <div >
         <form @submit.prevent>
             <h1>Создание поста</h1>
             <v-textarea placeholder="Название"
                       v-model = "comment.body"
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
                 id: 0,
                 body: '',
                 likes: 4
             }
         }
     },
     methods: {
        addComment() {
             this.comment.id=Date.now()
             this.comment.likes = 0
             this.$emit('create', this.comment)
             this.comment = {
                 title: '',
                 body: '',
                 likes: '',
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