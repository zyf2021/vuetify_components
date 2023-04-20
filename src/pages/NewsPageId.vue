<template>
    <v-container
        class="bg-secondary"
    >
        <v-row>
            <v-col 
                cols="12"
                sm="12">
            <my-news-id-card
                :newsId = "post"
                @create="createComment"
            ></my-news-id-card>

            </v-col>

            <v-col 
                cols="12"
                sm="12"
                v-for = "comment in comments"
                :key="comment"
                :value="comment"
            >
                <my-comment-card
                    :comment="comment"
                ></my-comment-card>
            </v-col>
        </v-row>
    </v-container>  
</template>

<script>
import axios from 'axios'
//import FormComment from '@/components/FormComment.vue'

export default {
  //components: {FormComment},
  data(){
    return {
        dialogVisible: true,
      post: {},
      comments: []
    }
  },
  methods: {
    async fetchPost(){
      try {
        setTimeout(async ()=>{
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`)
            console.log(response.data)
            this.post = response.data
          }, 1000)
      } catch(e) {
        alert(e)
      } 
    },
    async fetchCommentsByIdPost(){
      try {
        setTimeout(async ()=>{
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}/comments`)
            console.log(response.data)
            this.comments = response.data
          }, 1000)
      } catch(e) {
        alert(e)
      }
    },
    createComment(comment){
            console.log(comment)
            comment.id = this.comments.length
            this.comments.push(comment)
        },
  },
  mounted() {
    this.fetchPost()
    this.fetchCommentsByIdPost()
  }
}
</script>

<style>

</style>